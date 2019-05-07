//@ts-check
import React, {Component} from 'react';

import {
    Route,
    Redirect
  } from "react-router-dom";
import { connect } from 'react-redux';

class PrivateRoute extends Component{
  render(){
    var { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          (this.props.auth||{}).user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
export default connect(state=>({auth: state.auth}), null)(PrivateRoute);