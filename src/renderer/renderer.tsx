import MomentUtils from "@date-io/moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";

import App from "../components/App/App";
import { AppTheme } from "../enums";
import { loadAppThemeFromStore, loadNextCloudCredentialsFromStore } from "../services/storage.service";
import configureStore from "../store";
import { nextCloudCredentialsLogin } from "../store/actions";
import rootSaga from "../store/sagas";

const themeDark = createMuiTheme({ palette: { type: "dark" } });
const themeLight = createMuiTheme({ palette: { type: "light" } });

const store = configureStore();
store.runSaga(rootSaga);

const nextCloudCredentials = loadNextCloudCredentialsFromStore();
if (!!nextCloudCredentials) {
    store.dispatch(nextCloudCredentialsLogin(nextCloudCredentials));
}

ReactDom.render(
    <MuiThemeProvider theme={loadAppThemeFromStore() === AppTheme.Dark ? themeDark : themeLight}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Provider store={store} context={ReactReduxContext}>
                <App context={ReactReduxContext} />
            </Provider>
        </MuiPickersUtilsProvider>
    </MuiThemeProvider >,
    document.getElementById("app"),
);
