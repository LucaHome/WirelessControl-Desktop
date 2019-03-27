import { put, takeEvery } from "redux-saga/effects";
import { NextCloudCredentials } from "../../models";
import { get } from "../../services";
import {
    NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
} from "../action-types";

// worker Saga: will be fired on NEXT_CLOUD_CREDENTIALS_LOGIN actions
function* login(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = action.payload.nextCloudCredentials;
        yield get("ping", nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put({ type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, payload: { error: "Invalid Credentials" } });
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put({ type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, payload: { error: "Invalid URL" } });
                        break;
                    case 200:
                        put({ type: NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL, payload: { nextCloudCredentials } });
                        break;
                    default:
                        put({ type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, payload: { error: `Unknown error: ${response.statusText}` } });
                        break;
                }
            })
            .catch((error) => {
                const b = 5;
            });
    } catch (e) {
        yield put({ type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, payload: { error: `Unknown error: ${e.message}` } });
    }
}

/*
  Starts login on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN action.
  - takeEvery: Does allow concurrent fetches
  - takeLatest: Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* nextCloudCredentialsSaga() {
    yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN, login);
}

export default nextCloudCredentialsSaga;