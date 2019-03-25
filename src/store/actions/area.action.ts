import { Area } from "../../models";
import { ADD_AREA, DELETE_AREA, LOAD_AREAS, SELECT_AREA, UPDATE_AREA } from "../action-types";

export const addArea = (area: Area) => ({
    payload: {
        area,
    },
    type: ADD_AREA,
});

export const deleteArea = (area: Area) => ({
    payload: {
        area,
    },
    type: DELETE_AREA,
});

export const loadArea = () => ({
    payload: {},
    type: LOAD_AREAS,
});

export const selectArea = (area: Area) => ({
    payload: {
        area,
    },
    type: SELECT_AREA,
});

export const updateArea = (area: Area) => ({
    payload: {
        area,
    },
    type: UPDATE_AREA,
});
