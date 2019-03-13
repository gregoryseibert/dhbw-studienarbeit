import React, { Component } from 'react';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import BakedGoodDetailCard from '../components/BakedGoodDetailCard';

import API, {baseURL} from '../helpers/api';

class LoafDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaf: {
        cerealMix: [],
        ingredients: [],
        daysOfProduction: [],
      },
    };
  }

  componentDidMount() {
    API.get(`loaf/` + this.props.match.params.id)
    .then(res => {
      this.setState({ loaf: res.data});
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  handleDelete = (event) => {
    event.preventDefault();

    API.delete(`loaf/` + this.props.match.params.id)
    .then(res => {
      openSuccessSnackbar({ message: "This loaf was successfully deleted."});

      setTimeout(() => { this.props.history.push('/loaf') }, 2500);
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <BakedGoodDetailCard bakedGood={this.state.loaf} pathName={"loaf"} apiBaseUrl={baseURL} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default LoafDetail;
