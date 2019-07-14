import * as React from 'react';
import { Layout, Menu, Modal, Form, Input, message } from 'antd';
import { headerPath } from '../../config/path';
import { autobind } from 'core-decorators';
import { IAuth } from '../../interfaces/index';
import { Link } from 'react-router-dom';
import api from '../../api/auth';
const FormItem = Form.Item;
import './style.css';

const { Header } = Layout;

interface HeaderLayoutProps extends IAuth {
}

interface IPassword {
  password: string,
  new_password: string,
  confirm_password: string
}

interface HeaderLayoutState {
  visible: boolean,
  password_form: IPassword
}

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    md: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    md: { span: 18 },
    sm: { span: 18 },
  },
};

@autobind
class HeaderLayout extends React.Component<HeaderLayoutProps, HeaderLayoutState> {
  constructor (props: HeaderLayoutProps, state: HeaderLayoutState) {
    super(props, state);
    this.state = {
      visible: false,
      password_form: {
        password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  }
  handleMenuItemClick ({ item, key, keyPath }: any) {
    if (headerPath[+key].path === '/signIn') {
      this.props.auth.clearStorage();
    }
    this.props.history.push(headerPath[+key].path);
  }
  handleChangePassword (e) {
    e.stopPropagation();
    this.setState({
      visible: true
    })
    return false;
  }
  handleSubmit () {
    const password = this.state.password_form;
    if (!password.password) {
      return message.error('请输入当前密码');
    }
    if (!password.new_password) {
      return message.error('请输入新密码');
    }
    if (password.new_password !== password.confirm_password) {
      return message.error('当前密码二次确认出错, 请重新修改');
    }
    api.changePassword({
      account: 'admin',
      ...this.state.password_form
    }).then(() => {
      this.setState({
        visible: false
      })
      message.success('修改成功');
    }).catch(() => {
      message.error('修改失败');
    })
  }
  handleCancel () {
    this.setState({
      visible: false
    })
  }
  handleInput (field, event: any) {
    let password_form = {};
    password_form[field] = event.target.value;
    this.setState({
      password_form: {
        ...this.state.password_form,
        ...password_form
      }
    });
  }
  render () {
    return (
      <Header className="header">
        <div className="logo"><Link to="/" style={{color: '#fff', textDecoration: 'none'}}>林启恩纪念中学</Link></div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          onClick={this.handleMenuItemClick}
          style={{ lineHeight: '64px' }}
        >
        <Menu.Item>
          <span onClick={this.handleChangePassword}>修改密码</span>
        </Menu.Item>
        {
          headerPath.map((item, index) => {
            return (
              <Menu.Item key={index}>
                {item.title}
              </Menu.Item>
            );
          })
        }
        </Menu>
        <Modal
          width={800}
          visible={this.state.visible}
          title="修改管理员密码"
          okText="确定"
          cancelText="取消"
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}>
          <div className="form-layout">
            <div>
              <Form {...formItemLayout}>
                <FormItem label="当前密码">
                  <Input type="password" placeholder="请输入当前密码" value={this.state.password_form.password} 
                    onChange={this.handleInput.bind(this, 'password')}/>
                </FormItem>
                <FormItem label="新密码">
                  <Input type="password" placeholder="请输入新密码" value={this.state.password_form.new_password} 
                    onChange={this.handleInput.bind(this, 'new_password')}/>
                </FormItem>
                <FormItem label="二次输入密码">
                  <Input type="password" placeholder="请二次输入密码" value={this.state.password_form.confirm_password} 
                    onChange={this.handleInput.bind(this, 'confirm_password')}/>
                </FormItem>
              </Form>
            </div>
          </div>
        </Modal>
      </Header>
    );
  }
}

export default HeaderLayout;