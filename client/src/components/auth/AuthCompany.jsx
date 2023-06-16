import React from 'react';
import CompanySignup from './signup/CompanySignup';
import CompanyLogin from './login/CompanyLogin';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export default class AuthCompany extends React.Component {
  constructor(props) {
    super(props);
// state where you ar enow, toggle between signup/login. 
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Signup
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <CompanyLogin updateToken={this.props.updateToken}/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <CompanySignup updateToken={this.props.updateToken}/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

// Screw the class, change to small toggle function w/ onclick, cause conor hates me 