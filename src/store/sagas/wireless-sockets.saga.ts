import { call, put } from "redux-saga/effects";
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
        } else {
            const response = yield call(serverGet, subUrl, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield put(wirelessSocketsLoadSuccessful(response.data));
                    break;
                default:
                    yield put(wirelessSocketsLoadFail(response.message));
                    break;
            }
        }
    } catch (error) {
        console.error(error);
        yield put(wirelessSocketsLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_ADD actions
export function* wirelessSocketAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        if (!nextCloudCredentials) {
            yield put(wirelessSocketAddFail("No Credentials available!"));
        } else {
            const response = yield call(serverPost, subUrl, wirelessSocket, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield wirelessSocket.id = response.data;
                    yield put(wirelessSocketAddSuccessful(wirelessSocket));
                    break;
                default:
                    yield put(wirelessSocketAddFail(response.message));
                    break;
            }
        }
    } catch (error) {
        console.error(error);
        yield put(wirelessSocketAddFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_UPDATE actions
export function* wirelessSocketUpdate(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        if (!nextCloudCredentials) {
            yield put(wirelessSocketUpdateFail("No Credentials available!"));
        } else {
            const response = yield call(serverPut, subUrl, wirelessSocket, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield put(wirelessSocketUpdateSuccessful(wirelessSocket));
                    break;
                default:
                    yield put(wirelessSocketUpdateFail(response.message));
                    break;
            }
        }
    } catch (error) {
        console.error(error);
        yield put(wirelessSocketUpdateFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_DELETE actions
export function* wirelessSocketDelete(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;

        if (!nextCloudCredentials) {
            yield put(wirelessSocketDeleteFail("No Credentials available!"));
        } else {
            const response = yield call(serverDestroy, subUrl, wirelessSocket.id, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield put(wirelessSocketDeleteSuccessful(wirelessSocket));
                    break;
                default:
                    yield put(wirelessSocketDeleteFail(response.message));
                    break;
            }
        }
    } catch (error) {
        console.error(error);
        yield put(wirelessSocketDeleteFail(`Unknown error: ${error.message}`));
    }
}
