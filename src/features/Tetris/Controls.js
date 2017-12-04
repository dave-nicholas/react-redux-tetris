import React from 'react';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  chip: {
    marginBottom: theme.spacing.unit
  },
  root: {
    position: 'fixed',
    right: '10%',
    top: '200px'
  },
  text: {
    color: '#fff',
    marginBottom: '30px'
  }
});
const Controls = ({ classes }) => (
  <Hidden only={['xs', 'sm']}>
    <div className={classes.root}>
      <Typography key={1} type="body1" className={classes.text}>
        CONTROLS
      </Typography>
      <Chip
        className={classes.chip}
        avatar={
          <Avatar>
            <KeyboardArrowLeft />
          </Avatar>
        }
        label="Move Left"
      />
      <Chip
        className={classes.chip}
        avatar={
          <Avatar>
            <KeyboardArrowUp />
          </Avatar>
        }
        label="Rotate"
      />
      <Chip
        className={classes.chip}
        avatar={
          <Avatar>
            <KeyboardArrowRight />
          </Avatar>
        }
        label="Move Right"
      />
      <Chip
        className={classes.chip}
        avatar={
          <Avatar>
            <KeyboardArrowDown />
          </Avatar>
        }
        label="Move Down"
      />
    </div>
  </Hidden>
);

export default withStyles(styles)(Controls);
