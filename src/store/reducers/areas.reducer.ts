import { Area } from "../../models";
import {
    AREA_ADD, AREA_ADD_FAIL, AREA_ADD_LOCAL, AREA_ADD_ON_SERVER, AREA_ADD_SUCCESSFUL,
    /*AREA_DELETE,*/ AREA_DELETE_FAIL, AREA_DELETE_ON_SERVER, AREA_DELETE_SUCCESSFUL,
    /*AREA_SELECT,*/ AREA_SELECT_BY_FILTER, /*AREA_SELECT_FAIL,*/ AREA_SELECT_SUCCESSFUL,
    /*AREA_UPDATE,*/ AREA_UPDATE_FAIL, AREA_UPDATE_ON_SERVER, AREA_UPDATE_SUCCESSFUL,
    AREAS_LOAD, AREAS_LOAD_FAIL, AREAS_LOAD_SUCCESSFUL,
} from "../action-types";

const areasReducer = (areas: Area[] = [], action: any): Area[] => {
    switch (action.type) {
        case AREAS_LOAD_SUCCESSFUL: {
            return [...action.payload.list];
        }
        case AREA_ADD_LOCAL:
        case AREA_ADD_SUCCESSFUL: {
            return [...areas, action.payload.area];
        }
        case AREA_UPDATE_SUCCESSFUL: {
            const area: Area = action.payload.area;
            const index = areas.map((x: Area) => x.id).indexOf(area.id);
            areas[index] = area;
            return areas;
        }
        case AREA_ADD:
        case AREA_DELETE_SUCCESSFUL: {
            const area: Area = areas.find((area: Area) => area.id === action.payload.area.id);
            areas.splice(areas.indexOf(area), 1);
            return areas;
        }
        default:
            return areas;
    }
};

const areaSelectReducer = (area: Area = null, action: any): Area => {
    switch (action.type) {
        case AREA_ADD_LOCAL:
        case AREA_ADD_SUCCESSFUL:
        case AREA_SELECT_SUCCESSFUL:
        case AREA_UPDATE_SUCCESSFUL:
            return action.payload.area;
        case AREAS_LOAD_SUCCESSFUL:
            return action.payload.list.length > 0 ? action.payload.list[0] : null
        case AREA_DELETE_SUCCESSFUL:
            return null;
        case AREA_SELECT_BY_FILTER: {
            const areas: Area[] = action.payload.list;
            const filter: string = action.payload.filter;
            return areas.find((area: Area) => area.filter === filter);
        }
        default:
            return area;
    }
};

const areaAddReducer = (area: Area = null, action: any): Area => {
    switch (action.type) {
        case AREA_ADD: {
            return action.payload.area;
        }
        case AREA_ADD_SUCCESSFUL:
        case AREA_ADD_FAIL:
            return null;
        default:
            return area;
    }
};

const areaLoadingReducer = (areaLoading: boolean = false, action: any): boolean => {
    switch (action.type) {
        case AREAS_LOAD:
        case AREA_ADD_ON_SERVER:
        case AREA_UPDATE_ON_SERVER:
        case AREA_DELETE_ON_SERVER:
            return true;
        case AREAS_LOAD_SUCCESSFUL:
        case AREAS_LOAD_FAIL:
        case AREA_ADD_SUCCESSFUL:
        case AREA_ADD_FAIL:
        case AREA_UPDATE_SUCCESSFUL:
        case AREA_UPDATE_FAIL:
        case AREA_DELETE_SUCCESSFUL:
        case AREA_DELETE_FAIL:
            return false;
        default:
            return areaLoading;
    }
};

export default {
    areaAddReducer,
    areaLoadingReducer,
    areaSelectReducer,
    areasReducer,
};
