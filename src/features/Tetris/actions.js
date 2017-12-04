import Shapes, { shapeKeys } from './Shapes/Shapes';
import Config from './config';

const NAMESPACE = 'TETRIS';
export const START = `${NAMESPACE}/START`;
export const PAUSE = `${NAMESPACE}/PAUSE`;
export const CREATE_BOARD = `${NAMESPACE}/CREATE_BOARD`;
export const SET_NEXT_SHAPE = `${NAMESPACE}/SET_NEXT_SHAPE`;
export const SET_CURRENT_SHAPE = `${NAMESPACE}/SET_CURRENT_SHAPE`;
export const UPDATE_CURRENT_SHAPE = `${NAMESPACE}/UPDATE_CURRENT_SHAPE`;
export const PARK_CURRENT_SHAPE = `${NAMESPACE}/PARK_CURRENT_SHAPE`;
export const CLEAR_LINES = `${NAMESPACE}/CLEAR_LINES`;
export const GAME_OVER = `${NAMESPACE}/GAME_OVER`;

let interval = null;
const emptyRow = [];

export const createBoard = (height, width) => async dispatch => {
  const board = [];
  if (!emptyRow.length) {
    for (let x = 0; x < width; x++) {
      emptyRow.push(false);
    }
  }
  for (let y = 0; y < height; y++) {
    board.push(emptyRow.slice());
  }
  await dispatch({ board, type: CREATE_BOARD });
  await dispatch(getNextShape());
};

const getRandomShape = () => {
  const rndShapeIndex = Math.floor(Math.random() * shapeKeys.length);
  return Shapes[shapeKeys[rndShapeIndex]];
};

const getNextShape = () => async (dispatch, getState) => {
  const { App: { Tetris: { nextShape } } } = getState();
  dispatch({ type: SET_NEXT_SHAPE, nextShape: getRandomShape() });
  await (!nextShape
    ? dispatch({ type: SET_CURRENT_SHAPE, currentShape: getRandomShape() })
    : dispatch({ type: SET_CURRENT_SHAPE, currentShape: nextShape }));

  dispatch(checkGameOver());
};

const removeCompleteRows = () => (dispatch, getState) => {
  const { App: { Tetris: { boardState } } } = getState();
  let linesCleared = 0;

  boardState.forEach((row, i) => {
    const full = row.every(cell => !!cell);
    if (full) {
      boardState.splice(i, 1);
      boardState.unshift(emptyRow.slice());
      linesCleared++;
    }
  });

  if (linesCleared) {
    dispatch({ type: CLEAR_LINES, linesCleared });
  }
};

const checkGameOver = () => (dispatch, getState) => {
  const {
    App: { Tetris: { currentShape: { position, shape, rotation }, boardState } }
  } = getState();

  if (!isSpotFree(shape, rotation, position, boardState)) {
    dispatch({ type: GAME_OVER });
    dispatch(pauseGame());
  }
};

export const startGame = () => (dispatch, getState) => {
  const { App: { Tetris: { gameRunning } } } = getState();
  if (!gameRunning) {
    interval = setInterval(() => {
      dispatch(gameTick());
    }, Config.tick);
    dispatch({
      type: START
    });
  }
};

export const pauseGame = () => (dispatch, getState) => {
  const { App: { Tetris: { gameRunning } } } = getState();
  if (gameRunning) {
    clearInterval(interval);
    dispatch({
      type: PAUSE
    });
  }
};

const gameTick = () => async (dispatch, getState) => {
  const {
    App: { Tetris: { currentShape: { position, shape, rotation }, boardState } }
  } = getState();
  const nextPostion = { x: position.x, y: position.y + 1 };

  if (isSpotFree(shape, rotation, nextPostion, boardState)) {
    dispatch({ type: UPDATE_CURRENT_SHAPE, rotation, position: nextPostion });
  } else {
    await dispatch({
      type: PARK_CURRENT_SHAPE,
      rotation,
      position
    });
    await dispatch(removeCompleteRows());
    await dispatch(getNextShape());
  }
};

const isSpotFree = (shape, rotation, position, boardState) => {
  const orientations = shape.orientations[rotation];

  for (let x = 0; x < shape.orientations[0].length; x++) {
    for (let y = 0; y < shape.orientations[0].length; y++) {
      const block = orientations[y][x];
      const boardX = x + position.x;
      const boardY = y + position.y;
      if (block) {
        if (boardX >= 0 && boardX < Config.width && boardY < Config.height) {
          if (boardState[boardY][boardX]) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

export const rotate = () => (dispatch, getState) => {
  const {
    App: { Tetris: { currentShape: { position, shape, rotation }, boardState } }
  } = getState();
  const nextRotation = (rotation + 1) % shape.orientations.length;

  if (isSpotFree(shape, nextRotation, position, boardState)) {
    dispatch({ type: UPDATE_CURRENT_SHAPE, rotation: nextRotation, position });
  }
};

export const moveLeft = () => (dispatch, getState) => {
  const {
    App: { Tetris: { currentShape: { position, shape, rotation }, boardState } }
  } = getState();
  const nextPostion = { x: position.x - 1, y: position.y };

  if (isSpotFree(shape, rotation, nextPostion, boardState)) {
    dispatch({ type: UPDATE_CURRENT_SHAPE, rotation, position: nextPostion });
  }
};

export const moveRight = () => (dispatch, getState) => {
  const {
    App: { Tetris: { currentShape: { position, shape, rotation }, boardState } }
  } = getState();
  const nextPostion = { x: position.x + 1, y: position.y };

  if (isSpotFree(shape, rotation, nextPostion, boardState)) {
    dispatch({ type: UPDATE_CURRENT_SHAPE, rotation, position: nextPostion });
  }
};

export const moveDown = () => (dispatch, getState) => {
  const {
    App: { Tetris: { currentShape: { position, shape, rotation }, boardState } }
  } = getState();
  const nextPostion = { x: position.x, y: position.y + 1 };

  if (isSpotFree(shape, rotation, nextPostion, boardState)) {
    dispatch({ type: UPDATE_CURRENT_SHAPE, rotation, position: nextPostion });
  }
};
