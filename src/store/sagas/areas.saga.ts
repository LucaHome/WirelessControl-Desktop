import { put } from "redux-saga/effects";
import { ApiResponse, Area, NextCloudCredentials } from "../../models";
import { get, loadNextCloudCredentials } from "../../services";
import {
    areaAddFail, areaAddSuccessful,
    areaDeleteFail, areaDeleteSuccessful,
    areasLoadFail, areasLoadSuccessful,
    areaUpdateFail, areaUpdateSuccessful,
} from "../actions";

const subUrl: string = "area";

// worker Saga: will be fired on AREAS_LOAD actions
export function* loadAreas(action) {
    try {
        const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentials();

        if (!nextCloudCredentials) {
            throw new Error("No credentials available!");
        }

        yield get(subUrl, nextCloudCredentials)
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
                        put(areasLoadSuccessful(apiResponse.data));
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
