import React, { Component } from 'react';
import Logo from './Logo'
import {Layout, Drawer, Button, Menu, Divider} from 'antd';
const { Header } = Layout;
class Navbar extends Component {
  state = {
    current: 'search',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
onClose = () => {
    this.setState({
      visible: false,
    });
  };
render() {
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
                <Menu.Item key="signin">
                  <a href="/signin">Sign In</a>
                </Menu.Item>
                <Menu.Item key="signup">
                  <a href="/signup">Sign Up</a>
                </Menu.Item>
              </Menu>
              <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                  <span className="barsBtn"></span>
              </Button>
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
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
  }
}
export default Navbar;