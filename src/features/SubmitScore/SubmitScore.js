import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import purple from 'material-ui/colors/purple';
import { setMessage } from '../SnackBar/actions';
import { push } from 'redux-little-router';

const styles = theme => ({
  form: {
    padding: `20px 10px`
  },
  formControl: {
    margin: theme.spacing.unit
  },
  inkbar: {
    '&:after': {
      backgroundColor: purple[500]
    }
  },
  button: {
    marginTop: theme.spacing.unit * 10,
    margingLeft: theme.spacing.unit * 2,
    background: `linear-gradient(45deg, ${purple[300]} 30%, ${purple[500]} 90%)`
  },
  buttonProgress: {
    color: purple[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

class SubmitScore extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  validateForm = () => {
    const { name, email } = this.state;
    const emailValid = /\S+@\S+\.\S+/.test(email);
    const nameValid = !!name.length;

    if (emailValid && nameValid) return true;

    const errorMessage = `${emailValid ? '' : 'A valid email is required'} ${
      nameValid ? '' : 'Name is required'
    }`;

    this.props.setMessage(errorMessage, 'negative');
  };

  submitScore = () => {
    this.setState({ disabled: true });
    const { setMessage, push } = this.props;

    if (this.validateForm()) {
      setTimeout(
        () =>
          setMessage(
            'Your score has been added to the leaderboard',
            'positive'
          ),
        200
      );
      push('/');
    }
    this.setState({ disabled: false });
  };

  render() {
    const { classes, score } = this.props;
    const { name, email, disabled } = this.state;

    return (
      <form className={classes.form}>
        <Typography type="title">Game Over!</Typography>
        <Typography type="subheading">You scored: {score}</Typography>
        <Typography type="subheading">Great work!</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name" className={classes.inputLabel}>
            Name
          </InputLabel>
          <Input
            id="name"
            classes={{
              inkbar: classes.inkbar,
              input: classes.white,
              underline: classes.inputUnderline
            }}
            value={name}
            onChange={this.handleChange('name')}
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email" className={classes.inputLabel}>
            Email
          </InputLabel>
          <Input
            id="email"
            classes={{
              inkbar: classes.inkbar,
              underline: classes.inputUnderline
            }}
            value={email}
            onChange={this.handleChange('email')}
          />
        </FormControl>
        <br />
        <Button
          className={classes.button}
          raised
          onClick={() => this.submitScore()}
          disabled={disabled}
        >
          {!disabled && 'Submit Score'}
          {disabled && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      </form>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    ({ App: { Tetris: { score = 0 } } }) => ({
      score
    }),
    {
      setMessage,
      push
    }
  )
)(SubmitScore);
