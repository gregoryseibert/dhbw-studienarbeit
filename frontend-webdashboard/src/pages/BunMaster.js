import React, { Component } from 'react'

import Notifier, { openErrorSnackbar } from '../components/Notifier';
import API, {baseURL} from '../helpers/api';
import BakedGoodMasterCard from '../components/BakedGoodMasterCard';

class BunMaster extends Component {
  state = {
    buns: []
  };

  componentDidMount() {
    API.get(`bun`)
    .then(res => {
      this.setState({ buns: res.data});
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <BakedGoodMasterCard bakedGoods={this.state.buns} pathName={"bun"} apiBaseUrl={baseURL} />
      </div>
    );
  }
}

export default BunMaster;
