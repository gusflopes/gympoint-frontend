import { takeLatest, call, put, all } from 'redux-saga/effects';

import {} from './actions';

// import history from '~/services/history';
import api from '~/services/api';

export function* registrationList() {
  // const data = yield call(api.get, '/registrations');
  console.log('data');

  // yield put(registrationDetails(data));
}

export default all([takeLatest('@plan/LIST_REQUEST', registrationList)]);
