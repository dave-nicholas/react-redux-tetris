import { combineReducers } from 'redux';
import Tetris from '../features/Tetris/reducers';
import Message from '../features/SnackBar/reducers';

export default combineReducers({ Tetris, Message });
