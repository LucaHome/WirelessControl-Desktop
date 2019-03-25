import axios from "axios";
import { Entity } from "../models/entity";

const baseUrl: string = "/index.php/apps/wirelesscontrol/api/v1/";

export default {
    get(url: string) {
        return axios(`${baseUrl}${url}`)
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    },
    post<T extends Entity>(url: string, data: T) {
        delete data['id'];
        // TODO check contentType => maybe config in headers (contentType: 'application/json')
        return axios({
            method: 'post',
            url: `${baseUrl}${url}`,
            data: data
        })
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    },
    put<T extends Entity>(url: string, data: T) {
        // TODO check contentType => maybe config in headers (contentType: 'application/json')
        return axios({
            method: 'put',
            url: `${baseUrl}${url}/${data.id}`,
            data: data
        })
            .then((response) => {
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                // tslint:disable
                console.warn(JSON.stringify(error));
                return Promise.reject(error);
            });
    },
    delete(url: string, id: number) {
        return axios({
            method: 'delete',
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
    }
}
