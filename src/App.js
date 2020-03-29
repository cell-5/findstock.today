import React, { Component } from 'react'
import './App.css';

import SearchPage from './components/search/SearchPage';
import StockPage from './components/stock/StockPage';
import EditStock from './components/stock/EditStock';
import ShopPage from './components/shop/ShopPage';
import Navbar from './components/navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Layout,Row, Col  } from 'antd';
const { Content, Footer } = Layout;
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Navbar/>
          <Content>
          <Row justify="center">
            <Col xs={22} sm={22} md={16} lg={12} >
              <Router>
                <Switch>
                  <Route path="/shop">
                    <ShopPage />
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
            </Col>
          </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>findstock.today ©2020 Created by Cell5 & friends</Footer>
        </Layout>
      </div>
    );
  }
}
