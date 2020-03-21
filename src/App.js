import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProductTable from './components/ProductTable'
import ShopForm from './components/ShopForm'
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/shop">
              <ShopForm />
            </Route>
            <Route path="/">
              <ProductTable />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
