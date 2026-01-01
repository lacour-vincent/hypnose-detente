import { type Store, Tuple, configureStore as configureStoreFn } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import context from "@/store/context";
import createRootReducer from "@/store/reducers";
import sagas from "@/store/sagas";

export const createStore = (): { store: Store } => {
  const sagaMiddleware = createSagaMiddleware({ context });
  const middlewares = [sagaMiddleware];
  const reducer = createRootReducer();
  const store = configureStoreFn({ reducer, middleware: () => new Tuple(...middlewares) });
  sagaMiddleware.run(sagas);
  return { store };
};
