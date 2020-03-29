import React from 'react';
import { getCharacters } from './../../services/characters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    getCharacters().then(chars => this.setState({ characters: JSON.stringify(chars, null, 2) }));
  }

  render() {
    return (
      <div>
        <p>Search for a character</p>
        <input type="text" />
        <p>{this.state.characters}</p>
      </div>
    );
  }
}

export default Search;
