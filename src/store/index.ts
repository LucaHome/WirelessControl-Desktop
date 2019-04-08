import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState?: any): any {
    return {
        ...createStore(
            createRootReducer(),
            preloadedState,
            applyMiddleware(sagaMiddleware),
        ),
        runSaga: sagaMiddleware.run,
    };
}
