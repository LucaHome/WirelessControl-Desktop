import axios from "axios";
import { ApiResponse, Entity, NextCloudCredentials } from "../models";

const apiUrl: string = "/index.php/apps/wirelesscontrol/api/v1/";

const createHeader = (nextCloudCredentials: NextCloudCredentials): any => {
    const encoded = encodeURIComponent(`${nextCloudCredentials.userName}:${nextCloudCredentials.passPhrase}`);
    const unescaped = unescape(encoded);
    const authorization = "Basic " + btoa(unescaped);

    return {
        "Authorization": authorization,
        "Content-Type": "application/json",
    };
};

export const serverGet = async <K>(url: string, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    return axios({
        headers: createHeader(nextCloudCredentials),
        method: "get",
        url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}`,
    })
        .then((response: any) => {
            switch (response.status) {
                // 401 For invalid userName with message: CORS requires basic auth
                // 401 For invalid passPhrase with message: CORS requires basic auth
                case 401:
                    return Promise.resolve("Invalid Credentials");
                // 404 For invalid URL
                // 405 For invalid URL
                case 404:
                case 405:
                    return Promise.resolve("Invalid URL");
                case 200:
                    return Promise.resolve(response.data);
                default:
                    console.warn(JSON.stringify(response));
                    return Promise.resolve(`Unknown error: ${response.statusText}`);
            }
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
}

export const serverPost = async <T extends Entity, K>(url: string, data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const dataJson = JSON.stringify(data);
    delete dataJson["id"];
    return axios({
        data: dataJson,
        headers: createHeader(nextCloudCredentials),
        method: "post",
        url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}`,
    })
        .then((response) => {
            switch (response.status) {
                // 401 For invalid userName with message: CORS requires basic auth
                // 401 For invalid passPhrase with message: CORS requires basic auth
                case 401:
                    return Promise.resolve("Invalid Credentials");
                // 404 For invalid URL
                // 405 For invalid URL
                case 404:
                case 405:
                    return Promise.resolve("Invalid URL");
                case 200:
                    return Promise.resolve(response.data);
                default:
                    console.warn(JSON.stringify(response));
                    return Promise.resolve(`Unknown error: ${response.statusText}`);
            }
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
}

export const serverPut = async <T extends Entity, K>(url: string, data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const dataJson = JSON.stringify(data);
    return axios({
        data: dataJson,
        headers: createHeader(nextCloudCredentials),
        method: "put",
        url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}/${data.id}`,
    })
        .then((response) => {
            switch (response.status) {
                // 401 For invalid userName with message: CORS requires basic auth
                // 401 For invalid passPhrase with message: CORS requires basic auth
                case 401:
                    return Promise.resolve("Invalid Credentials");
                // 404 For invalid URL
                // 405 For invalid URL
                case 404:
                case 405:
                    return Promise.resolve("Invalid URL");
                case 200:
                    return Promise.resolve(response.data);
                default:
                    console.warn(JSON.stringify(response));
                    return Promise.resolve(`Unknown error: ${response.statusText}`);
            }
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
}

export const serverDestroy = async <K>(url: string, id: number, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    return axios({
        headers: createHeader(nextCloudCredentials),
        method: "delete",
        url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}/${id}`,
    })
        .then((response) => {
            switch (response.status) {
                // 401 For invalid userName with message: CORS requires basic auth
                // 401 For invalid passPhrase with message: CORS requires basic auth
                case 401:
                    return Promise.resolve("Invalid Credentials");
                // 404 For invalid URL
                // 405 For invalid URL
                case 404:
                case 405:
                    return Promise.resolve("Invalid URL");
                case 200:
                    return Promise.resolve(response.data);
                default:
                    console.warn(JSON.stringify(response));
                    return Promise.resolve(`Unknown error: ${response.statusText}`);
            }
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
}
