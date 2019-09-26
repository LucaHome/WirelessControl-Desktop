import * as request from "request-promise-native";
import { ApiResponse, Entity, NextCloudCredentials } from "../models";

const apiUrl: string = "/index.php/apps/wirelesscontrol/api/";

const createHeader = (nextCloudCredentials: NextCloudCredentials): { "Authorization": string, "Content-Type": string } => {
    const encoded: string = encodeURIComponent(`${nextCloudCredentials.userName}:${nextCloudCredentials.passPhrase}`);
    const unescaped: string = unescape(encoded);
    const authorization: string = "Basic " + btoa(unescaped);

    return {
        "Authorization": authorization,
        "Content-Type": "application/json",
    };
};

export const serverDelete = async <K>(url: string, apiVersion: "v1" | "v2", id: number, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const options: any = { headers: createHeader(nextCloudCredentials) };
    const response: ApiResponse<K> = await request.delete(`${nextCloudCredentials.baseUrl}${apiUrl}${apiVersion}/${url}/${id}`, options);
    return Promise.resolve(response);
}

export const serverGet = async <K>(url: string, apiVersion: "v1" | "v2", nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const options: any = { headers: createHeader(nextCloudCredentials) };
    const response: ApiResponse<K> = await request.get(`${nextCloudCredentials.baseUrl}${apiUrl}${apiVersion}/${url}`, options);
    return Promise.resolve(response);
}

export const serverPost = async <T extends Entity, K>(url: string, apiVersion: "v1" | "v2", data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const dataJson: string = JSON.stringify(data);
    delete dataJson["id"];

    const options: any = {
        form: JSON.parse(dataJson),
        headers: createHeader(nextCloudCredentials),
    };

    const response: ApiResponse<K> = await request.post(`${nextCloudCredentials.baseUrl}${apiUrl}${apiVersion}/${url}`, options);
    return Promise.resolve(response);
}

export const serverPut = async <T extends Entity, K>(url: string, apiVersion: "v1" | "v2", data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> => {
    const dataJson: string = JSON.stringify(data);

    const options: any = {
        form: JSON.parse(dataJson),
        headers: createHeader(nextCloudCredentials),
    };

    const response: ApiResponse<K> = await request.put(`${nextCloudCredentials.baseUrl}${apiUrl}${apiVersion}/${url}/${data.id}`, options);
    return Promise.resolve(response);
}
