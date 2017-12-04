import { SET_MESSAGE, CLEAR_MESSAGE } from './actions';

const initialState = {
  message: '',
  mood: null,
  open: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.message,
        open: action.open,
        mood: action.mood
      };
    case CLEAR_MESSAGE:
      return { ...initialState };
    default:
      return { ...initialState };
  }
};
