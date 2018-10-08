import { ADD_HABIT } from '../constants/habitConstants';

const initialState = {
  habits: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HABIT:
      return { ...state, habits: [...state.habits, action.payload ] };
    default:
      return state;
  }
}

export default rootReducer;