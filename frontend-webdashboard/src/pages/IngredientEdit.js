import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import IngredientCreateEditCard from '../components/IngredientCreateEditCard';

import API from '../helpers/api';

class IngredientEdit extends Component {
  state = {
    ingredient: null,
  }

  updateIngredient = (ingredient) => {
    API.put('ingredient/' + this.props.match.params.id, ingredient)
    .then(response => {
        openSuccessSnackbar({ message: "This ingredient was successfully updated." });

        setTimeout(() => { this.props.history.push('/ingredient') }, 2500);
    })
    .catch(function (error) {
      console.log(error);

      openErrorSnackbar({message: error.response.data.message});
    });
  }

  componentDidMount() {
    API.get(`ingredient`)
    .then(res => {
      let ingredient = res.data.find(ingredient => ingredient.id === Number(this.props.match.params.id));

      this.setState({ ingredient });
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <IngredientCreateEditCard isEditCard ingredient={this.state.ingredient} onSubmit={this.updateIngredient}/>
      </div>
    );
  }
}

export default withRouter(IngredientEdit);
