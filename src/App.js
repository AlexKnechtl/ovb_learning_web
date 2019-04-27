import React, { Component } from 'react';
import { } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/Login';
import Home from './components/Home';
import SubCategoryScene from './components/SubCategoryScene';
import QuestionScene from './components/QuestionScene';
import QuestionViewScene from './components/QuestionViewScene';
import TestScene from './components/TestScene';
import TestResultScene from './components/TestResultScene';

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
            <Route path="/questionView" component={QuestionViewScene} />
            <Route path="/test" component={TestScene} />
            <Route path="testResult" component={TestResultScene} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
