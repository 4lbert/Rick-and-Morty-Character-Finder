import React from 'react';
import { getCharacters } from './../../services/characters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      characters: [],
    };
  }

  async componentDidMount() {
    const characters = await getCharacters();
    this.setState({ characters: JSON.stringify(characters, null, 2) });
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
