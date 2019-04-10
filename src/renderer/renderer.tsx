import "bootstrap/dist/css/bootstrap.min.css";

import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";

import MomentUtils from "@date-io/moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";

import App from "../components/App/App";
import { loadAppThemeFromStore, loadNextCloudCredentialsFromStore } from "../services/storage.service";
import configureStore from "../store";
import { nextCloudCredentialsLogin } from "../store/actions";
import rootSaga from "../store/sagas";

const theme = createMuiTheme({
    palette: {
        type: loadAppThemeFromStore(),
    },
});

const store = configureStore();
store.runSaga(rootSaga);

const nextCloudCredentials = loadNextCloudCredentialsFromStore();
if (!!nextCloudCredentials) {
    store.dispatch(nextCloudCredentialsLogin(nextCloudCredentials));
}

ReactDom.render(
    <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Provider store={store} context={ReactReduxContext}>
                <App context={ReactReduxContext} />
            </Provider>
        </MuiPickersUtilsProvider>
    </MuiThemeProvider >,
    document.getElementById("app"),
);
