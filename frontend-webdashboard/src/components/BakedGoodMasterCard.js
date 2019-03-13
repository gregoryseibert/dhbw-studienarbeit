import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

class BakedGoodMasterCard extends Component {
  render() {
    const {classes} = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <List>
            {this.props.bakedGoods.map(bakedgood =>
              <Link to={this.props.pathName + "/view/" + bakedgood.id} key={bakedgood.id}>
                <ListItem button>
                    <Avatar src={this.props.apiBaseUrl + "picture/" + bakedgood.pictureFilename} />
                    <ListItemText primary={bakedgood.name} />
                    <Link to={this.props.pathName + "/edit/" + bakedgood.id} key={bakedgood.id}>
                      <IconButton className={classes.button} aria-label="Edit">
                          <EditIcon />
                      </IconButton>
                    </Link>
                </ListItem>
              </Link>
            )}
          </List>
        </CardContent>
        <Divider variant="middle" />
        <CardActions>
          <Button variant="outlined" className={classes.button}>
            <Link to={this.props.pathName + "/create"}>
              CREATE
            </Link>
          </Button>
        </CardActions>
      </Card>
    );
  }
}

BakedGoodMasterCard.propTypes = {
  bakedGoods: PropTypes.array.isRequired,
  pathName: PropTypes.string.isRequired,
  apiBaseUrl: PropTypes.string.isRequired,
}

export default withStyles(styles)(BakedGoodMasterCard);
