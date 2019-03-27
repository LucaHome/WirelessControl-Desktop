import { NextCloudCredentials } from "../../models";
import {
    NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL, NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL,
    NEXT_CLOUD_CREDENTIALS_LOGOUT, NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL, NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL,
} from "../action-types";
import { NextCloudCredentialsStore } from "../models";

const initialState: NextCloudCredentialsStore = {
    loading: false,
    nextCloudCredentials: undefined,
};

export default function(state: NextCloudCredentialsStore = initialState, action: any): NextCloudCredentialsStore {
    switch (action.type) {
        case NEXT_CLOUD_CREDENTIALS_LOGIN: {
            // TODO make API call
            // const nextCloudCredentials: NextCloudCredentials = action.payload.nextCloudCredentials;
            return {
                ...state,
                loading: true,
            };
        }
        case NEXT_CLOUD_CREDENTIALS_LOGIN_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL: {
            const nextCloudCredentials: NextCloudCredentials = action.payload.nextCloudCredentials;
            return {
                ...state,
                loading: false,
                nextCloudCredentials,
            };
        }
        case NEXT_CLOUD_CREDENTIALS_LOGOUT: {
            return {
                ...state,
                loading: true,
            };
        }
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }
        case NEXT_CLOUD_CREDENTIALS_LOGOUT_SUCCESSFUL: {
            return {
                ...state,
                loading: false,
                nextCloudCredentials: undefined,
            };
        }
        default: {
            return state;
        }
    }
}