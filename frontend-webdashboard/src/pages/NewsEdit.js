import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Notifier, { openSuccessSnackbar, openErrorSnackbar } from '../components/Notifier';
import NewsCreateEditCard from '../components/NewsCreateEditCard';

import API from '../helpers/api';

class NewsEdit extends Component {
  state = {
    newsItem: null,
  }

  updateNewsItem = (newsItem) => {
    API.put('news/' + this.props.match.params.id, newsItem)
    .then(response => {
        openSuccessSnackbar({ message: "This news item was successfully updated." });

        setTimeout(() => { this.props.history.push('/news') }, 2500);
    })
    .catch(function (error) {
      console.log(error);

      openErrorSnackbar({message: error.response.data.message});
    });
  }

  componentDidMount() {
    API.get(`news`)
    .then(res => {
      let newsItem = res.data.find(newsItem => newsItem.id === Number(this.props.match.params.id));

      this.setState({ newsItem });
    }).catch(function (error) {
      openErrorSnackbar({ message: error.response.data.message});
    });
  }

  render() {
    return (
      <div>
        <Notifier />

        <NewsCreateEditCard isEditCard newsItem={this.state.newsItem} onSubmit={this.updateNewsItem}/>
      </div>
    );
  }
}

export default withRouter(NewsEdit);
