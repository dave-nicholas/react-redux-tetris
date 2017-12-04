import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'redux-little-router';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import './splash.css';

const styles = theme => ({
  marginTop: {
    marginTop: '20px'
  },
  title: {
    marginTop: '10em',
    color: '#fff'
  },
  whiteText: {
    color: '#fff'
  },
  tandcs: {
    color: '#fff',
    textDecoration: 'underline',
    cursor: 'pointer'
  }
});

const SplashScreen = ({ classes, push }) => {
  return (
    <Grid container className={classes.marginTop} justify="center">
      <Grid item xs={12}>
        <div className="splashscreen">
          <div className="t1">
            <div className="logoline1">
              <div className="i">
                <div className="p1" />
              </div>
              <div className="z">
                <div className="p1" />
                <div className="p2" />
              </div>
              <div className="l">
                <div className="p1" />
                <div className="p2" />
              </div>
              <div className="o">
                <div className="p1" />
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default compose(withStyles(styles), connect(null, { push }))(
  SplashScreen
);
