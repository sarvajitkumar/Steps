import { ADD_HABIT } from '../constants/habitConstants';

const addHabit = habit => ({ type: ADD_HABIT, payload: habit});

export default addHabit;