//@ts-check
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { store } from './App';
import { push } from 'connected-react-router';

/** @type {BrowserRouter} */
let nav;

function navigate(routename){
    // nav.history.push(routename);
    store.dispatch(push(routename));
}

function setTopLevelNavigator(navigator){
    nav = navigator;
}

export default {
    navigate,
    setTopLevelNavigator
}