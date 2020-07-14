import { createReducer, on } from '@ngrx/store';
import { AuthenticatedStatus } from '../../enums/authenticated-status.enum';
import { loginUserSuccess, loginUserError, logoutUser } from '../actions/authentication.actions';
import { initialAuthenticationState } from '../state/authentication.state';

const _authenticationReducer = createReducer(
  initialAuthenticationState,
  on(loginUserSuccess, (state, { payload }) => {
    return {
      ...state,
      authenticatedUser: payload,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    };
  }),
  on(loginUserError, (state, { payload }) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: payload.error.message
    }
  }),
  on(logoutUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: null
    }
  })
);

export function authenticationReducer(state, action) {
  return _authenticationReducer(state, action);
}