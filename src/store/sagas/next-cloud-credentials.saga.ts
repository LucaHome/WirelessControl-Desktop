import { call, put } from "redux-saga/effects";
import * as Routes from "../../constants/routes.constants";
import { NextCloudCredentials } from "../../models";
import { serverGet } from "../../services/request.service";
import { deleteNextCloudCredentialsInStore, saveNextCloudCredentialsInStore } from "../../services/storage.service";
import {
    nextCloudCredentialsLoginFail, nextCloudCredentialsLoginSuccessful, nextCloudCredentialsLogoutFail, nextCloudCredentialsLogoutSuccessful,
    routeSet,
} from "../actions";

const subUrl: string = "ping";

// worker Saga: will be fired on NEXT_CLOUD_CREDENTIALS_LOGIN actions
export function* login(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = action.payload.nextCloudCredentials;
        const response = yield call(serverGet, subUrl, nextCloudCredentials);

        switch (response.status) {
            case "success":
                yield saveNextCloudCredentialsInStore(nextCloudCredentials);
                yield put(nextCloudCredentialsLoginSuccessful(nextCloudCredentials));
                break;
            default:
                yield put(nextCloudCredentialsLoginFail(response.message));
                yield put(routeSet(Routes.login));
                break;
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(nextCloudCredentialsLoginFail(`Unknown error: ${error.message}`));
        yield put(routeSet(Routes.login));
    }
}

// worker Saga: will be fired on NEXT_CLOUD_CREDENTIALS_LOGOUT actions
export function* logout(action: any) {
    try {
        yield deleteNextCloudCredentialsInStore();
        yield put(nextCloudCredentialsLogoutSuccessful());
        yield put(routeSet(Routes.login));
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(nextCloudCredentialsLogoutFail(`Unknown error: ${error.message}`));
    }
}
