import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 400,
  },
  button: {
    margin: theme.spacing.unit,
  },
  detail: {
    marginBottom: 12,
  }
});

class BakedGoodDetailCard extends Component {
  render() {
    const {classes} = this.props;

    return (
      <Card className={classes.card}>
        {this.props.bakedGood.pictureFilename &&
        <CardMedia
          className={classes.media}
          image={this.props.apiBaseUrl + "picture/" + this.props.bakedGood.pictureFilename}
          title="Contemplative Reptile"
        />
        }
        <CardContent>
          <Typography variant="h5" component="h3" className={classes.detail}>
            {this.props.bakedGood.name}
          </Typography>
          <Typography component="p" className={classes.detail}>
            <b>Cereal mix:</b>
            <br/>
            {this.props.bakedGood.cerealMix.map(c => c.percentage + '% ' + c.ingredient.name).join(', ')}
          </Typography>
          <Typography component="p" className={classes.detail}>
            <b>Ingredients:</b>
            <br/>
            {this.props.bakedGood.ingredients.map(i => i.name).join(', ')}
          </Typography>
          <Typography component="p" className={classes.detail}>
            <b>Weight:</b>
            <br/>
            {this.props.bakedGood.weight}g
          </Typography>
          {this.props.bakedGood.daysOfProduction &&
          <Typography component="p" className={classes.detail}>
            <b>Days of production:</b>
            <br/>
            {this.props.bakedGood.daysOfProduction.join(', ')}
          </Typography>
          }
          <Typography component="p" className={classes.detail}>
            <b>Nutrients:</b>
            <br/>
            {this.props.bakedGood.kcal}kcal <br/>
            {this.props.bakedGood.protein}g Protein <br/>
            {this.props.bakedGood.carbohydrates}g Carbohydrates <br/>
            {this.props.bakedGood.fat}g Fat <br/>
          </Typography>
          <Typography component="p">
            <b>Characteristic:</b>
            <br/>
            {this.props.bakedGood.characteristic}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardActions>
          <Button variant="outlined" className={classes.button}>
            <Link to={"/" + this.props.pathName + "/edit/" + this.props.bakedGood.id}>
              EDIT
            </Link>
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={this.props.handleDelete}
          >
            DELETE
          </Button>
        </CardActions>
      </Card>
    );
  }
}

BakedGoodDetailCard.propTypes = {
  bakedGood: PropTypes.object.isRequired,
  pathName: PropTypes.string.isRequired,
  apiBaseUrl: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default withStyles(styles)(BakedGoodDetailCard);
