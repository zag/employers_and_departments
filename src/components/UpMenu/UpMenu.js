import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link, withRouter } from 'react-router';

@connect(
  state => ({user: state.user}),
  {})
@withRouter
export default class UpMenu extends Component {
    render() {
        const {user} = this.props;
        const style = require('./UpMenu.scss');
        console.log({'ssssss':this.props.location});
        return (
        <div className={style.menuContainer} >
        { [
            { text: "Departments", linkto: 'departments'},
            {text : "Employees", linkto: 'employers'},
        ].map( item => {return (
            <div key={item.text} className={ style.menuElement }>
                <span className={ style.element}>
                    <Link to={`/${item.linkto}`} activeClassName={ '/'+item.linkto == this.props.location.pathname ? style.active : ''}>{item.text}</Link>
                </span>
            </div>
            )})  }
          
        </div>
        )
    }
}