import { takeLatest, call, put, all } from 'redux-saga/effects';

import { planDetails } from './actions';

// import history from '~/services/history';
import api from '~/services/api';

export function* planList() {
  const data = yield call(api.get, '/plans');
  console.log('data');

  yield put(planDetails(data));
}

export default all([takeLatest('@plan/LIST_REQUEST', planList)]);
