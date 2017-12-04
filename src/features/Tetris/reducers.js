import {
  START,
  PAUSE,
  CREATE_BOARD,
  SET_NEXT_SHAPE,
  SET_CURRENT_SHAPE,
  UPDATE_CURRENT_SHAPE,
  PARK_CURRENT_SHAPE,
  CLEAR_LINES,
  GAME_OVER
} from './actions';
import Config from './config';

const initialState = {
  boardState: [],
  nextShape: null,
  gameRunning: false,
  currentShape: {
    shape: null,
    rotation: null,
    position: null
  },
  gameover: false,
  score: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        gameover: false,
        gameRunning: true
      };
    case PAUSE:
      return {
        ...state,
        gameRunning: false
      };
    case CREATE_BOARD:
      return {
        ...state,
        boardState: action.board,
        score: 0
      };
    case SET_NEXT_SHAPE:
      return {
        ...state,
        nextShape: action.nextShape
      };
    case SET_CURRENT_SHAPE:
      return {
        ...state,
        currentShape: {
          shape: action.currentShape,
          rotation: 0,
          position: { x: 4, y: 0 }
        }
      };
    case UPDATE_CURRENT_SHAPE:
      return {
        ...state,
        currentShape: {
          ...state.currentShape,
          rotation: action.rotation,
          position: action.position
        }
      };
    case PARK_CURRENT_SHAPE:
      const {
        boardState,
        currentShape: { rotation, shape: { orientations, className } },
        score: scorePark
      } = state;

      for (let x = 0; x < orientations[rotation][0].length; x++) {
        for (let y = 0; y < orientations[rotation][0].length; y++) {
          const block = orientations[rotation][y][x];
          if (block) {
            const boardX = action.position.x + x;
            const boardY = action.position.y + y;
            boardState[boardY][boardX] = { className };
          }
        }
      }
      return {
        ...state,
        boardState,
        score: scorePark + Config.score.park
      };
    case CLEAR_LINES:
      const { score: scoreLine } = state;

      return {
        ...state,
        score: scoreLine + Config.score.line
      };
    case GAME_OVER:
      return { ...state, gameover: true };
    default:
      return state;
  }
};
