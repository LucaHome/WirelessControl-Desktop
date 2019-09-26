import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import createRootReducer from "./reducers";

export const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

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
