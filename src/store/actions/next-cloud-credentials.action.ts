import { NextCloudCredentials } from "../../models";
import {
    NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    NEXT_CLOUD_CREDENTIALS_LOGOUT, NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL, NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
} from "../action-types";

export const nextCloudCredentialsLogin = () => ({
    payload: {},
    type: NEXT_CLOUD_CREDENTIALS_LOGIN,
});

export const nextCloudCredentialsLoginFail = (error: any) => ({
    payload: {
        error,
        nextCloudCredentials: undefined,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL,
});

export const nextCloudCredentialsLoginSuccessful = (nextCloudCredentials: NextCloudCredentials) => ({
    payload: {
        error: undefined,
        nextCloudCredentials,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
});

export const nextCloudCredentialsLogout = () => ({
    payload: {},
    type: NEXT_CLOUD_CREDENTIALS_LOGOUT,
});

export const nextCloudCredentialsLogoutFail = (error: any) => ({
    payload: {
        error,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL,
});

export const nextCloudCredentialsLogoutSuccessful = () => ({
    payload: {
        error: undefined,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
});
