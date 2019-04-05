import { put } from "redux-saga/effects";
import { NextCloudCredentials, WirelessSocket } from "../../models";
import { serverGet, serverPost, serverPut, serverDestroy } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    wirelessSocketAddFail, wirelessSocketAddSuccessful,
    wirelessSocketDeleteFail, wirelessSocketDeleteSuccessful,
    wirelessSocketsLoadFail, wirelessSocketsLoadSuccessful,
    wirelessSocketUpdateFail, wirelessSocketUpdateSuccessful,
} from "../actions";

const subUrl: string = "wireless_socket";

// worker Saga: will be fired on WIRELESS_SOCKETS_LOAD actions
export function* wirelessSocketsLoad(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketsLoadFail("No Credentials available!"));
            return;
        }

        yield serverGet(subUrl, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(wirelessSocketsLoadSuccessful(response.data));
                        break;
                    default:
                        put(wirelessSocketsLoadFail(response.message));
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
export function* wirelessSocketAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketAddFail("No Credentials available!"));
            return;
        }

        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        yield serverPost(subUrl, wirelessSocket, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        wirelessSocket.id = response.data;
                        put(wirelessSocketAddSuccessful(wirelessSocket));
                        break;
                    default:
                        put(wirelessSocketAddFail(response.message));
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
export function* wirelessSocketUpdate(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketUpdateFail("No Credentials available!"));
            return;
        }

        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        yield serverPut(subUrl, wirelessSocket, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(wirelessSocketUpdateSuccessful(wirelessSocket));
                        break;
                    default:
                        put(wirelessSocketUpdateFail(response.message));
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
export function* wirelessSocketDelete(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(wirelessSocketDeleteFail("No Credentials available!"));
            return;
        }

        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        yield serverDestroy(subUrl, wirelessSocket.id, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(wirelessSocketDeleteSuccessful(wirelessSocket));
                        break;
                    default:
                        put(wirelessSocketDeleteFail(response.message));
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
