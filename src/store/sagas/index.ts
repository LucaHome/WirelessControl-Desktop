import { takeEvery } from "redux-saga/effects";
import {
  AREA_ADD, AREA_DELETE, AREA_UPDATE, AREAS_LOAD,
  NEXT_CLOUD_CREDENTIALS_LOGIN,
} from "../action-types";
import { loadAreas } from "./areas.saga";
import { login } from "./next-cloud-credentials.saga";

/*
    - takeEvery: Does allow concurrent fetches
    - takeLatest: Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
    dispatched while a fetch is already pending, that pending fetch is cancelled
    and only the latest one will be run.
 */

function* sagas() {
  // Starts loadAreas on each dispatched AREAS_LOAD action.
  yield takeEvery(AREAS_LOAD, loadAreas);

  // Starts login on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN action.
  yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN, login);
}

export default sagas;
