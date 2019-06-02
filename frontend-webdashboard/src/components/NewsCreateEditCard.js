import React, { Component } from 'react';

import { openErrorSnackbar } from '../components/Notifier';

import { DropzoneArea } from 'material-ui-dropzone'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 500,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'visible',
  },
  media: {
    height: 400,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    display: 'block',
    height: '100%',
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  formdescription: {
    marginBottom: 5,
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
  }
});

class NewsCreateEditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictureFile: null,
      title: '',
      content: '',
      submitted: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.newsItem || !nextProps.newsItem.id) {
      return;
    }

    this.setState({
      title: nextProps.newsItem.title,
      content: nextProps.newsItem.content,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if(!this.state.pictureFile) {
      openErrorSnackbar({ message: "You must select a picture for this news item."});

      return;
    }

    this.setState({ submitted: true });

    let newsItem = {
      title: this.state.title,
      content: this.state.content,
    }

    this.props.onSubmit(newsItem, this.state.pictureFile);
  }

  handlePictureChange = (files) => {
    this.setState({
      pictureFile: files[0]
    });
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleContentChange = (event) => {
    this.setState({ content: event.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <form
          className={classes.form}
          onSubmit={this.handleSubmit}
          >
            <FormControl margin="normal" required fullWidth>
              <TextField id="title" name="title" label="Title" value={this.state.title} onChange={this.handleTitleChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <TextField id="content" name="content" label="Content" value={this.state.content} onChange={this.handleContentChange} required/>
            </FormControl>

            <Divider className={classes.divider}/>

            <FormControl margin="normal" required fullWidth>
              <Typography component="p" className={classes.formdescription}>
                Picture
              </Typography>
              <DropzoneArea
                filesLimit={1}
                acceptedFiles={['image/*']}
                showAlerts={false}
                onChange={this.handlePictureChange}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.state.submitted}
            >
              {this.props.isEditCard ? 'Update' : 'Create'}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

NewsCreateEditCard.propTypes = {
  newsItem: PropTypes.object,
  isEditCard: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

NewsCreateEditCard.defaultProp = {
  isEditCard: false,
}

export default withStyles(styles)(NewsCreateEditCard);
