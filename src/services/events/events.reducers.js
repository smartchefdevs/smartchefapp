import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getEvents: [''],
  setEvents: ['events'],
  getEventDetail: ['id'],
  setEventDetail: ['eventDetail'],
});

export const EventsTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
  events: [],
  eventDetail: {}
})

/* ------------- Reducers ------------- */

const setChefsList = (state, { events }) => state.merge(Map({
  events
}));

const setEventDetail = (state, { eventDetail }) => state.merge(Map({
  eventDetail
}));


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_EVENTS]: setChefsList,
  [Types.SET_EVENT_DETAIL]: setEventDetail,
})
