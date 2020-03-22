import React, { Component } from 'react'
import './App.css';

import SearchPage from './components/search/SearchPage'
import StockPage from './components/stock/StockPage'
import ShopPage from './components/shop/ShopPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
    render() {
      return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/shop">
              <ShopPage/>
            </Route>
            <Route path="/stock">
              <StockPage/>
            </Route>
            <Route path="/">
              <SearchPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
