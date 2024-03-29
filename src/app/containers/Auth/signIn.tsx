import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IAuth } from '../../interfaces/index';
import { Form, Icon, Input, Button } from 'antd';
// import { Link } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { ISignIn } from '../../interfaces';
const FormItem = Form.Item;
import './style.css';

interface SignInState extends ISignIn {
}

@inject('auth', 'router')
@autobind
@observer
class SignIn extends React.Component<IAuth, SignInState> {
  componentWillMount () {
    if (localStorage.getItem('token')) {
      this.props.history.push('/');
      return;
    }
  }
  async handleSubmit (event: any) {
    event.preventDefault();
    const res = await this.props.auth.signIn({
      account: this.state.account,
      password: this.state.password
    })
    if (res.code === 200) {
      this.props.history.push('/');
    }
  }
  handleInputAccount (event: any) {
    this.setState({
      account: event.target.value
    });
  }
  handleInputPass (event: any) {
    this.setState({
      password: event.target.value
    });
  }
  render () {
    return (
      <div className="auth">
        <div className="auth-logo"/>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <Input prefix={<Icon type="user"/>} type="text" placeholder="用户名" onChange={this.handleInputAccount} />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="lock"/>} type="password" placeholder="密码" onChange={this.handleInputPass}/>
          </FormItem>
          <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
              {/* 或 <Link to={'/signUp'}>开始注册!</Link> */}
          </FormItem>
        </Form>  
      </div>
    );
  }
}

export default SignIn;