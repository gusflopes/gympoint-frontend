import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import plan from './plan/reducer';
import solicitation from './solicitation/reducer';

export default combineReducers({
  auth,
  user,
  plan,
  solicitation,
});
