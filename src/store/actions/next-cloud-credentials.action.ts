import { NextCloudCredentials } from "../../models";
import {
    NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    NEXT_CLOUD_CREDENTIALS_LOGOUT, NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL, NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
} from "../action-types";
import { NextCloudCredentialsAction } from "./next-cloud-credentials.action.d";

export const nextCloudCredentialsLogin = (nextCloudCredentials: NextCloudCredentials): NextCloudCredentialsAction => ({
    payload: {
        error: null,
        nextCloudCredentials,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGIN,
});

export const nextCloudCredentialsLoginFail = (error: any): NextCloudCredentialsAction => ({
    payload: {
        error,
        nextCloudCredentials: null,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL,
});

export const nextCloudCredentialsLoginSuccessful = (nextCloudCredentials: NextCloudCredentials): NextCloudCredentialsAction => ({
    payload: {
        error: null,
        nextCloudCredentials,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
});

export const nextCloudCredentialsLogout = (): NextCloudCredentialsAction => ({
    payload: {
        error: null,
        nextCloudCredentials: null,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGOUT,
});

export const nextCloudCredentialsLogoutFail = (error: any): NextCloudCredentialsAction => ({
    payload: {
        error,
        nextCloudCredentials: null,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL,
});

export const nextCloudCredentialsLogoutSuccessful = (): NextCloudCredentialsAction => ({
    payload: {
        error: null,
        nextCloudCredentials: null,
    },
    type: NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
});
