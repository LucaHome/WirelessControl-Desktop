import MomentUtils from "@date-io/moment";
import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";

import App from "../components/App/App";
import { AppTheme } from "../enums";
import { NextCloudCredentials } from "../models";
import { loadAppThemeFromStore, loadNextCloudCredentialsFromStore } from "../services/storage.service";
import configureStore from "../store";
import { nextCloudCredentialsLogin } from "../store/actions";
import rootSaga from "../store/sagas";

const themeDark: Theme = createMuiTheme({ palette: { type: "dark" } });
const themeLight: Theme = createMuiTheme({ palette: { type: "light" } });

const store: any = configureStore();
store.runSaga(rootSaga);

const nextCloudCredentials: NextCloudCredentials = loadNextCloudCredentialsFromStore();
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
