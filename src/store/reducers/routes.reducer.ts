import { ROUTE_SET } from "../action-types";

const routeReducer = (route: string = "", action: any): string => {
    switch (action.type) {
        case ROUTE_SET:
            return action.payload.route;
        default:
            return route;
    }
}

export default {
    routeReducer,
}
