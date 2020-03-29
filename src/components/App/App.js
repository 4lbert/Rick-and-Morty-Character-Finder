import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './../Search/Search';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <Search />
      </div>
    );
  }
}

export default App;
