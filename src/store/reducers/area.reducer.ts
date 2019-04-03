import { Area } from "../../models";
import {
    AREA_ADD, AREA_ADD_FAIL, AREA_ADD_ON_SERVER, AREA_ADD_SUCCESSFUL,
    AREA_DELETE, AREA_DELETE_FAIL, AREA_DELETE_ON_SERVER, AREA_DELETE_SUCCESSFUL,
    AREA_SELECT, AREA_SELECT_FAIL, AREA_SELECT_SUCCESSFUL,
    AREA_UPDATE, AREA_UPDATE_FAIL, AREA_UPDATE_ON_SERVER, AREA_UPDATE_SUCCESSFUL,
    AREAS_LOAD, AREAS_LOAD_FAIL, AREAS_LOAD_SUCCESSFUL,
} from "../action-types";
import { AreaStore } from "../models";

const initialState: AreaStore = {
    areaSelected: undefined,
    areas: [],
};

export default function(state: AreaStore = initialState, action: any): AreaStore {
    switch (action.type) {
        case AREAS_LOAD: {
            // TODO make API call
            // const area: Area = action.payload.area;
            return {
                ...state,
            };
        }
        case AREAS_LOAD_FAIL: {
            return {
                ...state,
            };
        }
        case AREAS_LOAD_SUCCESSFUL: {
            const areas: Area[] = action.payload.list;
            let areaSelected = state.areaSelected;
            if (!areaSelected || areas.filter((x: Area) => x.id === areaSelected.id).length === 0) {
                areaSelected = areas[0];
            }
            return {
                ...state,
                areaSelected,
                areas,
            };
        }
        case AREA_SELECT: {
            return {
                ...state,
            };
        }
        case AREA_SELECT_FAIL: {
            return {
                ...state,
            };
        }
        case AREA_SELECT_SUCCESSFUL: {
            const area: Area = action.payload.area;
            return {
                ...state,
                areaSelected: area,
            };
        }
        case AREA_ADD: {
            // TODO make API call
            // const area: Area = action.payload.area;
            return {
                ...state,
            };
        }
        case AREA_ADD_FAIL: {
            return {
                ...state,
            };
        }
        case AREA_ADD_SUCCESSFUL: {
            const area: Area = action.payload.area;
            return {
                ...state,
                areaSelected: area,
                areas: [...state.areas, area],
            };
        }
        case AREA_UPDATE: {
            // TODO make API call
            // const area: Area = action.payload.area;
            return {
                ...state,
            };
        }
        case AREA_UPDATE_FAIL: {
            return {
                ...state,
            };
        }
        case AREA_UPDATE_SUCCESSFUL: {
            const area: Area = action.payload.area;
            const areas = state.areas;
            const index = areas.map((x: Area) => x.id).indexOf(area.id);
            areas[index] = area;
            return {
                ...state,
                areas,
            };
        }
        case AREA_DELETE: {
            // TODO make API call
            // const area: Area = action.payload.area;
            return {
                ...state,
            };
        }
        case AREA_DELETE_FAIL: {
            return {
                ...state,
            };
        }
        case AREA_DELETE_SUCCESSFUL: {
            const area: Area = action.payload.area;
            const areas = state.areas;
            areas.splice(areas.indexOf(area), 1);
            let areaSelected = state.areaSelected;
            if (areaSelected === area) {
                areaSelected = areas.length > 0 ? areas[0] : undefined;
            }
            return {
                ...state,
                areaSelected,
                areas,
            };
        }
        default: {
            return state;
        }
    }
}
