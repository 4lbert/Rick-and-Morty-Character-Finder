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
    this.setState({ characters });
  }

  render() {
    return (
      <div>
        <p>Search for a character</p>
        <input type="text" />
        {this.state.characters.map(character =>
          <div key={character.name}>{character.name}</div>
        )}
      </div>
    );
  }
}

export default Search;
