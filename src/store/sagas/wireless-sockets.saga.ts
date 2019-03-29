import { put } from "redux-saga/effects";
import { ApiResponse, NextCloudCredentials, WirelessSocket } from "../../models";
import RequestService from "../../services/request.service";
import { loadNextCloudCredentials } from "../../services/storage.service";
import {
    wirelessSocketAddFail, wirelessSocketAddSuccessful,
    wirelessSocketDeleteFail, wirelessSocketDeleteSuccessful,
    wirelessSocketsLoadFail, wirelessSocketsLoadSuccessful,
    wirelessSocketUpdateFail, wirelessSocketUpdateSuccessful,
} from "../actions";

const subUrl: string = "wireless_socket";

// worker Saga: will be fired on WIRELESS_SOCKETS_LOAD actions
export function* wirelessSocketsLoad(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketsLoadFail("No Credentials available!"));
            return;
        }

        yield RequestService.get(subUrl, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(wirelessSocketsLoadFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(wirelessSocketsLoadFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<WirelessSocket[]> = response.data;
                        if (apiResponse.status === "success") {
                            put(wirelessSocketsLoadSuccessful(apiResponse.data));
                        } else {
                            put(wirelessSocketsLoadFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(wirelessSocketsLoadFail(`Unknown error: ${response.statusText}`));
                        break;
                }
            })
            .catch((error) => {
                put(wirelessSocketsLoadFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(wirelessSocketsLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_ADD actions
export function* wirelessSocketAdd(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketAddFail("No Credentials available!"));
            return;
        }

        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        yield RequestService.post(subUrl, wirelessSocket, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(wirelessSocketAddFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(wirelessSocketAddFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data >= 0) {
                            wirelessSocket.id = apiResponse.data;
                            put(wirelessSocketAddSuccessful(wirelessSocket));
                        } else {
                            put(wirelessSocketAddFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(wirelessSocketAddFail(`Unknown error: ${response.statusText}`));
                        break;
                }
            })
            .catch((error) => {
                put(wirelessSocketAddFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(wirelessSocketAddFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_UPDATE actions
export function* wirelessSocketUpdate(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketUpdateFail("No Credentials available!"));
            return;
        }

        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        yield RequestService.put(subUrl, wirelessSocket, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(wirelessSocketUpdateFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(wirelessSocketUpdateFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data === 0) {
                            put(wirelessSocketUpdateSuccessful(wirelessSocket));
                        } else {
                            put(wirelessSocketUpdateFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(wirelessSocketUpdateFail(`Unknown error: ${response.statusText}`));
                        break;
                }
            })
            .catch((error) => {
                put(wirelessSocketUpdateFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(wirelessSocketUpdateFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_DELETE actions
export function* wirelessSocketDelete(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketDeleteFail("No Credentials available!"));
            return;
        }

        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        yield RequestService.put(subUrl, wirelessSocket, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(wirelessSocketDeleteFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(wirelessSocketDeleteFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data === 0) {
                            put(wirelessSocketDeleteSuccessful(wirelessSocket));
                        } else {
                            put(wirelessSocketDeleteFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(wirelessSocketDeleteFail(`Unknown error: ${response.statusText}`));
                        break;
                }
            })
            .catch((error) => {
                put(wirelessSocketDeleteFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(wirelessSocketDeleteFail(`Unknown error: ${error.message}`));
    }
}
