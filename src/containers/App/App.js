import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Search from '../Search/Search';
import WordDetail from '../WordDetail/WordDetail';
import "./App.scss";

class App extends Component{
  
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <Route exact path='/' component={Search} />
            <Route exact path='/lexicon/:language/:word' component={WordDetail} />
          </React.Fragment>
        </Switch>
      </BrowserRouter> 
    );
  }
}

export default hot(module)(App);