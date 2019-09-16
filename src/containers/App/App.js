import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';

import Search from '../Search/Search';
import WordDetail from '../WordDetail/WordDetail';
import "./App.scss";

class App extends Component{
  
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <div className="App">
            <Route exact path='/' component={Search} />
            <Route path='/word' component={WordDetail} />
          </div>
        </Switch>
      </BrowserRouter> 
    );
  }
}

export default hot(module)(App);