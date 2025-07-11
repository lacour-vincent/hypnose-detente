import { type Store, Tuple, configureStore as configureStoreFn } from "@reduxjs/toolkit";

import context from "@/store/context";
import createRootReducer from "@/store/reducers";
import sagas from "@/store/sagas";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require("redux-saga").default;

export const createStore = (): { store: Store } => {
  const sagaMiddleware = createSagaMiddleware({ context });
  const middlewares = [sagaMiddleware];
  const reducer = createRootReducer();
  const store = configureStoreFn({ reducer, middleware: () => new Tuple(...middlewares) });
  sagaMiddleware.run(sagas);
  return { store };
};
