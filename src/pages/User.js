'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { assign } from 'lodash';
import ErrorComponent from '../components/Error';
import Track from '../components/Track';
import Loading from '../components/Loading';
import api from '../helpers/api';

export default class User extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  state = {
    count: null,
    track: null,
    user: null,
    base64: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetch(this.props.match.params);
  }

  // eslint-disable-next-line classes/name, camelcase
  UNSAFE_componentWillReceiveProps(props) {
    this.fetch(props.match.params);
  }

  fetch(params) {
    const { user } = params;
    if (user) {
      this.setState({ loading: true });
      api(user, (err, data) => {
        this.setState(assign({ error: err, loading: false }, data));
      });
    }
  }

  render() {
    const { error, loading, count, track, base64, user } = this.state;

    if (error) {
      return <ErrorComponent message={error.message} />;
    }

    if (loading) {
      return <Loading />;
    }

    if (!count || !track) {
      return (
        <ErrorComponent message="That user has not listened to anything yet." />
      );
    }

    return <Track {...{ count, track, user, base64 }} />;
  }
}
