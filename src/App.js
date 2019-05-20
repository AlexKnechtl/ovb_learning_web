//@ts-check
// import { hot } from 'react-hot-loader/root';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './components/Login';
import Home from './components/Home';
import SubCategoryScene from './components/SubCategoryScene';
import QuestionScene from './components/QuestionScene';
import QuestionViewScene from './components/QuestionViewScene';
import TestScene from './components/TestScene';
import TestResultScene from './components/TestResultScene';
import {configureStore, signInWithoutPasswordAction, LOGIN_SUCCESS, LOGIN_FAILED, SIGNED_OUT, START_SIGN_IN, START_SIGN_IN_WITHOUT_CREDENTIAL, SET_CURRENT_MODULE, SELECT_CURRENT_SUBMODULE, CONTINUE_MODULE_LEARNING, LEARN_FALSE_QUESTIONS_FROM_MODULE, CONTINUE_SECTION_LEARNING, INIT_EXAM, FINISH_EXAM, GET_RESULT_STATS_FOR_MODULE} from './coreFork';
import {Provider} from 'react-redux';
import NavigationService from './NavigationService';
import { createBrowserHistory } from 'history';
import { connectRouter, ConnectedRouter, push, routerMiddleware } from 'connected-react-router';
import { navigationSagas } from './NavigationSagas';
import PrivateRoute from './PrivateRoute';
import TestStatistics from './components/TestStatistics';


export const history = createBrowserHistory();

export const store = configureStore({router: connectRouter(history)}, navigationSagas, [routerMiddleware(history)]);
store.dispatch(signInWithoutPasswordAction());


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} exact />
              <PrivateRoute path="/category/:catId" component={SubCategoryScene} canBeCalledDirectly/>
              <PrivateRoute path="/question" component={QuestionScene} />
              <PrivateRoute path="/questionView/:subCatId" component={QuestionViewScene} canBeCalledDirectly/>
              <PrivateRoute path="/test" component={TestScene} />
              <PrivateRoute path="/testResult" component={TestResultScene} />
              <PrivateRoute path="/testStatistics" component={TestStatistics}/>
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;//hot(App);
