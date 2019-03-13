import React, { Component } from 'react';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import BakedGoodDetailCard from '../components/BakedGoodDetailCard';

import API, {baseURL} from '../helpers/api';

class BunDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bun: {
        cerealMix: [],
        ingredients: [],
      },
    };
  }

  componentDidMount() {
    API.get(`bun/` + this.props.match.params.id)
    .then(res => {
      this.setState({ bun: res.data});
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  handleDelete = (event) => {
    event.preventDefault();

    API.delete(`bun/` + this.props.match.params.id)
    .then(res => {
      openSuccessSnackbar({ message: "This bun was successfully deleted."});

      setTimeout(() => { this.props.history.push('/bun') }, 2500);
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <BakedGoodDetailCard bakedGood={this.state.bun} pathName={"bun"} apiBaseUrl={baseURL} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default BunDetail;
