import React, { Component } from 'react';
import { } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/Login';
import Home from './components/Home';
import SubCategoryScene from './components/SubCategoryScene';
import QuestionScene from './components/QuestionScene';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/home" component={Home} />
            <Route path="/kategorien" component={SubCategoryScene} />
            <Route path="/question" component={QuestionScene} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
