import React, { Component } from 'react'

import Notifier, { openErrorSnackbar } from '../components/Notifier';
import API, {baseURL} from '../helpers/api';
import BakedGoodMasterCard from '../components/BakedGoodMasterCard';

class LoafMaster extends Component {
  state = {
    loafs: []
  };

  componentDidMount() {
    API.get(`loaf`)
    .then(res => {
      this.setState({ loafs: res.data});
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <BakedGoodMasterCard bakedGoods={this.state.loafs} pathName={"loaf"} apiBaseUrl={baseURL} />
      </div>
    );
  }
}

export default LoafMaster;
