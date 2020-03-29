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
    try {
      const characters = await getCharacters('morty');
      this.setState({ characters });
    } catch (e) {
      console.log(e);
    }
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
