import { Area } from "../../models";
import { ADD_AREA, DELETE_AREA, LOAD_AREAS, SELECT_AREA, UPDATE_AREA } from "../action-types";
import { AreaStore } from "../models";

const initialState: AreaStore = {
    areaSelected: undefined,
    areas: [],
};

export default function(state: AreaStore = initialState, action: any): AreaStore {
    switch (action.type) {
        case ADD_AREA: {
            const area: Area = action.payload.area;
            return {
                ...state,
                areaSelected: area,
                areas: [...state.areas, area],
            };
        }
        case DELETE_AREA: {
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
        case LOAD_AREAS: {
            const areas: Area[] = action.payload.areas;
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
        case SELECT_AREA: {
            const area: Area = action.payload.area;
            return {
                ...state,
                areaSelected: area,
            };
        }
        case UPDATE_AREA: {
            const area: Area = action.payload.area;
            const areas = state.areas;
            const index = areas.map((x: Area) => x.id).indexOf(area.id);
            areas[index] = area;
            return {
                ...state,
                areas,
            };
        }
        default:
            return state;
    }
}
