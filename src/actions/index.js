import {
  fetchHabits,
  createHabit,
  _updateHabit
} from '../utils/api';

import {
  RECEIVE_HABITS,
  ADD_HABIT,
  UPDATE_HABIT
} from '../constants/habitConstants';

export function handleInitialData() {
  return (dispatch) => {
    return fetchHabits()
      .then(habits => {
        return dispatch(receiveHabits(habits));
      })
      .catch(err => {
        console.error(err);
      });
  }
}

function receiveHabits(habits) {
  return {
    type: RECEIVE_HABITS,
    habits
  }
}

export function handleAddHabit(habit) {
  return (dispatch) => {
    createHabit(habit)
      .then(habit => {
        dispatch(addHabit(habit))
      })
      .catch(err => {
        console.error(err);
      })
  }
}

function addHabit(habit) {
  return {
    type: ADD_HABIT,
    habit
  }
}

export function handleUpdateHabit(habit) {
  return (dispatch) => {
    _updateHabit(habit)
      .then(habit => {
        dispatch(updateHabit(habit));
      })
      .catch(err => {
        console.error(err);
      });
  }
}

function updateHabit(habit) {
  return {
    type: UPDATE_HABIT,
    habit
  }
}