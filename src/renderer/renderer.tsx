import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import App from "../components/App/App";
import configureStore, { history } from "../store";

const store = configureStore();

ReactDom.render(
    <Provider store={store} context={ReactReduxContext}>
        <App history={history} context={ReactReduxContext} />
    </Provider>,
    document.getElementById("app"),
);
