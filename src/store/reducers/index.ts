import { combineReducers } from "redux";
import areaReducer from "./area.reducer";
import periodicTaskReducer from "./periodic-task.reducer";
import wirelessSocketReducer from "./wireless-socket.reducer";

export default combineReducers({ areaReducer, periodicTaskReducer, wirelessSocketReducer });
