'use strict';

import React, {Component, PropTypes} from 'react';
import assign from 'lodash/object/assign';

import TrackCount from '../components/TrackCount';
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
    loading: false,
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
        <div>{error.message}</div>
      );
    }

    if (loading) {
      return (
        <Loading />
      );
    }

    if (!count || !track) {
      return (
        <div>That user isn't listening to anything on repeat</div>
      );
    }

    return (
      <TrackCount count={count} track={track} user={user} base64={base64} />
    );
  }
}
