import type { SagaIterator } from "redux-saga";
import { all, put, takeLeading } from "redux-saga/effects";

import { type FailureActionPayload, Suffix } from "@/store/actions";
import { addError, addSuccess } from "@/store/actions/alerting";

import { ACTION_FAILURE_LABELS, ACTION_SUCCESS_LABELS } from "@/referential/alerting";

interface SuccessAction {
  type: `${Uppercase<string>}_${Suffix.SUCCESS}`;
}

interface FailureAction {
  type: `${Uppercase<string>}_${Suffix.FAILURE}`;
  payload: FailureActionPayload;
}

function* handleAnySuccessAction(action: SuccessAction): SagaIterator {
  const message = ACTION_SUCCESS_LABELS[action.type];
  if (message !== undefined) yield put(addSuccess(message));
}

function* handleAnyFailureAction(action: FailureAction): SagaIterator {
  const message = ACTION_FAILURE_LABELS[action.type];
  if (message !== undefined) yield put(addError(message));
}

export default function* () {
  yield all([
    // @ts-expect-error: Wrong typing of the library.
    takeLeading((action: SuccessAction) => new RegExp(`_${Suffix.SUCCESS}$`).test(action.type), handleAnySuccessAction),
    // @ts-expect-error: Wrong typing of the library.
    takeLeading((action: FailureAction) => new RegExp(`_${Suffix.FAILURE}$`).test(action.type), handleAnyFailureAction),
  ]);
}
