import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import plan from './plan/sagas';
import solicitation from './solicitation/sagas';

export default function* rootSaga() {
  yield all([auth, user, plan, solicitation]);
}
