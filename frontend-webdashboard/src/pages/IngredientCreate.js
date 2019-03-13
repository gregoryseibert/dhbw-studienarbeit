import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import IngredientCreateEditCard from '../components/IngredientCreateEditCard';

import API from '../helpers/api';

class IngredientCreate extends Component {
  createIngredient = (ingredient) => {
    API.post('ingredient', ingredient)
    .then(response => {
        openSuccessSnackbar({ message: "This ingredient was successfully created." });

        setTimeout(() => { this.props.history.push('/ingredient') }, 2500);
    })
    .catch(function (error) {
      console.log(error);

      openErrorSnackbar({message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <IngredientCreateEditCard onSubmit={this.createIngredient}/>
      </div>
    );
  }
}

export default withRouter(IngredientCreate);
