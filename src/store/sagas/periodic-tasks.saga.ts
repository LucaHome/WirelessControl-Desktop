import { put } from "redux-saga/effects";
import { ApiResponse, NextCloudCredentials, PeriodicTask } from "../../models";
import RequestService from "../../services/request.service";
import { loadNextCloudCredentials } from "../../services/storage.service";
import {
    periodicTaskAddFail, periodicTaskAddSuccessful,
    periodicTaskDeleteFail, periodicTaskDeleteSuccessful,
    periodicTasksLoadFail, periodicTasksLoadSuccessful,
    periodicTaskUpdateFail, periodicTaskUpdateSuccessful,
} from "../actions";

const subUrl: string = "periodic_task";

// worker Saga: will be fired on PERIODIC_TASKS_LOAD actions
export function* periodicTasksLoad(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(periodicTasksLoadFail("No Credentials available!"));
            return;
        }

        yield RequestService.get(subUrl, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(periodicTasksLoadFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(periodicTasksLoadFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<PeriodicTask[]> = response.data;
                        if (apiResponse.status === "success") {
                            put(periodicTasksLoadSuccessful(apiResponse.data));
                        } else {
                            put(periodicTasksLoadFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(periodicTasksLoadFail(`Unknown error: ${response.statusText}`));
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
export function* periodicTaskAdd(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(periodicTaskAddFail("No Credentials available!"));
            return;
        }

        const periodicTask: PeriodicTask = action.payload.periodicTask;

        yield RequestService.post(subUrl, periodicTask, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(periodicTaskAddFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(periodicTaskAddFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data >= 0) {
                            periodicTask.id = apiResponse.data;
                            put(periodicTaskAddSuccessful(periodicTask));
                        } else {
                            put(periodicTaskAddFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(periodicTaskAddFail(`Unknown error: ${response.statusText}`));
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
export function* periodicTaskUpdate(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(periodicTaskUpdateFail("No Credentials available!"));
            return;
        }

        const periodicTask: PeriodicTask = action.payload.periodicTask;

        yield RequestService.put(subUrl, periodicTask, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(periodicTaskUpdateFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(periodicTaskUpdateFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data === 0) {
                            put(periodicTaskUpdateSuccessful(periodicTask));
                        } else {
                            put(periodicTaskUpdateFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(periodicTaskUpdateFail(`Unknown error: ${response.statusText}`));
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
export function* periodicTaskDelete(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(periodicTaskDeleteFail("No Credentials available!"));
            return;
        }

        const periodicTask: PeriodicTask = action.payload.periodicTask;

        yield RequestService.put(subUrl, periodicTask, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(periodicTaskDeleteFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(periodicTaskDeleteFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data === 0) {
                            put(periodicTaskDeleteSuccessful(periodicTask));
                        } else {
                            put(periodicTaskDeleteFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(periodicTaskDeleteFail(`Unknown error: ${response.statusText}`));
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
