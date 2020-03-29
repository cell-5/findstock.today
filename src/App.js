import React, { Component } from 'react'
import './App.css';
import SearchPage from './components/search/SearchPage';
import StockPage from './components/stock/StockPage';
import EditStock from './components/stock/EditStock';
import ShopPage from './components/shop/ShopPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  const { loading } = useAuth0();
  if (loading) {
    return <Loading />;
  }
    return (
          <BrowserRouter>
        <Layout>
          <Header>
            <NavBar></NavBar>
          </Header>
          <Content>
          <Row justify="center">
            <Col xs={22} sm={12} >
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
          <Footer>
          </Footer>
        </Layout>
        </BrowserRouter>
    );
  }