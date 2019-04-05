import { put } from "redux-saga/effects";
import { NextCloudCredentials, PeriodicTask } from "../../models";
import { serverGet, serverPost, serverPut, serverDestroy } from "../../services/request.service";
import { loadNextCloudCredentialsFromStore } from "../../services/storage.service";
import {
    periodicTaskAddFail, periodicTaskAddSuccessful,
    periodicTaskDeleteFail, periodicTaskDeleteSuccessful,
    periodicTasksLoadFail, periodicTasksLoadSuccessful,
    periodicTaskUpdateFail, periodicTaskUpdateSuccessful,
} from "../actions";

const subUrl: string = "periodic_task";

// worker Saga: will be fired on PERIODIC_TASKS_LOAD actions
export function* periodicTasksLoad(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(periodicTasksLoadFail("No Credentials available!"));
            return;
        }

        yield serverGet(subUrl, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(periodicTasksLoadSuccessful(response.data));
                        break;
                    default:
                        put(periodicTasksLoadFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(periodicTasksLoadFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(periodicTasksLoadFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_ADD actions
export function* periodicTaskAdd(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(periodicTaskAddFail("No Credentials available!"));
            return;
        }

        const periodicTask: PeriodicTask = action.payload.periodicTask;

        yield serverPost(subUrl, periodicTask, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        periodicTask.id = response.data;
                        put(periodicTaskAddSuccessful(periodicTask));
                        break;
                    default:
                        put(periodicTaskAddFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(periodicTaskAddFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(periodicTaskAddFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_UPDATE actions
export function* periodicTaskUpdate(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(periodicTaskUpdateFail("No Credentials available!"));
            return;
        }

        const periodicTask: PeriodicTask = action.payload.periodicTask;

        yield serverPut(subUrl, periodicTask, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(periodicTaskUpdateSuccessful(periodicTask));
                        break;
                    default:
                        put(periodicTaskUpdateFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(periodicTaskUpdateFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(periodicTaskUpdateFail(`Unknown error: ${error.message}`));
    }
}

// worker Saga: will be fired on PERIODIC_TASK_DELETE actions
export function* periodicTaskDelete(action: any) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();

        if (!nextCloudCredentials) {
            yield put(periodicTaskDeleteFail("No Credentials available!"));
            return;
        }

        const periodicTask: PeriodicTask = action.payload.periodicTask;

        yield serverDestroy(subUrl, periodicTask.id, nextCloudCredentials)
            .then((response: any) => {
                switch (response.status) {
                    case "success":
                        put(periodicTaskDeleteSuccessful(periodicTask));
                        break;
                    default:
                        put(periodicTaskDeleteFail(response.message));
                        break;
                }
            })
            .catch((error) => {
                put(periodicTaskDeleteFail(`Unknown error: ${error.message}`));
            });
    } catch (error) {
        yield put(periodicTaskDeleteFail(`Unknown error: ${error.message}`));
    }
}
