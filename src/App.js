import React, { Component } from 'react'
import './App.css';

import SearchPage from './components/search/SearchPage';
import StockPage from './components/stock/StockPage';
import EditStock from './components/stock/EditStock';
import ShopPage from './components/shop/ShopPage';
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
            {/* TODO Change to slug */}
            <Route exact path="/stock/:shopId"> 
              <StockPage />
            </Route>
            <Route exact path="/stock/:shopId/edit">
              <EditStock />
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
