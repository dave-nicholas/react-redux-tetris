const NAMESPACE = 'MESSAGE';
export const SET_MESSAGE = `${NAMESPACE}/SET_MESSAGE`;
export const CLEAR_MESSAGE = `${NAMESPACE}/CLEAR_MESSAGE`;

export const setMessage = (message, mood = 'neutral', open = true) => ({
  type: SET_MESSAGE,
  message,
  mood,
  open
});
export const clearMessage = message => ({ type: CLEAR_MESSAGE });
