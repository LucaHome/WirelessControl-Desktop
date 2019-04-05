import { put } from "redux-saga/effects";
import { NextCloudCredentials } from "../../models";
import { serverGet } from "../../services/request.service";
import { deleteNextCloudCredentialsInStore, saveNextCloudCredentialsInStore } from "../../services/storage.service";
import { nextCloudCredentialsLoginFail, nextCloudCredentialsLoginSuccessful, nextCloudCredentialsLogoutFail, nextCloudCredentialsLogoutSuccessful } from "../actions";

const subUrl: string = "ping";

// worker Saga: will be fired on NEXT_CLOUD_CREDENTIALS_LOGIN actions
export function* login(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = action.payload.nextCloudCredentials;
        yield serverGet(subUrl, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        saveNextCloudCredentialsInStore(nextCloudCredentials);
                        put(nextCloudCredentialsLoginSuccessful(nextCloudCredentials));
                        break;
                    default:
                        put(nextCloudCredentialsLoginFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                console.error(error);
                put(nextCloudCredentialsLoginFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        console.error(error);
        yield put(nextCloudCredentialsLoginFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on NEXT_CLOUD_CREDENTIALS_LOGOUT actions
export function* logout(action: any) {
    try {
        yield deleteNextCloudCredentialsInStore();
        yield put(nextCloudCredentialsLogoutSuccessful());
    } catch (error) {
        console.error(error);
        yield put(nextCloudCredentialsLogoutFail(`Unknown error: ${error.message}`));
    }
}
