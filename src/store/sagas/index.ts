import { takeEvery } from "redux-saga/effects";
import {
  AREA_ADD, AREA_DELETE, AREA_UPDATE, AREAS_LOAD,
  NEXT_CLOUD_CREDENTIALS_LOGIN, NEXT_CLOUD_CREDENTIALS_LOGOUT,
  PERIODIC_TASK_ADD, PERIODIC_TASK_DELETE, PERIODIC_TASK_UPDATE, PERIODIC_TASKS_LOAD,
  WIRELESS_SOCKET_ADD, WIRELESS_SOCKET_DELETE, WIRELESS_SOCKET_UPDATE, WIRELESS_SOCKETS_LOAD,
} from "../action-types";
import { areaAdd, areaDelete, areasLoad, areaUpdate } from "./areas.saga";
import { login, logout } from "./next-cloud-credentials.saga";
import { periodicTaskAdd, periodicTaskDelete, periodicTasksLoad, periodicTaskUpdate } from "./periodic-tasks.saga";
import { wirelessSocketAdd, wirelessSocketDelete, wirelessSocketsLoad, wirelessSocketUpdate } from "./wireless-sockets.saga";

/*
    - takeEvery: Does allow concurrent fetches
    - takeLatest: Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
 */

function* sagas() {
  // Starts areasLoad on each dispatched AREAS_LOAD action.
  yield takeEvery(AREAS_LOAD, areasLoad);
  // Starts areasLoad on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL action.
  // yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL, areasLoad);
  // Starts areaAdd on each dispatched AREA_ADD action.
  yield takeEvery(AREA_ADD, areaAdd);
  // Starts areaUpdate on each dispatched AREA_UPDATE action.
  yield takeEvery(AREA_UPDATE, areaUpdate);
  // Starts areaDelete on each dispatched AREA_DELETE action.
  yield takeEvery(AREA_DELETE, areaDelete);

  // Starts login on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN action.
  yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN, login);
  // Starts login on each dispatched NEXT_CLOUD_CREDENTIALS_LOGOUT action.
  yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGOUT, logout);

  // Starts periodicTasksLoad on each dispatched PERIODIC_TASKS_LOAD action.
  yield takeEvery(PERIODIC_TASKS_LOAD, periodicTasksLoad);
  // Starts periodicTasksLoad on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL action.
  // yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL, periodicTasksLoad);
  // Starts periodicTaskAdd on each dispatched PERIODIC_TASK_ADD action.
  yield takeEvery(PERIODIC_TASK_ADD, periodicTaskAdd);
  // Starts periodicTaskUpdate on each dispatched PERIODIC_TASK_UPDATE action.
  yield takeEvery(PERIODIC_TASK_UPDATE, periodicTaskUpdate);
  // Starts periodicTaskDelete on each dispatched PERIODIC_TASK_DELETE action.
  yield takeEvery(PERIODIC_TASK_DELETE, periodicTaskDelete);

  // Starts wirelessSocketsLoad on each dispatched WIRELESS_SOCKETS_LOAD action.
  yield takeEvery(WIRELESS_SOCKETS_LOAD, wirelessSocketsLoad);
  // Starts wirelessSocketsLoad on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL action.
  // yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN_SUCCESSFUL, wirelessSocketsLoad);
  // Starts wirelessSocketAdd on each dispatched WIRELESS_SOCKET_ADD action.
  yield takeEvery(WIRELESS_SOCKET_ADD, wirelessSocketAdd);
  // Starts wirelessSocketUpdate on each dispatched WIRELESS_SOCKET_UPDATE action.
  yield takeEvery(WIRELESS_SOCKET_UPDATE, wirelessSocketUpdate);
  // Starts wirelessSocketDelete on each dispatched WIRELESS_SOCKET_DELETE action.
  yield takeEvery(WIRELESS_SOCKET_DELETE, wirelessSocketDelete);
}

export default sagas;
