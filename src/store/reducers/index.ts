import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import areasReducer from "./areas.reducer";
import nextCloudCredentialsReducer from "./next-cloud-credentials.reducer";
import periodicTasksReducer from "./periodic.tasks.reducer";
import wirelessSocketsReducer from "./wireless-sockets.reducer";

export default (history: History) => combineReducers({
    router: connectRouter(history),
    theme: null,

    nextCloudCredentials: nextCloudCredentialsReducer.nextCloudCredentialsReducer,
    nextCloudCredentialsLoading: nextCloudCredentialsReducer.nextCloudCredentialsReducer,

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
