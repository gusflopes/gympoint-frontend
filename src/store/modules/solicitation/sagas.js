import { takeLatest, call, put, all } from 'redux-saga/effects';

import {
  solicitationDetails,
  solicitationAnswerRequest,
  solicitationAnswerSuccess,
} from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* updateHelpOrder(data) {
  // const data = yield call(api.get, '/plans');
  const { answer } = data.payload;

  // const payload = yield select(solicitation);

  /** *
   * ATUALIZAR A RESPOSTA NA API !!!!!!
   */

  console.log(answer);

  yield put(solicitationAnswerSuccess(data));
}

export default all([
  takeLatest('@solicitation/ANSWER_REQUEST', updateHelpOrder),
]);
