import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route } from 'react-router';
import { Layout } from 'antd';
import { autobind } from 'core-decorators';
import Sider from '../../layout/Sider';
import { IAuth } from '../../interfaces';

// components
import ContentHeader from '../../components/ContentHeader';
import Footer from '../../components/Footer';

// modules
import Home from '../../containers/Modules/Home';
import Student from '../../containers/Modules/Student';

const { Content } = Layout;

interface AppProps extends IAuth {
}

interface AppState {
  title: string;
}

@inject('router', 'auth')
@observer
@autobind
class App extends React.Component<AppProps, AppState> {
  constructor (props: AppProps, state: AppState) {
    super(props, state);
    this.state = {
      title: '欢迎使用林启恩纪念中学管理系统'
    };
  }
  async componentWillMount () {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/signIn');
      return;
    }
  }
  handleMenuItemClick (title: string) {
    this.setState({
      title
    });
  }
  render () {
    return (
      <Layout style={{ height: '100%' }}>
        <Layout style={{paddingBottom: 10}}>
          <Sider onMenuItemClick={this.handleMenuItemClick}/>
          <Layout>
            <Content>
              <ContentHeader title={this.state.title}/>
              <Content style={{ margin: 16, padding: 16,  minHeight: 750, background: '#fff' }}>
                <Route exact={true} path="/" component={Home}/>
                <Route exact={true} path="/student" component={Student}/>
              </Content>
              <Footer/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;