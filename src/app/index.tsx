import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { 
  StudentStore,
  TokenStore, 
  AuthStore, 
} from './stores';
import registerServiceWorker from './registerServiceWorker';
import { Root } from './containers/Root';
import './index.css';
import Container from './containers/Container';
import SignIn from './containers/Auth/signIn';

useStrict(true);

const browserHistory = createBrowserHistory({
  basename: 'admin'
});
const routerStore =  new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);
const rootStore = {
  student: new StudentStore(),
  token: new TokenStore(),
  auth: new AuthStore(),
  router: routerStore
};

ReactDOM.render(
  <Provider {...rootStore}>
    <Root>
      <Router history={history}>
        <Switch>
          <Route
            path="/signIn"
            component={SignIn}
          />
          <Route
            path="/"
            component={Container}
          />
        </Switch>
      </Router>
    </Root>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
