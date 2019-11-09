import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  forgotPassword: ['email'],
  setErrorMessage: ['errorMessage'],
  saveDeviceOneSignalInfo: ['deviceInfo'],
  setAppCredentials: ['credentials'],
  setLocation: ['location'],
  getProfile: ['user_id'],
  setProfile: ['userProfile'],
  setVisit: ['view', 'idEntity', 'typeRequest'],
  setNewNote: ['NotefromEntity'],
  setTypeFromComment: ['typeFromComment']
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
  errorMessage: '',
  deviceInfo: null,
  location: {},
  userProfile: {}, // profile of broker or homeowner
  typeFromComment: ''
})

/* ------------- Reducers ------------- */

const setErrorMessage = (state, { errorMessage }) => state.mergeDeep(Map({
  errorMessage
}))

const forgotPassword = state => state

const saveDeviceOneSignalInfo = (state, { deviceInfo }) => state.mergeDeep(Map({
  deviceInfo
}))

const setLocation = (state, { location }) => state.mergeDeep(Map({ location }))

const setProfile = (state, { userProfile }) => state.merge(Map({
  userProfile
}))

const setTypeFromComment = (state, { typeFromComment }) => state.merge(Map({
  typeFromComment
}))

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_PASSWORD]: forgotPassword,
  [Types.SET_ERROR_MESSAGE]: setErrorMessage,
  [Types.SAVE_DEVICE_ONE_SIGNAL_INFO]: saveDeviceOneSignalInfo,
  [Types.SET_LOCATION]: setLocation,
  [Types.SET_PROFILE]: setProfile,
  [Types.SET_TYPE_FROM_COMMENT]: setTypeFromComment
})
