import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import UpMenu from '../UpMenu/UpMenu';
import classNames from 'classnames';
import { Route, Link, withRouter } from 'react-router';

@connect(
  state => ({user: state.user}),
  {})
export default class App extends Component {
  // static propTypes = {
  //   children: PropTypes.object.isRequired,
  //   user: PropTypes.object,
  //   logout: PropTypes.func.isRequired,
  //   pushState: PropTypes.func.isRequired
  // };

  // static contextTypes = {
  //   store: PropTypes.object.isRequired
  // };

  __componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };
  

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <UpMenu/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>

        <div className={ classNames( styles.well, "well text-center")}>
          Have questions? Start <Link to="/departments">HERE</Link>
        </div>
      </div>
    );
  }
}
