import * as Routes from "../../constants/routes.constants";
import { NextCloudCredentials } from "../../models";
import HistoryService from "../../services/history.service";
import {
    NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    NEXT_CLOUD_CREDENTIALS_LOGOUT, NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL, NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
} from "../action-types";

export const nextCloudCredentialsLogin = (nextCloudCredentials: NextCloudCredentials) => {
    HistoryService.replace(Routes.loading);
    return ({
        payload: {
            nextCloudCredentials,
        },
        type: NEXT_CLOUD_CREDENTIALS_LOGIN,
    });
};

export const nextCloudCredentialsLoginFail = (error: any) => {
    HistoryService.replace(Routes.login);
    return ({
        payload: {
            error,
            nextCloudCredentials: undefined,
        },
        type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL,
    });
};

export const nextCloudCredentialsLoginSuccessful = (nextCloudCredentials: NextCloudCredentials) => {
    HistoryService.replace(Routes.areas);
    return ({
        payload: {
            error: undefined,
            nextCloudCredentials,
        },
        type: NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    });
};

export const nextCloudCredentialsLogout = () => {
    HistoryService.replace(Routes.loading);
    return ({
        payload: {},
        type: NEXT_CLOUD_CREDENTIALS_LOGOUT,
    });
};

export const nextCloudCredentialsLogoutFail = (error: any) => {
    HistoryService.goBack();
    return ({
        payload: {
            error,
        },
        type: NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL,
    });
};

export const nextCloudCredentialsLogoutSuccessful = () => {
    HistoryService.replace(Routes.login);
    return ({
        payload: {
            error: undefined,
        },
        type: NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
    });
};
