import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider, ReactReduxContext } from "react-redux";
import App from "../components/App/App";
import configureStore from "../store";

ReactDom.render(
    <Provider store={configureStore()} context={ReactReduxContext}>
        <App context={ReactReduxContext} />
    </Provider>,
    document.getElementById("app"),
);
