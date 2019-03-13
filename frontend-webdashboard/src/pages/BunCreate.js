import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import BakedGoodCreateEditCard from '../components/BakedGoodCreateEditCard';

import API from '../helpers/api';

class BunCreate extends Component {
  state = {
    ingredientOptions: [],
  }

  createBun = (bun, pictureFile) => {
    API.post('bun', bun)
    .then(response => {
        this.uploadPicture(response.data.id, pictureFile);
        openSuccessSnackbar({ message: "This bun was successfully created." });
    })
    .catch(function (error) {
      console.log(error);

      openErrorSnackbar({message: error.response.data.message});
    });
  }

  uploadPicture = (id, pictureFile) => {
    var pictureFormData = new FormData();
    pictureFormData.append("picture", this.state.pictureFile);

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
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <BakedGoodCreateEditCard ingredientOptions={this.state.ingredientOptions} onSubmit={this.createBun}/>
      </div>
    );
  }
}

export default withRouter(BunCreate);
