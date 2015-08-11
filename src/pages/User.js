'use strict';

import React, {Component, PropTypes} from 'react';
import assign from 'lodash/object/assign';

import Error from '../components/Error';
import Track from '../components/track/Track';
import Loading from '../components/Loading';
import api from '../helpers/api';

export default class User extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  state = {
    count: null,
    track: null,
    user: null,
    base64: null,
    loading: true,
    error: null
  }

  componentDidMount () {
    this.fetch(this.props);
  }

  componentWillReceiveProps (props) {
    this.fetch(props);
  }

  fetch (props) {
    const {user} = props.params;
    if (user) {
      this.setState({loading: true});
      api(user, (err, data) => {
        this.setState(assign({error: err, loading: false}, data));
      });
    }
  }

  render () {
    const {error, loading, count, track, base64, user} = this.state;

    if (error) {
      return (
        <Error message={error.message} />
      );
    }

    if (loading) {
      return (
        <Loading />
      );
    }

    if (!count || !track) {
      return (
        <Error message='That user has not listened to anything yet.' />
      );
    }

    return (
      <Track {...{count, track, user, base64}} />
    );
  }
}
