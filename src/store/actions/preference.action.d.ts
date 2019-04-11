import { Action } from "redux";

interface PreferencePayload {
    error: any;
    message: string;
}

export interface PreferenceAction extends Action {
    payload: PreferencePayload;
}
