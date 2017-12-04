import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Fragment, push } from 'redux-little-router';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import { teal, purple } from 'material-ui/colors';
import SplashScreen from './features/SplashScreen/SplashScreen';
import SubmitScore from './features/SubmitScore/SubmitScore';
import Game from './features/Tetris/Game';
import Message from './features/SnackBar/Message';

const styles = theme => ({
  root: {
    width: '100%'
  },
  logo: {
    width: '50px',
    cursor: 'pointer'
  },
  title: {
    color: '#fff',
    marginLeft: '150px'
  },
  appBar: {
    background: `linear-gradient(45deg, ${teal[300]} 30%, ${teal[500]} 90%)`
  },
  navButton: {
    marginLeft: theme.spacing.unit * 2,
    color: '#fff',
    background: `linear-gradient(45deg, ${purple[300]} 30%, ${purple[500]} 90%)`
  }
});

const App = ({ push, classes }) => {
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item>
          <Toolbar>
            <Button
              raised
              className={classes.navButton}
              onClick={() => push('/')}
            >
              Home
            </Button>
            <Button
              raised
              className={classes.navButton}
              onClick={() => push('/game')}
            >
              Play
            </Button>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={0}>
            <Fragment forRoute="/">
              <div>
                <Fragment forRoute="/">
                  <SplashScreen />
                </Fragment>
                <Fragment forRoute="/game">
                  <Game />
                </Fragment>
                <Fragment forRoute="/submit-score">
                  <SubmitScore />
                </Fragment>
              </div>
            </Fragment>
          </Grid>
        </Grid>
      </Grid>
      <Message />
    </div>
  );
};

export default compose(
  withStyles(styles),
  connect(null, {
    push
  })
)(App);
