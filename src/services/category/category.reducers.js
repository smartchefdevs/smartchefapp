import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getCategories: [''],
  setCategories: ['categories'],
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
  categories: [],
})

/* ------------- Reducers ------------- */

const setCategories = (state, { categories }) => state.merge(Map({
  categories
}))


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CATEGORIES]: setCategories,
})
