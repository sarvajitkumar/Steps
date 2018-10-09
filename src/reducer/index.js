import {
  RECEIVE_HABITS,
  ADD_HABIT,
  // UPDATE_HABIT
} from '../constants/habitConstants';

//update
//remove
const rootReducer = (state = { habits: [] }, action) => {
  switch (action.type) {
    case RECEIVE_HABITS:
      return {
        habits: action.habits
      }
    case ADD_HABIT:
      return {
        habits: [...state.habits, action.habit]
      }
    default:
      return state;
  }
}
    // case UPDATE_HABIT:
    //   return {
    //     ...state,
        //everything stays the same except the updated habit
      // }

export default rootReducer;