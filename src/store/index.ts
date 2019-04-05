import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                sagaMiddleware,
            ),
        ),
    );

    sagaMiddleware.run(rootSaga);

    // Hot reloading
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("./reducers", () => store.replaceReducer(createRootReducer(history)));
    }

    return store;
}
