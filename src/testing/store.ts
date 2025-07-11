import { type Store, Tuple, configureStore as configureStoreFn } from "@reduxjs/toolkit";

import createRootReducer from "@/store/reducers";
import sagas from "@/store/sagas";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require("redux-saga").default;

export const createTestStore = (): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const reducers = createRootReducer();
  const store = configureStoreFn({ reducer: reducers, middleware: () => new Tuple(...middlewares) });
  sagaMiddleware.run(sagas);
  return store;
};
