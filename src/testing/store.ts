import { type Store, Tuple, configureStore as configureStoreFn } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import createRootReducer from "@/store/reducers";
import sagas from "@/store/sagas";

export const createTestStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const reducers = createRootReducer();
  const store = configureStoreFn({ reducer: reducers, middleware: () => new Tuple(...middlewares) });
  sagaMiddleware.run(sagas);
  return store;
};
