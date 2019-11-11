import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getEvents: [''],
  setEvents: ['events'],
})

export const EventsTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
  events: []
})

/* ------------- Reducers ------------- */

const setChefsList = (state, { events }) => state.merge(Map({
  events
}))


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_EVENTS]: setChefsList,
})
