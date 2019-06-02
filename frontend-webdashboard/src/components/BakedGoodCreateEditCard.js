import React, { Component } from 'react';

import { openErrorSnackbar } from '../components/Notifier';

import Select from 'react-select';
import { Slider } from 'material-ui-slider';
import { DropzoneArea } from 'material-ui-dropzone'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

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

const daysOfProduction = [
  { value: 'MONDAY', label: 'Monday'},
  { value: 'TUESDAY', label: 'Tuesday'},
  { value: 'WEDNESDAY', label: 'Wednesday'},
  { value: 'THURSDAY', label: 'Thursday'},
  { value: 'FRIDAY', label: 'Friday'},
  { value: 'SATURDAY', label: 'Saturday'},
  { value: 'SUNDAY', label: 'Sunday'},
];

class BakedGoodCreateEditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictureFile: null,
      selectedDaysOfProduction: [],
      selectedIngredients: [],
      selectedCerealMixIngredient: null,
      selectedCerealMixPercentage: 1,
      selectedCerealMix: [],
      name: '',
      characteristic: '',
      weight: '',
      kcal: '',
      fat: '',
      carbohydrates: '',
      protein: '',
      submitted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.bakedGood || !nextProps.bakedGood.id) {
      return;
    }

    let selectedDaysOfProduction = [];

    if(nextProps.bakedGood.daysOfProduction) {
      for(let i = 0; i < nextProps.bakedGood.daysOfProduction.length; i++) {
        selectedDaysOfProduction.push(
          daysOfProduction.find(dayOfProduction =>
            dayOfProduction.value === nextProps.bakedGood.daysOfProduction[i]
          )
        );
      }
    }

    let selectedIngredients = [];

    for(let j = 0; j < nextProps.bakedGood.ingredients.length; j++) {
      selectedIngredients.push(
        nextProps.ingredientOptions.find(ingredient =>
          ingredient.value === nextProps.bakedGood.ingredients[j].id
        )
      );
    }

    let selectedCerealMix = [];

    for(let k = 0; k < nextProps.bakedGood.cerealMix.length; k++) {
      var cerealMix = nextProps.bakedGood.cerealMix[k];

      selectedCerealMix.push({
        value: cerealMix.ingredient.name + " (" + cerealMix.percentage + "%)",
        label: cerealMix.ingredient.name + " (" + cerealMix.percentage + "%)",
        object: cerealMix,
      });
    }

    this.setState({
      selectedDaysOfProduction,
      selectedIngredients,
      selectedCerealMix,
      name: nextProps.bakedGood.name,
      characteristic: nextProps.bakedGood.characteristic,
      weight: nextProps.bakedGood.weight,
      kcal: nextProps.bakedGood.kcal,
      fat: nextProps.bakedGood.fat,
      carbohydrates: nextProps.bakedGood.carbohydrates,
      protein: nextProps.bakedGood.protein,
    });
  }

  isValidCerealMix() {
    var sumCerealMixPercentages = 0;

    for(let i = 0; i < this.state.selectedCerealMix.length; i++) {
      sumCerealMixPercentages += this.state.selectedCerealMix[i].object.percentage;
    }

    if(sumCerealMixPercentages === 100) {
      return true;
    }

    return false;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(!this.isValidCerealMix()) {
      openErrorSnackbar({ message: "The total cereal mix percentages doesnt match 100%."});

      return;
    }

    if(!this.state.pictureFile) {
      openErrorSnackbar({ message: "You must select a picture for this bun."});

      return;
    }

    this.setState({ submitted: true });

    let cerealMix = [];

    for(let i = 0; i < this.state.selectedCerealMix.length; i++) {
      cerealMix.push(this.state.selectedCerealMix[i].object);
    }

    let ingredients = [];

    for(let j = 0; j < this.state.selectedIngredients.length; j++) {
      ingredients.push({id: this.state.selectedIngredients[j].value});
    }

    let daysOfProduction = [];

    for(let k = 0; k < this.state.selectedDaysOfProduction.length; k++) {
      daysOfProduction.push(this.state.selectedDaysOfProduction[k].value);
    }

    let bakedGood = {
      name: this.state.name,
      characteristic: this.state.characteristic,
      weight: this.state.weight,
      kcal: this.state.kcal,
      fat: this.state.fat,
      carbohydrates: this.state.carbohydrates,
      protein: this.state.protein,
      cerealMix,
      ingredients,
      daysOfProduction,
    }

    this.props.onSubmit(bakedGood, this.state.pictureFile);
  }

  handlePictureChange = (files) => {
    this.setState({
      pictureFile: files[0]
    });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleCharacteristicChange = (event) => {
    this.setState({ characteristic: event.target.value });
  }

  handleWeightChange = (event) => {
    this.setState({ weight: Number(event.target.value) });
  }

  handleKcalChange = (event) => {
    this.setState({ kcal: Number(event.target.value) });
  }

  handleFatChange = (event) => {
    this.setState({ fat: Number(event.target.value) });
  }

  handleCarbohydratesChange = (event) => {
    this.setState({ carbohydrates: Number(event.target.value) });
  }

  handleProteinChange = (event) => {
    this.setState({ protein: Number(event.target.value) });
  }

  handleCerealMixPercentageChange  = (value) => {
    this.setState({ selectedCerealMixPercentage: Number(value) });
  }

  handleCerealMixIngredientChange = (selectedOption) => {
    this.setState({ selectedCerealMixIngredient: selectedOption });
  }

  handleAddCerealMix = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      selectedCerealMix: [
        ...prevState.selectedCerealMix,
        {
          value: this.state.selectedCerealMixIngredient.label + " (" + this.state.selectedCerealMixPercentage + "%)",
          label: this.state.selectedCerealMixIngredient.label + " (" + this.state.selectedCerealMixPercentage + "%)",
          object: {
            ingredient: {id: this.state.selectedCerealMixIngredient.value},
            percentage: this.state.selectedCerealMixPercentage
          }
        }
      ]
    }));
  }

  handleCerealMixChange = (selectedOption) => {
    this.setState({ selectedCerealMix: selectedOption });
  }

  handleIngredientsChange = (selectedOption) => {
    this.setState({ selectedIngredients: selectedOption });
  }

  handleDaysOfProductionChange = (selectedOption) => {
    this.setState({ selectedDaysOfProduction: selectedOption });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form
          className={classes.form}
          onSubmit={this.handleSubmit}
          >
            <FormControl margin="normal" required fullWidth>
              <TextField id="name" name="name" label="Name" value={this.state.name} onChange={this.handleNameChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField id="characteristic" name="characteristic" label="Characteristic" value={this.state.characteristic} onChange={this.handleCharacteristicChange} required/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="weight"
                name="weight"
                label="Weight"
                type="number"
                value={this.state.weight}
                onChange={this.handleWeightChange}
                InputProps={{
                  step: 0.1,
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="kcal"
                name="kcal"
                label="Kcal"
                type="number"
                value={this.state.kcal}
                onChange={this.handleKcalChange}
                InputProps={{
                  step: 0.1,
                  endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                }}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="fat"
                name="fat"
                label="Fat"
                type="number"
                value={this.state.fat}
                onChange={this.handleFatChange}
                InputProps={{
                  step: 0.1,
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="carbohydrates"
                name="carbohydrates"
                label="Carbohydrates"
                type="number"
                value={this.state.carbohydrates}
                onChange={this.handleCarbohydratesChange}
                InputProps={{
                  step: 0.1,
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField
                required
                id="protein"
                name="protein"
                label="Protein"
                type="number"
                value={this.state.protein}
                onChange={this.handleProteinChange}
                InputProps={{
                  step: 0.1,
                  endAdornment: <InputAdornment position="end">g</InputAdornment>,
                }}/>
            </FormControl>

            {this.props.withDaysOfProduction &&
            <FormControl margin="normal" required fullWidth>
              <Typography component="p" className={classes.formdescription}>
                Days of production
              </Typography>
              <Select
                isMulti
                required
                value={this.state.selectedDaysOfProduction}
                onChange={this.handleDaysOfProductionChange}
                options={daysOfProduction}
              />
            </FormControl>
            }

            <FormControl margin="normal" required fullWidth>
              <Typography component="p" className={classes.formdescription}>
                Ingredients
              </Typography>
              <Select
                isMulti
                required
                value={this.state.selectedIngredients}
                onChange={this.handleIngredientsChange}
                options={this.props.ingredientOptions}
              />
            </FormControl>

            <Divider className={classes.divider}/>

            <FormControl margin="normal" required fullWidth>
              <Typography component="p" className={classes.formdescription}>
                Select cereal mix ingredient
              </Typography>
              <Select
                required
                onChange={this.handleCerealMixIngredientChange}
                options={this.props.ingredientOptions}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <Typography component="p">
                Select cereal mix percentage ({this.state.selectedCerealMixPercentage}%)
              </Typography>
              <Slider
                min={1}
                value={this.state.selectedCerealMixPercentage}
                onChange={this.handleCerealMixPercentageChange}
              />
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleAddCerealMix}
            >
              Add cereal mix
            </Button>

            <FormControl margin="normal" required fullWidth>
              <Select
                required
                isMulti
                placeholder="Cereal mix"
                value={this.state.selectedCerealMix}
                onChange={this.handleCerealMixChange}
                options={this.state.selectedCerealMix}
              />
            </FormControl>

            <Divider className={classes.divider}/>

            <FormControl margin="normal" required fullWidth>
              <Typography component="p" className={classes.formdescription}>
                Picture
              </Typography>
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={['image/*']}
                showAlerts={false}
                onChange={this.handlePictureChange}
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

BakedGoodCreateEditCard.propTypes = {
  bakedGood: PropTypes.object,
  ingredientOptions: PropTypes.array.isRequired,
  withDaysOfProduction: PropTypes.bool,
  isEditCard: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

BakedGoodCreateEditCard.defaultProp = {
  withDaysOfProduction: false,
  isEditCard: false,
}

export default withStyles(styles)(BakedGoodCreateEditCard);
