import React, { Component } from 'react';
import {
  createPaginationContainer,
  QueryRenderer,
  graphql
} from 'react-relay';
import environment from './createRelayEnvironment';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  
  render() {
    console.log(environment);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
       
      </div>
    );
  }
}

export default App;
