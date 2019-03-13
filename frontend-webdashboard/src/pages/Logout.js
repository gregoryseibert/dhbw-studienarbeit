import React, { Component } from 'react';

import Notifier, { openSuccessSnackbar } from '../components/Notifier';

class Logout extends Component {
  componentDidMount() {
    sessionStorage.clear();
    openSuccessSnackbar({ message: 'Successfully logged out.' });
    setTimeout(() => { window.location.href = '/' }, 2500);
  }

  render() {
    return (
      <Notifier />
    );
  }
}

export default Logout;
