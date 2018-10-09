import {
  RECEIVE_HABITS,
  // ADD_HABIT,
  // UPDATE_HABIT
} from '../constants/habitConstants';

const initialState = {
  habits: []
}

//fetch
//add
//update
//remove
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_HABITS:
      return {
        habits: action.habits
      }
    // case ADD_HABIT:
    //   return { ...state, habits: [...state.habits, action.payload ] };
    // case UPDATE_HABIT:
    //   return {
    //     ...state,
        //everything stays the same except the updated habit
      // }
    default:
      return state;
  }
}

export default rootReducer;