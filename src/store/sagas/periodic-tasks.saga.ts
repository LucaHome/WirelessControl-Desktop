import { call, put } from "redux-saga/effects";
import { convertPeriodicTaskLoadResponse, convertNumberResponse } from "../../converter";
import { ApiResponse, Area, NextCloudCredentials, PeriodicTask, WirelessSocket } from "../../models";
import { serverDestroy, serverGet, serverPost, serverPut } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    areaSelectByFilter,
    periodicTaskAddFail, periodicTaskAddSuccessful,
    periodicTaskDeleteFail, periodicTaskDeleteSuccessful,
    periodicTasksLoadFail, periodicTasksLoadSuccessful,
    periodicTaskUpdateFail, periodicTaskUpdateSuccessful,
    wirelessSocketSelectById
} from "../actions";

const subUrl: string = "periodic_task";

// worker Saga: will be fired on PERIODIC_TASKS_LOAD actions
export function* periodicTasksLoad(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(periodicTasksLoadFail("No Credentials available!"));
        } else {
            const jsonResponse = yield call(serverGet, subUrl, nextCloudCredentials);
            const response = yield convertPeriodicTaskLoadResponse(jsonResponse);

            switch (response.status) {
                case "success":
                    yield put(periodicTasksLoadSuccessful(response.data));
                    break;
                default:
                    yield put(periodicTasksLoadFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(periodicTasksLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_ADD actions
export function* periodicTaskAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const periodicTask: PeriodicTask = action.payload.periodicTask;
        const wirelessSockets: WirelessSocket[] = action.payload.wirelessSockets;
        const areas: Area[] = action.payload.areas;

        if (!nextCloudCredentials) {
            yield put(periodicTaskAddFail("No Credentials available!"));
        } else {
            const jsonResponse = yield call(serverPost, subUrl, periodicTask, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);
            switch (response.status) {
                case "success":
                    yield periodicTask.id = response.data;
                    yield put(periodicTaskAddSuccessful(periodicTask));
                    yield put(wirelessSocketSelectById(periodicTask.wirelessSocketId, wirelessSockets));
                    yield put(areaSelectByFilter(wirelessSockets.find((wirelessSocket: WirelessSocket) => wirelessSocket.id === periodicTask.wirelessSocketId).area, areas));
                    break;
                default:
                    yield put(periodicTaskAddFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(periodicTaskAddFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_UPDATE actions
export function* periodicTaskUpdate(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const periodicTask: PeriodicTask = action.payload.periodicTask;

        if (!nextCloudCredentials) {
            yield put(periodicTaskUpdateFail("No Credentials available!"));
        } else {
            const jsonResponse = yield call(serverPut, subUrl, periodicTask, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);
            switch (response.status) {
                case "success":
                    yield put(periodicTaskUpdateSuccessful(periodicTask));
                    break;
                default:
                    yield put(periodicTaskUpdateFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(periodicTaskUpdateFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_DELETE actions
export function* periodicTaskDelete(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const periodicTask: PeriodicTask = action.payload.periodicTask;

        if (!nextCloudCredentials) {
            yield put(periodicTaskDeleteFail("No Credentials available!"));
        } else {
            const jsonResponse = yield call(serverDestroy, subUrl, periodicTask.id, nextCloudCredentials);
            const response: ApiResponse<number> = yield convertNumberResponse(jsonResponse);
            switch (response.status) {
                case "success":
                    yield put(periodicTaskDeleteSuccessful(periodicTask));
                    break;
                default:
                    yield put(periodicTaskDeleteFail(response.message));
                    break;
            }
        }
    } catch (error) {
        // tslint:disable
        console.error(error);
        yield put(periodicTaskDeleteFail(`Unknown error: ${error.message}`));
    }
}
