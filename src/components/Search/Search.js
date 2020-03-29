import React from 'react';
import './Search.css';
import { getCharacters } from './../../services/characters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      query: window.location.pathname.split('/')[1],
      characters: [],
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();

    // Set the search to the value in the url
    if (this.state.query !== '') {
      const query = decodeURI(this.state.query);
      this.textInput.current.value = query;
      this.getCharacters(query);
    }
  }

  handleInputChange(event) {
    const query = event.target.value;

    /* eslint no-restricted-globals:0 */
    history.pushState({}, undefined, '/' + encodeURI(query));

    this.updateCharacters(query);
  }

  render() {
    return (
      <div className="Search">
        <input type="text" className="TextInput" ref={this.textInput} onChange={this.handleInputChange.bind(this)} />
        <div className="SearchResultContainer">
          {this.state.characters.map(character =>
            <div className="SearchResult" key={character.id}>{character.name}</div>
          )}
        </div>
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
