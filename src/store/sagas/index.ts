import { takeEvery } from "redux-saga/effects";
import { NEXT_CLOUD_CREDENTIALS_LOGIN } from "../action-types";
import { login } from "./next-cloud-credentials.saga";

function* wirelessControlSagas() {
    /*
      Starts login on each dispatched NEXT_CLOUD_CREDENTIALS_LOGIN action.
      - takeEvery: Does allow concurrent fetches
      - takeLatest: Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
      dispatched while a fetch is already pending, that pending fetch is cancelled
      and only the latest one will be run.
    */
    yield takeEvery(NEXT_CLOUD_CREDENTIALS_LOGIN, login);
}

export default wirelessControlSagas;
