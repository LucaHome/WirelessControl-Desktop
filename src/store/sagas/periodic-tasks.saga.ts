import { call, put } from "redux-saga/effects";
import * as Routes from "../../constants/routes.constants";
import { NextCloudCredentials, PeriodicTask } from "../../models";
import { serverGet, serverPost, serverPut, serverDestroy } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    periodicTaskAddFail, periodicTaskAddSuccessful,
    periodicTaskDeleteFail, periodicTaskDeleteSuccessful,
    periodicTasksLoadFail, periodicTasksLoadSuccessful,
    periodicTaskUpdateFail, periodicTaskUpdateSuccessful,
    routeSet,
} from "../actions";

const subUrl: string = "periodic_task";

// worker Saga: will be fired on PERIODIC_TASKS_LOAD actions
export function* periodicTasksLoad(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(periodicTasksLoadFail("No Credentials available!"));
        } else {
            const response = yield call(serverGet, subUrl, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield put(periodicTasksLoadSuccessful(response.data));
                    yield put(routeSet(Routes.content));
                    break;
                default:
                    yield put(periodicTasksLoadFail(response.message));
                    break;
            }
        }
    } catch (error) {
        yield put(periodicTasksLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_ADD actions
export function* periodicTaskAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
        const periodicTask: PeriodicTask = action.payload.periodicTask;

        if (!nextCloudCredentials) {
            yield put(periodicTaskAddFail("No Credentials available!"));
        } else {
            const response = yield call(serverPost, subUrl, periodicTask, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield periodicTask.id = response.data;
                    yield put(periodicTaskAddSuccessful(periodicTask));
                    yield put(routeSet(Routes.content));
                    break;
                default:
                    yield put(periodicTaskAddFail(response.message));
                    break;
            }
        }
    } catch (error) {
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
            const response = yield call(serverPut, subUrl, periodicTask, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield put(periodicTaskUpdateSuccessful(periodicTask));
                    yield put(routeSet(Routes.content));
                    break;
                default:
                    yield put(periodicTaskUpdateFail(response.message));
                    break;
            }
        }
    } catch (error) {
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
            const response = yield call(serverDestroy, subUrl, periodicTask.id, nextCloudCredentials);
            switch (response.status) {
                case "success":
                    yield put(periodicTaskDeleteSuccessful(periodicTask));
                    yield put(routeSet(Routes.content));
                    break;
                default:
                    yield put(periodicTaskDeleteFail(response.message));
                    break;
            }
        }
    } catch (error) {
        yield put(periodicTaskDeleteFail(`Unknown error: ${error.message}`));
    }
}
