import React, { Component } from 'react'
import './App.css';
import SearchPage from './components/search/SearchPage';
import StockPage from './components/stock/StockPage';
import EditStock from './components/stock/EditStock';
import ShopPage from './components/shop/ShopPage';
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import Navbar from './components/navbar/Navbar';
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Layout,Row, Col  } from 'antd';
const { Content, Footer } = Layout;
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();
const App = () => {
  const { loading } = useAuth0();
  if (loading) {
    return <Loading />;
  }
  render() {
    return (
        <BrowserRouter>
        <Layout>
          <Navbar/>
          <Content>
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
                </Switch>
            </Col>
          </Row>
          </Content>
          <Footer style={{ textAlign: 'center' }}>findstock.today ©2020 Created by Cell5 & friends</Footer>
        </Layout>
        </BrowserRouter>
    );
  };
}