import { NextCloudCredentials } from "../../models";
import {
    NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    NEXT_CLOUD_CREDENTIALS_LOGOUT, NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL, NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
} from "../action-types";

const nextCloudCredentialsReducer = (nextCloudCredentials: NextCloudCredentials = undefined, action: any): NextCloudCredentials => {
    switch (action.type) {
        case NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL:
            return undefined;
        case NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL:
            return action.payload.nextCloudCredentials;
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL:
            return nextCloudCredentials;
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL:
            return undefined;
        default:
            return nextCloudCredentials;
    }
};

const nextCloudCredentialsLoadingReducer = (nextCloudCredentialsLoading: boolean = false, action: any): boolean => {
    switch (action.type) {
        case NEXT_CLOUD_CREDENTIALS_LOGIN:
        case NEXT_CLOUD_CREDENTIALS_LOGOUT:
            return true;
        case NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL:
        case NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL:
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL:
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL:
            return false;
        default:
            return nextCloudCredentialsLoading;
    }
};

export default {
    nextCloudCredentialsLoadingReducer,
    nextCloudCredentialsReducer,
};
