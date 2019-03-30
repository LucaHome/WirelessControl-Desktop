import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "../components/App/App";
import store from "../store";

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app"),
);
