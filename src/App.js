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
import { Layout } from 'antd';

import { Row, Col } from 'antd';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>

            <Row justify="center">
              <Col xs={22} sm={12} >   <Router>
                <Switch>

                  <Route path="/shop">
                    <ShopPage />
                  </Route>
                  {/* TODO Change to slug */}
                  <Route path="/stock/:shopId">
                    <StockPage />
                  </Route>
                  <Route path="/">
                    <SearchPage />
                  </Route>
                </Switch>
              </Router>
              </Col>
            </Row>
        </Layout>
      </div>
    );
  }
}
