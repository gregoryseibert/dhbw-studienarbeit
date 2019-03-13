import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import BakedGoodCreateEditCard from '../components/BakedGoodCreateEditCard';

import API from '../helpers/api';

class LoafEdit extends Component {
  state = {
    ingredientOptions: [],
    loaf: {
      cerealMix: [],
      ingredients: [],
      daysOfProduction: [],
    },
  }

  updateLoaf = (loaf, pictureFile) => {
    let id = this.props.match.params.id;

    API.put('loaf/' + id, loaf)
    .then(response => {
        this.uploadPicture(id, pictureFile);
        openSuccessSnackbar({ message: "This loaf was successfully updated." });
    })
    .catch(function (error) {
      console.log(error);

      openErrorSnackbar({message: error.response.data.message});
    });
  }

  uploadPicture = (id, pictureFile) => {
    var pictureFormData = new FormData();
    pictureFormData.append("picture", pictureFile);

    API.put(
      'loaf/' + id + '/picture',
      pictureFormData,
      {headers: { 'Content-Type': 'multipart/form-data' }}
    )
    .then(response => {
      setTimeout(() => { this.props.history.push('/loaf') }, 2500);
    })
    .catch(function (error) {
      console.log(error);

      openErrorSnackbar({message: error.response.data.message});
    });
  }

  componentDidMount() {
    API.get(`ingredient`)
    .then(res => {
      var ingredients = [];

      for (var i = 0; i < res.data.length; i++) {
        ingredients.push({"value": res.data[i].id, "label": res.data[i].name});
      }

      this.setState({ ingredientOptions: ingredients });

      API.get(`loaf/` + this.props.match.params.id)
      .then(res => {
        this.setState({ loaf: res.data});
      }).catch(function (error) {
        openErrorSnackbar({ message: error.response.data.message});
      });
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <BakedGoodCreateEditCard isEditCard withDaysOfProduction bakedGood={this.state.loaf} ingredientOptions={this.state.ingredientOptions} onSubmit={this.updateLoaf}/>
      </div>
    );
  }
}

export default withRouter(LoafEdit);
