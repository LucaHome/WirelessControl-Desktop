import { Action } from "redux";
import { Area } from "../../models";

interface AreaPayload {
    error: any,
    area: Area;
}

export interface AreaAction extends Action {
    payload: AreaPayload;
}

interface AreasPayload {
    error: any,
    list: Area[];
}

export interface AreasAction extends Action {
    payload: AreasPayload;
}
