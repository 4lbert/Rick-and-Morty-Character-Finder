import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './../Search/Search';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Find all your favorite Rick & Morty characters (as well as Morty)</p>
        <div className="SearchContainer">
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
