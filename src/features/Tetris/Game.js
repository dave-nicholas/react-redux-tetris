import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Buttons from './Buttons';
import Typography from 'material-ui/Typography';
import { push } from 'redux-little-router';
import { withStyles } from 'material-ui/styles';
import Board from './Board';
import NextShape from './NextShape';
import Config from './config';
import {
  startGame,
  createBoard,
  moveLeft,
  moveRight,
  moveDown,
  pauseGame,
  rotate
} from './actions';
import Controls from './Controls';
import { handleTouchMove } from '../../helpers';

const styles = theme => ({
  score: {
    color: '#ffffff'
  },
  info: {
    marginTop: theme.spacing.unit * 5
  }
});

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.keyDown = this.keyDown.bind(this);
  }

  componentWillMount() {
    const { createBoard, startGame } = this.props;
    createBoard(Config.height, Config.width);
    startGame();
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.body.classList.add('no-touch');
  }

  keydown = () => this.keyDown();

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
    document.removeEventListener('touchmove', handleTouchMove);
    document.body.classList.remove('no-touch');
    this.props.pauseGame();
  }

  componentWillReceiveProps({ gameover }) {
    const { push } = this.props;
    if (gameover) {
      document.removeEventListener('keydown', this.keyDown);
      push('/submit-score');
    }
  }

  keyDown = event => {
    const { code } = event;
    switch (code) {
      case 'ArrowUp':
        this.props.rotate();
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.props.moveDown();
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.props.moveLeft();
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.props.moveRight();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  render() {
    const { score, classes } = this.props;
    return (
      <div>
        <Typography type="headline" className={classes.score} align="center">
          Score: {score}
        </Typography>
        <NextShape />
        <Board />
        <Controls />
        <Buttons />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    ({ App: { Tetris: { score = 0, gameover } } }) => ({
      score,
      gameover
    }),
    {
      startGame,
      createBoard,
      moveLeft,
      moveRight,
      moveDown,
      rotate,
      push,
      pauseGame
    }
  )
)(Game);
