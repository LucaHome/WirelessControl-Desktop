import { put } from "redux-saga/effects";
import { Area, NextCloudCredentials } from "../../models";
import { serverGet, serverPost, serverPut, serverDestroy } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    areaAddFail, areaAddSuccessful,
    areaDeleteFail, areaDeleteSuccessful,
    areasLoadFail, areasLoadSuccessful,
    areaUpdateFail, areaUpdateSuccessful,
} from "../actions";

const subUrl: string = "area";

// worker Saga: will be fired on AREAS_LOAD actions
export function* areasLoad(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(areasLoadFail("No Credentials available!"));
            return;
        }

        yield serverGet(subUrl, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(areasLoadSuccessful(response.data));
                        break;
                    default:
                        put(areasLoadFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(areasLoadFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(areasLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on AREA_ADD actions
export function* areaAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(areaAddFail("No Credentials available!"));
            return;
        }

        const area: Area = action.payload.area;

        yield serverPost(subUrl, area, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        area.id = response.data;
                        put(areaAddSuccessful(area));
                        break;
                    default:
                        put(areaAddFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(areaAddFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(areaAddFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on AREA_UPDATE actions
export function* areaUpdate(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(areaUpdateFail("No Credentials available!"));
            return;
        }

        const area: Area = action.payload.area;

        yield serverPut(subUrl, area, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        area.id = response.data;
                        put(areaUpdateSuccessful(area));
                        break;
                    default:
                        put(areaUpdateFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(areaUpdateFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(areaUpdateFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on AREA_DELETE actions
export function* areaDelete(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(areaDeleteFail("No Credentials available!"));
            return;
        }

        const area: Area = action.payload.area;

        yield serverDestroy(subUrl, area.id, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        area.id = response.data;
                        put(areaDeleteSuccessful(area));
                        break;
                    default:
                        put(areaDeleteFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(areaDeleteFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(areaDeleteFail(`Unknown error: ${error.message}`));
    }
}
