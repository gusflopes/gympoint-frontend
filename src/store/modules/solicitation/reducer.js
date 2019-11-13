import produce from 'immer';

const INITIAL_STATE = {
  solicitation: null,
};

export default function solicitation(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@solicitation/FORM_DETAILS': {
        draft.solicitation = action.payload.data;
        break;
      }

      case '@solicitation/ANSWER_SUCCESS': {
        draft.solicitation = null;
        break;
      }

      default:
    }
  });
}
