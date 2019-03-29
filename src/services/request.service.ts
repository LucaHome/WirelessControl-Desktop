import axios from "axios";
import { ApiResponse, Entity, NextCloudCredentials } from "../models";

const apiUrl: string = "/index.php/apps/wirelesscontrol/api/v1/";

const createHeader = (nextCloudCredentials: NextCloudCredentials): any => {
    const encoded = encodeURIComponent(`${nextCloudCredentials.userName}:${nextCloudCredentials.passPhrase}`);
    const unescaped = unescape(encoded);
    const authorization = "Basic " + btoa(unescaped);

    return {
        "Content-Type": "application/json",
        "authorization": authorization,
    };
};

export default class RequestService {
    public static get<K>(url: string, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> {
        return axios({
            headers: createHeader(nextCloudCredentials),
            method: "get",
            url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}`,
        })
            .then((response: any) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    }

    public static post<T extends Entity, K>(url: string, data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> {
        const dataJson = JSON.stringify(data);
        delete dataJson["id"];
        return axios({
            data: dataJson,
            headers: createHeader(nextCloudCredentials),
            method: "post",
            url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}`,
        })
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    }

    public static put<T extends Entity, K>(url: string, data: T, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> {
        const dataJson = JSON.stringify(data);
        return axios({
            data: dataJson,
            headers: createHeader(nextCloudCredentials),
            method: "put",
            url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}/${data.id}`,
        })
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    }

    public static destroy<K>(url: string, id: number, nextCloudCredentials: NextCloudCredentials): Promise<ApiResponse<K>> {
        return axios({
            headers: createHeader(nextCloudCredentials),
            method: "delete",
            url: `${nextCloudCredentials.baseUrl}${apiUrl}${url}/${id}`,
        })
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    }
}
