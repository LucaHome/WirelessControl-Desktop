import { Action } from "redux";

interface RoutePayload {
    error: any,
    route: string;
}

export interface RouteAction extends Action {
    payload: RoutePayload;
}
