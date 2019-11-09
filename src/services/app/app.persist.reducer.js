import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setSession: ['sessionData'],
  logout: null,
  setIsLoggedIn: ['isLoggedIn'],
})

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
  sessionData: {},
  isLoggedIn: false,
})

/* ------------- Reducers ------------- */

const logout = state => state.merge(Map({
  sessionData: {},
  isLoggedIn: false
}));

const setSession = (state, { sessionData }) =>
  state.mergeDeep(Map({ sessionData }));

const setIsLoggedIn = (state, {isLoggedIn}) =>
  state.mergeDeep(Map({isLoggedIn}));

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SESSION]: setSession,
  [Types.LOGOUT]: logout,
  [Types.SET_IS_LOGGED_IN]: setIsLoggedIn,
})
