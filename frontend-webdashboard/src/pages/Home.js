import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="display1">Welcome to the bakery admin dashboard!</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Home);
