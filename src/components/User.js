'use strict';

import React, {Component, PropTypes} from 'react';

import TrackCount from './TrackCount';
import api from '../helpers/api';

export default class User extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  state = {
    count: null,
    track: null,
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
        this.setState({
          error: err,
          user: data ? data.user : null,
          track: data ? data.track : null,
          count: data ? data.count : null,
          loading: false
        });
      });
    }
  }

  render () {
    const {error, loading, count, track, user} = this.state;

    if (error) {
      return (
        <div>{error.message}</div>
      );
    }

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }

    if (count === null || track === null) {
      return (
        <div>That user isn't listening to anything on repeat</div>
      );
    }

    return (
      <TrackCount count={count} track={track} user={user} />
    );
  }
}
