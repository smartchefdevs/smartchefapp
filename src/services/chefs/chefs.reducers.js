import { createReducer, createActions } from 'reduxsauce'
import { Map } from 'immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getChefs: ['usr_id'],
  setChefs: ['chefList'],
})

export const ChefsTypes = Types
export default Creators

/* ------------- Initial State ------------ - */
export const INITIAL_STATE = Map({
  chefList: [
    {
      key: '0',
      full_name: "CHEF NITSCHE",
      decription: "German cuisine, new American fusion",
      reviewsNumber: "52 reviews $$",
      openStatus: "open now",
      chefImage: '../img/germanchef.jpg',
      distance: "0.7 miles",
      events: [
        {
          dishes: [
            { key: '0', src: '../img/German1.jpg', quantity: '3 left' },
            { key: '1', src: '../img/German2.jpg', quantity: '9 left' },
            { key: '2', src: '../img/German3.jpg', quantity: '6 left' },
          ]
        }
      ],
      rate: 4,
    }
  ]
})

/* ------------- Reducers ------------- */

const setChefsList = (state, { chefList }) => state.merge(Map({
  chefList
}))


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CHEFS]: setChefsList,
})
