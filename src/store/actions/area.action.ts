import { Area } from "../../models";
import {
    AREA_ADD, AREA_ADD_FAIL, AREA_ADD_LOCAL, AREA_ADD_ON_SERVER, AREA_ADD_SUCCESSFUL,
    AREA_DELETE, AREA_DELETE_FAIL, AREA_DELETE_ON_SERVER, AREA_DELETE_SUCCESSFUL,
    AREA_SELECT, AREA_SELECT_BY_FILTER, AREA_SELECT_FAIL, AREA_SELECT_SUCCESSFUL,
    AREA_UPDATE, AREA_UPDATE_FAIL, AREA_UPDATE_ON_SERVER, AREA_UPDATE_SUCCESSFUL,
    AREAS_LOAD, AREAS_LOAD_FAIL, AREAS_LOAD_SUCCESSFUL,
} from "../action-types";
import { AreaAction, AreaFilterAction, AreasAction } from "./area.action.d";

export const areasLoad = (): AreasAction => ({
    payload: {
        error: null,
        list: null,
    },
    type: AREAS_LOAD,
});

export const areasLoadFail = (error: any): AreasAction => ({
    payload: {
        error,
        list: null,
    },
    type: AREAS_LOAD_FAIL,
});

export const areasLoadSuccessful = (list: Area[]): AreasAction => ({
    payload: {
        error: null,
        list,
    },
    type: AREAS_LOAD_SUCCESSFUL,
});

export const areaSelect = (): AreaAction => ({
    payload: {
        area: null,
        error: null,
    },
    type: AREA_SELECT,
});

export const areaSelectByFilter = (filter: string, list: Area[]): AreaFilterAction => ({
    payload: {
        error: null,
        filter,
        list,
    },
    type: AREA_SELECT_BY_FILTER,
});

export const areaSelectFail = (error: any): AreaAction => ({
    payload: {
        area: null,
        error,
    },
    type: AREA_SELECT_FAIL,
});

export const areaSelectSuccessful = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_SELECT_SUCCESSFUL,
});

export const areaAdd = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_ADD,
});

export const areaAddLocal = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_ADD_LOCAL,
});

export const areaAddOnServer = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_ADD_ON_SERVER,
});

export const areaAddFail = (error: any): AreaAction => ({
    payload: {
        area: null,
        error,
    },
    type: AREA_ADD_FAIL,
});

export const areaAddSuccessful = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_ADD_SUCCESSFUL,
});

export const areaUpdate = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_UPDATE,
});

export const areaUpdateOnServer = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_UPDATE_ON_SERVER,
});

export const areaUpdateFail = (error: any): AreaAction => ({
    payload: {
        area: null,
        error,
    },
    type: AREA_UPDATE_FAIL,
});

export const areaUpdateSuccessful = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_UPDATE_SUCCESSFUL,
});

export const areaDelete = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_DELETE,
});

export const areaDeleteOnServer = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_DELETE_ON_SERVER,
});

export const areaDeleteFail = (error: any): AreaAction => ({
    payload: {
        area: null,
        error,
    },
    type: AREA_DELETE_FAIL,
});

export const areaDeleteSuccessful = (area: Area): AreaAction => ({
    payload: {
        area,
        error: null,
    },
    type: AREA_DELETE_SUCCESSFUL,
});
