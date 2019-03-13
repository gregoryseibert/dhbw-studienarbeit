import React, { Component } from 'react';

import Snackbar from '@material-ui/core/Snackbar';

let openSuccessSnackbarFn
let openErrorSnackbarFn

class Notifier extends Component {
  state = {
    open: false,
    message: '',
    variant: '',
  };

  componentDidMount() {
    openSuccessSnackbarFn = this.openSuccessSnackbar;
    openErrorSnackbarFn = this.openErrorSnackbar;
  }

  openSuccessSnackbar = ({ message }) => {
    this.setState({
      open: true,
      variant: 'success',
      message,
    });
  };

  openErrorSnackbar = ({ message }) => {
    this.setState({
      open: true,
      variant: 'error',
      message,
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: '',
      variant: '',
    });
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        message={this.state.message}
        autoHideDuration={3000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
      />
    );
  }
}

export function openSuccessSnackbar({ message }) {
  openSuccessSnackbarFn({ message });
}

export function openErrorSnackbar({ message }) {
  openErrorSnackbarFn({ message });
}

export default Notifier;
