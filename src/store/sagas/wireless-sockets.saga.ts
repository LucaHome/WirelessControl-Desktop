import { call, put } from "redux-saga/effects";
import { convertWirelessSocketLoadResponse, convertNumberResponse } from "../../converter";
import { ApiResponse, Area, NextCloudCredentials, WirelessSocket } from "../../models";
import { serverDestroy, serverGet, serverPost, serverPut } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    areaSelectByFilter,
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
            const jsonResponse = yield call(serverGet, subUrl, nextCloudCredentials);
            const response: ApiResponse<WirelessSocket[]> = yield convertWirelessSocketLoadResponse(jsonResponse);

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
        // tslint:disable
        console.error(error);
        yield put(wirelessSocketsLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on WIRELESS_SOCKET_ADD actions
export function* wirelessSocketAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const wirelessSocket: WirelessSocket = action.payload.wirelessSocket;
        const areas: Area[] = action.payload.areas;

        if (!nextCloudCredentials) {
            yield put(wirelessSocketAddFail("No Credentials available!"));
        } else {
            const jsonResponse = yield call(serverPost, subUrl, wirelessSocket, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);
            switch (response.status) {
                case "success":
                    yield wirelessSocket.id = response.data;
                    yield put(wirelessSocketAddSuccessful(wirelessSocket));
                    yield (put(areaSelectByFilter(wirelessSocket.area, areas)));
                    break;
                default:
                    yield put(wirelessSocketAddFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
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
            const jsonResponse = yield call(serverPut, subUrl, wirelessSocket, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);
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
        // tslint:disable
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
            const jsonResponse = yield call(serverDestroy, subUrl, wirelessSocket.id, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);
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
        // tslint:disable
        console.error(error);
        yield put(wirelessSocketDeleteFail(`Unknown error: ${error.message}`));
    }
}
