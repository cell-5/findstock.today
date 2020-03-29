import React, { Component } from 'react';
import Logo from './Logo'
import { Drawer, Button, Menu, Divider} from 'antd';
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
        <nav className="menuBar">
          <Logo />
          <div className="menuCon">
            <div className="leftMenu">
              <Menu mode="horizontal">
                <Menu.Item key="search">
                  <a href="/">Search</a>
                </Menu.Item>
                <Menu.Item key="about">
                  <a href="/about">About</a>
                </Menu.Item>
              </Menu>
            </div>
            <div className="rightMenu">
              <Menu mode="horizontal">
                <Menu.Item key="signin">
                  <a href="/signin">Sign In</a>
                </Menu.Item>
                <Menu.Item key="signup">
                  <a href="/signup">Sign Up</a>
                </Menu.Item>
              </Menu>
            </div>
            <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
              <span className="barsBtn"></span>
            </Button>
            <Drawer
              title="findstock.now"
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
</div>
        </nav>
    );
  }
}
export default Navbar;