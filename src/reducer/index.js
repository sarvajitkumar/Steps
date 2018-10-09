import {
  RECEIVE_HABITS,
  ADD_HABIT,
  UPDATE_HABIT
} from '../constants/habitConstants';

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
    case UPDATE_HABIT:
      const index = state.habits.findIndex(habit => habit._id === action.habit._id);

      return {
        habits: [
          ...state.habits.slice(0, index),
          action.habit,
          ...state.habits.slice(index + 1)
        ]
      }
    default:
      return state;
  }
}

export default rootReducer;