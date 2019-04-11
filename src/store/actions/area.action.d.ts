import { Action } from "redux";
import { Area } from "../../models";

interface AreaPayload {
    error: any;
    area: Area;
}

export interface AreaAction extends Action {
    payload: AreaPayload;
}

interface AreasPayload {
    error: any;
    list: Area[];
}

export interface AreasAction extends Action {
    payload: AreasPayload;
}

interface AreaFilterPayload {
    error: any;
    filter: string;
    list: Area[];
}

export interface AreaFilterAction extends Action {
    payload: AreaFilterPayload;
}
