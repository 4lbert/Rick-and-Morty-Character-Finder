import React from 'react';
import { getCharacters } from './../../services/characters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      characters: [],
    };
  }

  handleInputChange(event) {
    this.updateCharacters(event.target.value);
  }

  render() {
    return (
      <div>
        <p>Search for a character</p>
        <input type="text" onChange={this.handleInputChange.bind(this)} />
        {this.state.characters.map(character =>
          <div key={character.id}>{character.name}</div>
        )}
      </div>
    );
  }

  async updateCharacters(name) {
    try {
      const characters = await getCharacters(name);
      this.setState({ characters });
    } catch (e) {
      console.log(e);
    }
  }
}

export default Search;
