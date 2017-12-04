import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import Hidden from 'material-ui/Hidden';
import withWidth from 'material-ui/utils/withWidth';
// import Pause from 'material-ui-icons/Pause';
// import PlayArrow from 'material-ui-icons/PlayArrow';
import RotateRight from 'material-ui-icons/RotateRight';
import {
  pauseGame,
  startGame,
  moveLeft,
  moveRight,
  moveDown,
  rotate
} from './actions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  root: {
    marginTop: theme.spacing.unit * 3
  }
});

let interval = null;

function FloatingActionButtons({
  classes,
  gameRunning,
  pauseGame,
  startGame,
  moveLeft,
  moveRight,
  moveDown,
  rotate
}) {
  return (
    <Hidden only={['xl', 'lg', 'md']}>
      <div className={classes.root}>
        <Button
          fab
          color="primary"
          aria-label="left"
          onClick={e => {
            e.preventDefault();
            moveLeft();
          }}
          className={classes.button}
        >
          <KeyboardArrowLeft />
        </Button>
        <Button
          fab
          color="accent"
          aria-label="rotate"
          onClick={e => {
            e.preventDefault();
            rotate();
          }}
          className={classes.button}
        >
          <RotateRight />
        </Button>
        <Button
          fab
          color="primary"
          aria-label="right"
          onClick={e => {
            e.preventDefault();
            moveRight();
          }}
          className={classes.button}
        >
          <KeyboardArrowRight />
        </Button>
        <Button
          fab
          color="primary"
          aria-label="down"
          onTouchStart={e => {
            e.preventDefault();
            moveDown();
            interval = setInterval(() => moveDown(), 200);
          }}
          onMouseDown={e => {
            e.preventDefault();
            moveDown();
            interval = setInterval(() => moveDown(), 200);
          }}
          onMouseUp={e => {
            e.preventDefault();
            clearInterval(interval);
          }}
          onMouseLeave={e => {
            e.preventDefault();
            clearInterval(interval);
          }}
          onTouchEnd={e => {
            e.preventDefault();
            clearInterval(interval);
          }}
          className={classes.button}
        >
          <KeyboardArrowDown />
        </Button>
        {/* {gameRunning && (
        <Button
          fab
          color="primary"
          aria-label="pause"
          className={classes.button}
          onClick={e => {e.preventDefault(); pauseGame();}}
        >
          <Pause />
        </Button>
      )}
      {!gameRunning && (
        <Button
          fab
          color="primary"
          aria-label="play"
          className={classes.button}
          onClick={e => {e.preventDefault(); startGame();}}
        >
          <PlayArrow />
        </Button>
      )} */}
      </div>
    </Hidden>
  );
}

export default compose(
  withStyles(styles),
  withWidth(),
  connect(({ App: { Tetris: { gameRunning } } }) => ({ gameRunning }), {
    pauseGame,
    startGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate
  })
)(FloatingActionButtons);
