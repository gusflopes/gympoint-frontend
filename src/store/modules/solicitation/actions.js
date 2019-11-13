export function solicitationDetails(data) {
  return {
    type: '@solicitation/FORM_DETAILS',
    payload: { data },
  };
}

export function solicitationAnswerRequest(answer) {
  return {
    type: '@solicitation/ANSWER_REQUEST',
    payload: { answer },
  };
}

export function solicitationAnswerSuccess(data) {
  return {
    type: '@solicitation/ANSWER_SUCCESS',
    payload: { data },
  };
}
