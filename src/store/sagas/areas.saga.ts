import { put } from "redux-saga/effects";
import { ApiResponse, Area, NextCloudCredentials } from "../../models";
import RequestService from "../../services/request.service";
import StorageService from "../../services/storage.service";
import {
    areaAddFail, areaAddSuccessful,
    areaDeleteFail, areaDeleteSuccessful,
    areasLoadFail, areasLoadSuccessful,
    areaUpdateFail, areaUpdateSuccessful,
} from "../actions";

const subUrl: string = "area";

// worker Saga: will be fired on AREAS_LOAD actions
export function* areasLoad(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = StorageService.loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(areasLoadFail("No Credentials available!"));
            return;
        }

        yield RequestService.get(subUrl, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(areasLoadFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(areasLoadFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<Area[]> = response.data;
                        if (apiResponse.status === "success") {
                            put(areasLoadSuccessful(apiResponse.data));
                        } else {
                            put(areasLoadFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(areasLoadFail(`Unknown error: ${response.statusText}`));
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
export function* areaAdd(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = StorageService.loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(areaAddFail("No Credentials available!"));
            return;
        }

        const area: Area = action.payload.area;

        yield RequestService.post(subUrl, area, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(areaAddFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(areaAddFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data >= 0) {
                            area.id = apiResponse.data;
                            put(areaAddSuccessful(area));
                        } else {
                            put(areaAddFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(areaAddFail(`Unknown error: ${response.statusText}`));
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
export function* areaUpdate(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = StorageService.loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(areaUpdateFail("No Credentials available!"));
            return;
        }

        const area: Area = action.payload.area;

        yield RequestService.put(subUrl, area, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(areaUpdateFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(areaUpdateFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data === 0) {
                            put(areaUpdateSuccessful(area));
                        } else {
                            put(areaUpdateFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(areaUpdateFail(`Unknown error: ${response.statusText}`));
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
export function* areaDelete(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = StorageService.loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            yield put(areaDeleteFail("No Credentials available!"));
            return;
        }

        const area: Area = action.payload.area;

        yield RequestService.put(subUrl, area, nextCloudCredentials)
            .then((response: any) => { // response is of type: AxiosResponse<T = any>
                switch (response.status) {
                    // 401 For invalid userName with message: CORS requires basic auth
                    // 401 For invalid passPhrase with message: CORS requires basic auth
                    case 401:
                        put(areaDeleteFail("Invalid Credentials"));
                        break;
                    // 404 For invalid URL
                    // 405 For invalid URL
                    case 404:
                    case 405:
                        put(areaDeleteFail("Invalid URL"));
                        break;
                    case 200:
                        const apiResponse: ApiResponse<number> = response.data;
                        if (apiResponse.status === "success" && apiResponse.data === 0) {
                            put(areaDeleteSuccessful(area));
                        } else {
                            put(areaDeleteFail(`${apiResponse.message}`));
                        }
                        break;
                    default:
                        put(areaDeleteFail(`Unknown error: ${response.statusText}`));
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
