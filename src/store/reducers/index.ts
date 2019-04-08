import { combineReducers } from "redux";
import areasReducer from "./areas.reducer";
import nextCloudCredentialsReducer from "./next-cloud-credentials.reducer";
import periodicTasksReducer from "./periodic-tasks.reducer";
import routesReducer from "./routes.reducer";
import snackbarReducer from "./snackbar.reducer";
import wirelessSocketsReducer from "./wireless-sockets.reducer";

export default () => combineReducers({
    route: routesReducer.routeReducer,

    snackbarMessage: snackbarReducer.snackbarMessageReducer,
    snackbarSeverity: snackbarReducer.snackbarSeverityReducer,

    nextCloudCredentials: nextCloudCredentialsReducer.nextCloudCredentialsReducer,
    nextCloudCredentialsLoading: nextCloudCredentialsReducer.nextCloudCredentialsLoadingReducer,

    areaLoading: areasReducer.areaLoadingReducer,
    areaSelected: areasReducer.areaSelectReducer,
    areaToBeAdded: areasReducer.areaAddReducer,
    areas: areasReducer.areasReducer,

    wirelessSocketLoading: wirelessSocketsReducer.wirelessSocketLoadingReducer,
    wirelessSocketSelected: wirelessSocketsReducer.wirelessSocketSelectReducer,
    wirelessSocketToBeAdded: wirelessSocketsReducer.wirelessSocketAddReducer,
    wirelessSockets: wirelessSocketsReducer.wirelessSocketsReducer,

    periodicTaskLoading: periodicTasksReducer.periodicTaskLoadingReducer,
    periodicTaskSelected: periodicTasksReducer.periodicTaskSelectReducer,
    periodicTaskToBeAdded: periodicTasksReducer.periodicTaskAddReducer,
    periodicTasks: periodicTasksReducer.periodicTasksReducer,
});
