import * as request from "request-promise-native";
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
    const options = { headers: createHeader(nextCloudCredentials) };
    const response = await request.get(`${nextCloudCredentials.baseUrl}${apiUrl}${url}`, options);
    const parsedResponse: ApiResponse<K> = JSON.parse(response);
    return Promise.resolve(parsedResponse);
}

export const serverPost = async <T extends Entity, K>(url: string, data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const dataJson = JSON.stringify(data);
    delete dataJson["id"];

    const options = {
        body: dataJson,
        headers: createHeader(nextCloudCredentials),
        json: true,
    };

    const response = await request.post(`${nextCloudCredentials.baseUrl}${apiUrl}${url}`, options);
    const parsedResponse: ApiResponse<K> = JSON.parse(response);
    return Promise.resolve(parsedResponse);
}

export const serverPut = async <T extends Entity, K>(url: string, data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const dataJson = JSON.stringify(data);

    const options = {
        body: dataJson,
        headers: createHeader(nextCloudCredentials),
        json: true,
    };

    const response = await request.put(`${nextCloudCredentials.baseUrl}${apiUrl}${url}/${data.id}`, options);
    const parsedResponse: ApiResponse<K> = JSON.parse(response);
    return Promise.resolve(parsedResponse);
}

export const serverDestroy = async <K>(url: string, id: number, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const options = { headers: createHeader(nextCloudCredentials) };
    const response = await request.delete(`${nextCloudCredentials.baseUrl}${apiUrl}${url}/${id}`, options);
    const parsedResponse: ApiResponse<K> = JSON.parse(response);
    return Promise.resolve(parsedResponse);
}
