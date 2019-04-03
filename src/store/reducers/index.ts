import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import areaReducer from "./area.reducer";
import loadingReducer from "./loading.reducer";
import nextCloudCredentialsTaskReducer from "./next-cloud-credentials.reducer";
import periodicTaskReducer from "./periodic-task.reducer";
import wirelessSocketReducer from "./wireless-socket.reducer";

export default (history) => combineReducers({
    areaReducer,
    loadingReducer,
    nextCloudCredentialsTaskReducer,
    periodicTaskReducer,
    router: connectRouter(history),
    wirelessSocketReducer,
});
