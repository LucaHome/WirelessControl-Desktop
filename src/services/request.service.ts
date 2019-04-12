import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse, Entity, NextCloudCredentials } from "../models";
import { mockServerGetData, mockServerPostDeleteData, mockServerPutData } from "./request.service.mock";

const apiUrl: string = "/index.php/apps/wirelesscontrol/api/v1/";
const useMockData: boolean = false;

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
    console.log(`serverGet: ${url}, ${JSON.stringify(nextCloudCredentials)}`);

    if (useMockData) {
        const mockApiResponse: ApiResponse<K> = {
            data: mockServerGetData(url),
            message: "",
            status: "success",
        };
        return mockApiResponse;
    }

    const config: AxiosRequestConfig = { headers: createHeader(nextCloudCredentials) };
    return axios
        .get(`${nextCloudCredentials.baseUrl}${apiUrl}${url}`, config)
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
                    // tslint:disable
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
    console.log(`serverPost: ${url}, ${JSON.stringify(data)}, ${JSON.stringify(nextCloudCredentials)}`);

    if (useMockData) {
        const mockApiResponse: ApiResponse<K> = {
            status: "success",
            data: mockServerPostDeleteData(),
            message: ""
        };
        return mockApiResponse;
    }

    const dataJson = JSON.stringify(data);
    delete dataJson["id"];

    const config: AxiosRequestConfig = { headers: createHeader(nextCloudCredentials) };
    return axios
        .post(`${nextCloudCredentials.baseUrl}${apiUrl}${url}`, dataJson, config)
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
                    // tslint:disable
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
    console.log(`serverPut: ${url}, ${JSON.stringify(data)}, ${JSON.stringify(nextCloudCredentials)}`);

    if (useMockData) {
        const mockApiResponse: ApiResponse<K> = {
            status: "success",
            data: mockServerPutData(data.id),
            message: ""
        };
        return mockApiResponse;
    }

    const dataJson = JSON.stringify(data);

    const config: AxiosRequestConfig = { headers: createHeader(nextCloudCredentials) };
    return axios
        .put(`${nextCloudCredentials.baseUrl}${apiUrl}${url}/${data.id}`, dataJson, config)
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
                    // tslint:disable
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
    console.log(`serverDestroy: ${url}, ${id}, ${JSON.stringify(nextCloudCredentials)}`);

    if (useMockData) {
        const mockApiResponse: ApiResponse<K> = {
            status: "success",
            data: mockServerPostDeleteData(),
            message: ""
        };
        return mockApiResponse;
    }

    const config: AxiosRequestConfig = { headers: createHeader(nextCloudCredentials) };
    return axios
        .delete(`${nextCloudCredentials.baseUrl}${apiUrl}${url}/${id}`, config)
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
                    // tslint:disable
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
