import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

import App from "../components/App/App";
import { loadNextCloudCredentialsFromStore } from "../services/storage.service";
import configureStore from "../store";
import { nextCloudCredentialsLogin } from "../store/actions";
import rootSaga from "../store/sagas";

const store = configureStore();
store.runSaga(rootSaga);

const nextCloudCredentials = loadNextCloudCredentialsFromStore();
if (!!nextCloudCredentials) {
    store.dispatch(nextCloudCredentialsLogin(nextCloudCredentials));
}

ReactDom.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store} context={ReactReduxContext}>
            <App context={ReactReduxContext} />
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById("app"),
);
