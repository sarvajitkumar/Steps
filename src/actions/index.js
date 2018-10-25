import {
  fetchHabits,
  createHabit,
  _updateHabit,
  deleteHabit
} from '../utils/api/habitsApi';

import {
  _updateHabitReminders
} from '../utils/api/habitRemindersApi';

import {
  RECEIVE_HABITS,
  ADD_HABIT,
  UPDATE_HABIT,
  REMOVE_HABIT
} from '../constants/habitConstants';

const { ipcRenderer } = window.require('electron');

export function handleInitialData() {
  return (dispatch) => {
    fetchHabits()
      .then(habits => {
        dispatch(receiveHabits(habits));

        ipcRenderer.send('set-initial-height', habits.length);
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

        ipcRenderer.send('resize-height', true);
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

export function handleUpdateHabit(habit, forReminders=false) {
  return async (dispatch) => {
    try {
      const updatedHabit = forReminders ?
        await _updateHabitReminders(habit) :
        await _updateHabit(habit);
      
      dispatch(updateHabit(updatedHabit))
    } catch(e) {
      console.error(e);
    }
  }
}

function updateHabit(habit) {
  return {
    type: UPDATE_HABIT,
    habit
  }
}

export function handleRemoveHabit(_id) {
  return (dispatch) => {
    deleteHabit(_id)
      .then(() => {
        dispatch(removeHabit(_id));

        ipcRenderer.send('resize-height', false);
      })
      .catch(err => {
        console.error(err);
      })
  }
}

function removeHabit(_id) {
  return {
    type: REMOVE_HABIT,
    _id
  }
}