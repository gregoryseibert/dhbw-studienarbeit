import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import NewsCreateEditCard from '../components/NewsCreateEditCard';

import API from '../helpers/api';

class NewsCreate extends Component {
  createNewsItem = (newsItem) => {
    API.post('news', newsItem)
    .then(response => {
        openSuccessSnackbar({ message: "This news item was successfully created." });

        setTimeout(() => { this.props.history.push('/news') }, 2500);
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

        <NewsCreateEditCard onSubmit={this.createNewsItem}/>
      </div>
    );
  }
}

export default withRouter(NewsCreate);
