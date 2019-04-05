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

    areas: areasReducer.areasReducer,
    areaSelected: areasReducer.areaSelectReducer,
    areaToBeAdded: areasReducer.areaAddReducer,
    areaLoading: areasReducer.areaLoadingReducer,

    wirelessSockets: wirelessSocketsReducer.wirelessSocketsReducer,
    wirelessSocketSelected: wirelessSocketsReducer.wirelessSocketSelectReducer,
    wirelessSocketToBeAdded: wirelessSocketsReducer.wirelessSocketAddReducer,
    wirelessSocketLoading: wirelessSocketsReducer.wirelessSocketLoadingReducer,

    periodicTasks: periodicTasksReducer.periodicTasksReducer,
    periodicTaskSelected: periodicTasksReducer.periodicTaskSelectReducer,
    periodicTaskToBeAdded: periodicTasksReducer.periodicTaskAddReducer,
    periodicTaskLoading: periodicTasksReducer.periodicTaskLoadingReducer,
});
