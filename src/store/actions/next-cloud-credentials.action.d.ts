import { Action } from "redux";
import { NextCloudCredentials } from "../../models";

interface NextCloudCredentialsPayload {
    error: any,
    nextCloudCredentials: NextCloudCredentials;
}

export interface NextCloudCredentialsAction extends Action {
    payload: NextCloudCredentialsPayload;
}
