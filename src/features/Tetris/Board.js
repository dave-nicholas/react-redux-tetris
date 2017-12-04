import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import ShapeStyles, { getShapeSizes } from './Shapes/ShapeStyles';

const styles = theme => {
  return {
    ...ShapeStyles,
    gameBoard: {
      borderSpacing: '0',
      border: '1px solid white',
      backgroundColor: '#000',
      margin: '0 auto;'
    },
    sock: {
      width: '120px',
      position: 'absolute',
      top: '0px',
      left: '0px',
      zIndex: '-1'
    },
    banner: {
      width: '100px',
      position: 'absolute',
      zIndex: '-1',
      right: '8px',
      top: '10px'
    },
    xsSock: {
      width: '100px',
      position: 'absolute',
      top: '140px',
      left: '0px',
      zIndex: '-1'
    },
    xsBanner: {
      width: '86px',
      position: 'absolute',
      zIndex: '-1',
      right: '8px',
      top: '160px'
    }
  };
};

const Board = ({ boardState, classes, currentShape, width }) => {
  const board = JSON.parse(JSON.stringify(boardState));
  const { rotation, position, shape } = currentShape;
  if (shape) {
    const { orientations, className } = shape;
    for (let x = 0; x < orientations[rotation][0].length; x++) {
      for (let y = 0; y < orientations[rotation][0].length; y++) {
        const block = orientations[rotation][y][x];
        if (block) {
          const boardX = position.x + x;
          const boardY = position.y + y;
          board[boardY][boardX] = { className };
        }
      }
    }
  }

  const rows = board.map((row, i) => {
    const blocksInRow = row.map((block, j) => {
      return (
        <td
          key={j}
          className={
            block
              ? classes[`${getShapeSizes(width)}${block.className}`]
              : classes[`${getShapeSizes(width)}empty`]
          }
        />
      );
    });
    return <tr key={i}>{blocksInRow}</tr>;
  });
  return (
    <table className={classes.gameBoard}>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default compose(
  withStyles(styles),
  withWidth(),
  connect(({ App: { Tetris: { boardState, currentShape } } }) => ({
    boardState,
    currentShape
  }))
)(Board);
