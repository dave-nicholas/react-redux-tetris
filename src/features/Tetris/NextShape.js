import React from 'react';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import withWidth from 'material-ui/utils/withWidth';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import { connect } from 'react-redux';
import ShapeStyles, { getShapeSizes } from './Shapes/ShapeStyles';

const styles = theme => {
  return {
    ...ShapeStyles,
    nextShape: {
      borderSpacing: '0',
      border: 'none',
      height: '120px'
    },
    xsNextShape: {
      borderSpacing: '0',
      border: 'none',
      height: '64px'
    },
    text: {
      marginBottom: '30px'
    },
    root: {
      position: 'fixed',
      left: '10%',
      top: '200px'
    },
    xsRoot: {
      position: 'fixed',
      left: '6%',
      top: '300px'
    }
  };
};

const NextShape = ({ classes, nextShape, width }) => {
  if (!nextShape) return null;

  const blocks = nextShape.orientations[0];

  const rows = blocks.map((row, i) => {
    const blocksInRow = row.map((block, j) => {
      return (
        <td
          key={j}
          className={
            block
              ? classes[`${getShapeSizes(width)}${nextShape.className}`]
              : null
          }
        />
      );
    });

    return <tr key={i}>{blocksInRow}</tr>;
  });
  return (
    <div className={width === 'xs' ? classes.xsRoot : classes.root}>
      <Hidden only={'xs'}>
        <Typography key={1} type="body1" className={classes.text}>
          NEXT SHAPE
        </Typography>
      </Hidden>
      <table
        key={2}
        className={width === 'xs' ? classes.xsNextShape : classes.nextShape}
      >
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default compose(
  withStyles(styles),
  withWidth(),
  connect(({ App: { Tetris: { nextShape } } }) => ({
    nextShape
  }))
)(NextShape);
