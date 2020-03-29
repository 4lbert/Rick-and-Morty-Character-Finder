import React from 'react';
import { getCharacters } from './../../services/characters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      characters: [],
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  handleInputChange(event) {
    this.updateCharacters(event.target.value);
  }

  render() {
    return (
      <div>
        <p>Search for a character</p>
        <input type="text" ref={this.textInput} onChange={this.handleInputChange.bind(this)} />
        {this.state.characters.map(character =>
          <div key={character.id}>{character.name}</div>
        )}
      </div>
    );
  }

  /**
   * Function for getting the characters matching the query, but only after some time has passed
   * to avoid sending too many requests to the api.
   * @param {string} name 
   */
  async updateCharacters(name) {
    // Cancel the old waiting request
    if (this.state.requestTimer) {
      clearTimeout(this.state.requestTimer);
    }

    // Create a new request
    const delayTimeMs = 150;
    const requestTimer = setTimeout(() => this.getCharacters(name), delayTimeMs);
    this.setState({ requestTimer });
  }

  /**
   * Send the request for getting the matching characters and update the component's state when
   * recieving the data.
   * @param {string} name 
   */
  async getCharacters(name) {
    try {
      const characters = await getCharacters(name);
      this.setState({ characters });
    } catch (e) {
      console.log(e);
    }
  }
}

export default Search;
