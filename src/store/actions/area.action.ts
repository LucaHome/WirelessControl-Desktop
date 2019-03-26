import { Area } from "../../models";
import {
    AREA_ADD, AREA_ADD_FAIL, AREA_ADD_ON_SERVER, AREA_ADD_SUCCESSFUL,
    AREA_DELETE, AREA_DELETE_FAIL, AREA_DELETE_ON_SERVER, AREA_DELETE_SUCCESSFUL,
    AREA_SELECT, AREA_SELECT_FAIL, AREA_SELECT_SUCCESSFUL,
    AREA_UPDATE, AREA_UPDATE_FAIL, AREA_UPDATE_ON_SERVER, AREA_UPDATE_SUCCESSFUL,
    AREAS_LOAD, AREAS_LOAD_FAIL, AREAS_LOAD_SUCCESSFUL,
} from "../action-types";

export const areasLoad = () => ({
    payload: {},
    type: AREAS_LOAD,
});

export const areasLoadFail = (error: any) => ({
    payload: {
        error,
        list: undefined,
    },
    type: AREAS_LOAD_FAIL,
});

export const areasLoadSuccessful = (list: Area[]) => ({
    payload: {
        error: undefined,
        list,
    },
    type: AREAS_LOAD_SUCCESSFUL,
});

export const areaSelect = () => ({
    payload: {},
    type: AREA_SELECT,
});

export const areaSelectFail = (error: any) => ({
    payload: {
        area: undefined,
        error,
    },
    type: AREA_SELECT_FAIL,
});

export const areaSelectSuccessful = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_SELECT_SUCCESSFUL,
});

export const areaAdd = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_ADD,
});

export const areaAddOnServer = () => ({
    payload: {},
    type: AREA_ADD_ON_SERVER,
});

export const areaAddFail = (error: any) => ({
    payload: {
        area: undefined,
        error,
    },
    type: AREA_ADD_FAIL,
});

export const areaAddSuccessful = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_ADD_SUCCESSFUL,
});

export const areaUpdate = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_UPDATE,
});

export const areaUpdateOnServer = () => ({
    payload: {},
    type: AREA_UPDATE_ON_SERVER,
});

export const areaUpdateFail = (error: any) => ({
    payload: {
        area: undefined,
        error,
    },
    type: AREA_UPDATE_FAIL,
});

export const areaUpdateSuccessful = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_UPDATE_SUCCESSFUL,
});

export const areaDelete = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_DELETE,
});

export const areaDeleteOnServer = () => ({
    payload: {},
    type: AREA_DELETE_ON_SERVER,
});

export const areaDeleteFail = (error: any) => ({
    payload: {
        area: undefined,
        error,
    },
    type: AREA_DELETE_FAIL,
});

export const areaDeleteSuccessful = (area: Area) => ({
    payload: {
        area,
        error: undefined,
    },
    type: AREA_DELETE_SUCCESSFUL,
});
