import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

export default function configureStore(preloadedState?: any) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        createRootReducer(),
        preloadedState,
        compose(
            applyMiddleware(
                sagaMiddleware,
            ),
        ),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
