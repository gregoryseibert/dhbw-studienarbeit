import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import BakedGoodCreateEditCard from '../components/BakedGoodCreateEditCard';

import API from '../helpers/api';

class BunEdit extends Component {
  state = {
    ingredientOptions: [],
    bun: {
      cerealMix: [],
      ingredients: [],
    },
  }

  updateBun = (bun, pictureFile) => {
    let id = this.props.match.params.id;

    API.put('bun/' + id, bun)
    .then(response => {
        this.uploadPicture(id, pictureFile);
        openSuccessSnackbar({ message: "This bun was successfully updated." });
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
      'bun/' + id + '/picture',
      pictureFormData,
      {headers: { 'Content-Type': 'multipart/form-data' }}
    )
    .then(response => {
      setTimeout(() => { this.props.history.push('/bun') }, 2500);
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

      API.get(`bun/` + this.props.match.params.id)
      .then(res => {
        this.setState({ bun: res.data});
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

        <BakedGoodCreateEditCard isEditCard bakedGood={this.state.bun} ingredientOptions={this.state.ingredientOptions} onSubmit={this.updateBun}/>
      </div>
    );
  }
}

export default withRouter(BunEdit);
