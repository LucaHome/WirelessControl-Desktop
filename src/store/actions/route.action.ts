import { ROUTE_SET } from "../action-types";
import { RouteAction } from "./route.action.d";

export const routeSet = (route: string): RouteAction => ({
    payload: {
        error: undefined,
        route,
    },
    type: ROUTE_SET,
});
