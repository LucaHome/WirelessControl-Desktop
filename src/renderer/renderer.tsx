import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import * as ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider, ReactReduxContext } from "react-redux";
import App from "../components/App/App";
import configureStore, { history } from "../store";

const store = configureStore();
const render = () => ReactDom.render(
    <AppContainer>
        <Provider store={store} context={ReactReduxContext}>
            <App history={history} context={ReactReduxContext} />
        </Provider>
    </AppContainer>,
    document.getElementById("app"),
);

render();

// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept("../components/App/App", () => render());
}
