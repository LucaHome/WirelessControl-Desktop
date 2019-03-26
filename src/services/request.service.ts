import axios from "axios";
import { ApiResponse, Entity } from "../models";

const baseUrl: string = "/index.php/apps/wirelesscontrol/api/v1/";
const headers: any = { "Content-Type": "application/json" };

export const get = <K>(url: string): Promise<ApiResponse<K>> => {
    return axios(`${baseUrl}${url}`)
        .then((response: any) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
};

export const post = <T extends Entity, K>(url: string, data: T): Promise<ApiResponse<K>> => {
    delete data["id"];
    return axios({
        method: "post",
        url: `${baseUrl}${url}`,
        data: data,
        headers: headers
    })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
};

export const put = <T extends Entity, K>(url: string, data: T): Promise<ApiResponse<K>> => {
    return axios({
        method: "put",
        url: `${baseUrl}${url}/${data.id}`,
        data: data,
        headers: headers
    })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
};

export const destroy = <K>(url: string, id: number): Promise<ApiResponse<K>> => {
    return axios({
        method: "delete",
        url: `${baseUrl}${url}/${id}`
    })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((error) => {
            // tslint:disable
            console.warn(JSON.stringify(error));
            return Promise.reject(error);
        });
};
