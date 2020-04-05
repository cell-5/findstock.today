import React, { Component } from 'react'
import './App.css';
import SearchPage from './components/search/SearchPage';
import StockPage from './components/stock/StockPage';
import EditStock from './components/stock/EditStock';
import ShopPage from './components/shop/ShopPage';
import PrivateRoute from "./components/auth0/PrivateRoute";
import Loading from "./components/utils/Loading";
import Navbar from './components/navbar/Navbar';
import Profile from "./components/auth0/Profile";
import { useAuth0 } from "./components/auth0/react-auth0-spa";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Layout, Row, Col } from 'antd';

import initFontAwesome from "./components/utils/initFontAwesome";
initFontAwesome();

const { Content, Footer } = Layout;
const App = () => {
  const authZero = useAuth0();
  if (authZero && authZero.loading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Layout>
        <Navbar></Navbar>
        <Content style={{ marginTop: 40 }}>
          <Row justify="center">
            <Col xs={22} sm={22} md={16} lg={12} >
              <Switch>
                <Route path="/shop">
                  <ShopPage />
                </Route>
                {/* TODO Change to slug */}
                <Route exact path="/stock/:shopId">
                  <StockPage />
                </Route>
                <PrivateRoute exact path="/stock/:shopId/edit" component={EditStock} />
                <Route path="/">
                  <SearchPage />
                </Route>
                <PrivateRoute path="/profile" component={Profile} />
              </Switch>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>findstock.today ©2020 Created by Cell5 & friends</Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;