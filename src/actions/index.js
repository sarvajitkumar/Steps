import { fetchHabits } from '../utils/api';
import {
  RECEIVE_HABITS,
  // ADD_HABIT,
  // UPDATE_HABIT
} from '../constants/habitConstants';

export function handleInitialData() {
  return (dispatch) => {
    return fetchHabits()
      .then(habits => {
        return dispatch(receiveHabits(habits));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

function receiveHabits(habits) {
  return {
    type: RECEIVE_HABITS,
    habits
  }
}

// export const addHabit = habit => ({
//   type: ADD_HABIT,
//   habit
// })

// export const updateHabit = habit => ({
//   type: UPDATE_HABIT,
//   habit
// })