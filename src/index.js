import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// components
import UserList from './components/UserList';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={UserList}/>
      <Route path="*" render={() => <h1>Not found</h1>} />
    </Switch>
  </Router>
  , document.getElementById('root')
);
registerServiceWorker();
