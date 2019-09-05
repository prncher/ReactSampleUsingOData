import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './Containers/product';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Products" >
          <Products />
        </div>
      </div>
    );
  }
}