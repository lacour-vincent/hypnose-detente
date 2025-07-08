import {
  type Middleware,
  Tuple,
  type UnknownAction,
  configureStore as configureStoreFn,
  type createAction,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import createRootReducer, { type State } from "@sg/store/reducers";
import sagas from "@sg/store/sagas";
import context from "@sg/store/test/context";

interface LookUpAction extends UnknownAction {
  promise: Promise<void>;
  callback: () => void;
}

class StoreTester {
  private store = this.configureStore();
  private lookups: Record<UnknownAction["type"], LookUpAction> = {};

  private configureStore() {
    const sagaMiddleware = createSagaMiddleware({ context });
    const testingMiddleware = this.createTestingMiddleware();
    const middlewares = [sagaMiddleware, testingMiddleware];
    const reducers = createRootReducer();
    const store = configureStoreFn({ reducer: reducers, middleware: () => new Tuple(...middlewares) });
    sagaMiddleware.run(sagas);
    return store;
  }

  private createTestingMiddleware(): Middleware<unknown, State> {
    return () => (next) => (action: unknown) => {
      const lookup = this.getLookUpAction((action as UnknownAction).type);
      lookup.callback();
      return next(action);
    };
  }

  private getLookUpAction(type: UnknownAction["type"]): LookUpAction {
    const action = this.lookups[type];
    if (action !== undefined) return action;
    const newAction: Partial<LookUpAction> = { type };
    newAction.promise = new Promise((resolve) => {
      newAction.callback = resolve;
    });
    this.lookups[type] = newAction as LookUpAction;
    return newAction as LookUpAction;
  }

  dispatch(action: UnknownAction) {
    return this.store.dispatch(action);
  }

  getState(): State {
    return this.store.getState();
  }

  waitFor(action: ReturnType<typeof createAction>) {
    return this.getLookUpAction(action.type).promise;
  }
}

export default StoreTester;
