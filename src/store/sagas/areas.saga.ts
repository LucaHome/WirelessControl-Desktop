import { call, put } from "redux-saga/effects";
import { convertAreaLoadResponse, convertNumberResponse } from "../../converter";
import { ApiResponse, Area, NextCloudCredentials } from "../../models";
import { serverDelete, serverGet, serverPost, serverPut } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    areaAddFail, areaAddSuccessful,
    areaDeleteFail, areaDeleteSuccessful,
    areasLoadFail, areasLoadSuccessful,
    areaUpdateFail, areaUpdateSuccessful,
} from "../actions";

const apiVersion: "v1" | "v2" = "v1";

const subUrl: string = "area";

// worker Saga: will be fired on AREAS_LOAD actions
export function* areasLoad(_: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(areasLoadFail("No Credentials available!"));
        } else {
            const jsonResponse: string = yield call(serverGet, subUrl, apiVersion, nextCloudCredentials);
            const response: ApiResponse<Area[]> = yield convertAreaLoadResponse(jsonResponse);

            switch (response.status) {
                case "success":
                    yield put(areasLoadSuccessful(response.data));
                    break;
                default:
                    yield put(areasLoadFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(areasLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on AREA_ADD actions
export function* areaAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const area: Area = action.payload.area;

        if (!nextCloudCredentials) {
            yield put(areaAddFail("No Credentials available!"));
        } else {
            const jsonResponse: string = yield call(serverPost, subUrl, apiVersion, area, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);

            switch (response.status) {
                case "success":
                    yield area.id = response.data;
                    yield put(areaAddSuccessful(area));
                    break;
                default:
                    yield put(areaAddFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(areaAddFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on AREA_UPDATE actions
export function* areaUpdate(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const area: Area = action.payload.area;

        if (!nextCloudCredentials) {
            yield put(areaUpdateFail("No Credentials available!"));
        } else {
            const jsonResponse: string = yield call(serverPut, subUrl, apiVersion, area, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);

            switch (response.status) {
                case "success":
                    yield put(areaUpdateSuccessful(area));
                    break;
                default:
                    yield put(areaUpdateFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(areaUpdateFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on AREA_DELETE actions
export function* areaDelete(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const area: Area = action.payload.area;

        if (!nextCloudCredentials) {
            yield put(areaDeleteFail("No Credentials available!"));
        } else {
            const jsonResponse: string = yield call(serverDelete, subUrl, apiVersion, area.id, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);

            switch (response.status) {
                case "success":
                    yield put(areaDeleteSuccessful(area));
                    break;
                default:
                    yield put(areaDeleteFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(areaDeleteFail(`Unknown error: ${error.message}`));
    }
}
