import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import Notifier, { openErrorSnackbar } from '../components/Notifier';
import API from '../helpers/api';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

class IngredientMaster extends Component {
  state = {
    ingredients: []
  };

  componentDidMount() {
    API.get(`ingredient`)
    .then(res => {
      this.setState({ ingredients: res.data});
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Notifier />
        <Card className={classes.card}>
          <CardContent>
            <List>
              {this.state.ingredients.map(ingredient =>
                <ListItem button key={ingredient.id}>
                    <ListItemText primary={ingredient.name} />
                    <Link to={"/ingredient/edit/"+ingredient.id} key={ingredient.id}>
                      <IconButton className={classes.button} aria-label="Edit">
                          <EditIcon />
                      </IconButton>
                    </Link>
                </ListItem>
              )}
            </List>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Button variant="outlined" className={classes.button}>
              <Link to="/ingredient/create">
                CREATE
              </Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

IngredientMaster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientMaster);
