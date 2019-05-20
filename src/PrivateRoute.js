//@ts-check
import React, {Component} from 'react';

import {
    Route,
    Redirect
  } from "react-router-dom";
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, canBeCalledDirectly, auth, ...rest } ) => (
      <Route
        {...rest}
        render={compProps =>
          (auth||{}).user ? (
            <Component {...compProps} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: compProps.location, canBeCalledDirectly: canBeCalledDirectly }
              }}
            />
          )
        }
      />
    );
export default connect(state=>({auth: state.auth}), null)(PrivateRoute);