import React, { Component } from 'react';

import Select from 'react-select';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'visible',
  },
  media: {
    height: 400,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  formdescription: {
    marginBottom: 5,
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
  }
});

const allergyTypeOptions = [
  {
    value: "EGG", label: "Egg",
  }, {
    value: "NUT", label: "Nut",
  }, {
    value: "MILK", label: "Milk",
  }, {
    value: "GLUTEN", label: "Gluten",
  },
];

class IngredientCreateEditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAllergyTypes: [],
      name: '',
      submitted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.ingredient || !nextProps.ingredient.id) {
      return;
    }

    let selectedAllergyTypes = [];

    if(nextProps.ingredient.allergyTypes) {
      for(let i = 0; i < nextProps.ingredient.allergyTypes.length; i++) {
        selectedAllergyTypes.push(
          allergyTypeOptions.find(allergyType =>
            allergyType.value === nextProps.ingredient.allergyTypes[i]
          )
        );
      }
    }

    this.setState({
      name: nextProps.ingredient.name,
      selectedAllergyTypes,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ submitted: true });

    let allergyTypes = [];

    for(let k = 0; k < this.state.selectedAllergyTypes.length; k++) {
      allergyTypes.push(this.state.selectedAllergyTypes[k].value);
    }

    let ingredient = {
      name: this.state.name,
      allergyTypes,
    }

    this.props.onSubmit(ingredient);
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleAllergyTypeChange = (selectedOption) => {
    this.setState({ selectedAllergyTypes: selectedOption });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <TextField id="name" name="name" label="Name" value={this.state.name} onChange={this.handleNameChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Typography component="p" className={classes.formdescription}>
                Allergy types
              </Typography>
              <Select
                isMulti
                required
                value={this.state.selectedAllergyTypes}
                onChange={this.handleAllergyTypeChange}
                options={allergyTypeOptions}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.state.submitted}
            >
              {this.props.isEditCard ? 'Update' : 'Create'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

IngredientCreateEditCard.propTypes = {
  ingredient: PropTypes.object,
  isEditCard: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

IngredientCreateEditCard.defaultProp = {
  isEditCard: false,
}

export default withStyles(styles)(IngredientCreateEditCard);
