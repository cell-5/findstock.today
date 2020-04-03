import React, { useState, Component } from 'react';
import { useAuth0 } from "../auth0/react-auth0-spa";
import Logo from './Logo'
import {Layout, Drawer, Button, Menu, Divider} from 'antd';
const { Header } = Layout;
const Navbar = ()=> {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [current, setCurrent] = useState('search');
  const [visible, setVisible] = useState(false);
    return (
        <Header>
              <Logo />
              <Menu mode="horizontal" theme="light">
                <Menu.Item key="search">
                  <a href="/">Search</a>
                </Menu.Item>
                <Menu.Item key="about">
                  <a href="/about">About</a>
                </Menu.Item>
                <div class="spring"></div>
                {!isAuthenticated && (
                  <Menu.Item key="signin">
                    <a onClick={() => loginWithRedirect({})}>Sign In</a>
                  </Menu.Item>
                )}
                {isAuthenticated && (
                  <Menu.Item key="logout">
                    <a onClick={() => logout()}>Log out</a>
                  </Menu.Item>
                )}
              </Menu>
              <Button className="barsMenu" type="primary" onClick={() => setVisible(true)}>
                  <span className="barsBtn"></span>
              </Button>
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={()=> setVisible(false)}
              visible={visible}
            >
              <Menu>
                <Menu.Item key="signin">
                  <a href="/signin">Sign In</a>
                </Menu.Item>
                <Menu.Item key="signup">
                  <a href="/signup">Sign Up</a>
                </Menu.Item>
                <Divider/>
                <Menu.Item key="search">
                  <a href="/">Search</a>
                </Menu.Item>
                <Menu.Item key="about">
                  <a href="/about">About</a>
                </Menu.Item>
                </Menu>
            </Drawer>
      </Header>
    );
  };
export default Navbar;