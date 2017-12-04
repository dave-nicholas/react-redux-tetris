import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { clearMessage } from './actions';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  },
  positive: {
    backgroundColor: '#438187'
  },
  negative: {
    backgroundColor: '#ff0000'
  },
  neutral: {}
});

class Message extends React.Component {
  handleRequestClose = (event, reason) => {
    this.props.clearMessage();
  };

  render() {
    const { message, open, classes, mood } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={5000}
        onRequestClose={() => this.handleRequestClose()}
        SnackbarContentProps={{
          'aria-describedby': 'info',
          className: classes[mood]
        }}
        message={<span>{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={() => this.handleRequestClose()}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    ({
      App: { Message: { message = '', open = false, mood = 'neutral' } }
    }) => ({
      message,
      open,
      mood
    }),
    {
      clearMessage
    }
  )
)(Message);
