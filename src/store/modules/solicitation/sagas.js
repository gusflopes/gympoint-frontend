import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  solicitationDetails,
  solicitationAnswerRequest,
  solicitationAnswerSuccess,
} from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* planList() {
  const data = yield call(api.get, '/plans');
  console.log('data');

  yield put(solicitationDetails(data));
}

export default all([
  takeLatest('@solicitation/LIST_REQUEST', solicitationAnswerRequest),
]);
