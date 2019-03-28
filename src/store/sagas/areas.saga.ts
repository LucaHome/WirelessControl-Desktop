import { put } from "redux-saga/effects";
import { Area } from "../../models";
import { get } from "../../services";
import {
    areaAddFail, areaAddSuccessful,
    areaDeleteFail, areaDeleteSuccessful,
    areasLoadFail, areasLoadSuccessful,
    areaUpdateFail, areaUpdateSuccessful,
} from "../actions";

const subUrl: string = "area";

// worker Saga: will be fired on AREAS_LOAD actions
export function* loadAreas(action) {
    /*
    try {
        const nextCloudCredentials: NextCloudCredentials = action.payload.nextCloudCredentials;
        yield get(subUrl, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(nextCloudCredentialsLoginFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(nextCloudCredentialsLoginFail("Invalid URL"));
                        break;
                    case 200:
                        put(nextCloudCredentialsLoginSuccessful(nextCloudCredentials));
                        break;
                    default:
                        put(nextCloudCredentialsLoginFail(`Unknown error: ${response.statusText}`));
                        break;
                }
            })
            .catch((error) => {
                put(nextCloudCredentialsLoginFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(nextCloudCredentialsLoginFail(`Unknown error: ${error.message}`));
    }*/
}
