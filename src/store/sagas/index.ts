import { takeEvery } from "redux-saga/effects";
import {
  AREA_ADD, AREA_DELETE, AREA_UPDATE, AREAS_LOAD,
  NEXT_CLOUD_CREDENTIALS_LOGIN,
} from "../action-types";
import { areaAdd, areaDelete, areasLoad, areaUpdate } from "./areas.saga";
import { login } from "./next-cloud-credentials.saga";

/*
    - takeEvery: Does allow concurrent fetches
    - takeLatest: Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
 */

function* sagas() {
  // Starts areasLoad on each dispatched AREAS_LOAD action.
  yield takeEvery(AREAS_LOAD, areasLoad);
  // Starts areaAdd on each dispatched AREA_ADD action.
  yield takeEvery(AREA_ADD, areaAdd);
  // Starts areaUpdate on each dispatched AREA_UPDATE action.
  yield takeEvery(AREA_UPDATE, areaUpdate);
  // Starts areaDelete on each dispatched AREA_DELETE action.
  yield takeEvery(AREA_DELETE, areaDelete);

  // Starts login on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN action.
  yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN, login);
}

export default sagas;
