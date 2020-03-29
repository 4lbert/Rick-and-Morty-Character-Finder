import React from 'react';
import './Search.css';
import { getCharacters } from './../../services/characters';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      query: window.location.pathname.split('/')[1],
      characters: [],
      selected: [],
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
          {this.state.characters.map(character => {
            const selected = this.state.selected.includes(character.id);
            return (
              <div
                className={`SearchResult ${selected ? 'selected' : ''}`}
                onClick={() => this.toggleCharacter(character.id)}
                key={character.id}
              >
                {character.name}
              </div>
            );
          })}
        </div>
        <p>{this.state.selected.length} selected characters (<span className="reset" onClick={this.resetSelection.bind(this)}>reset</span>)</p>
      </div>
    );
  }

  toggleCharacter(id) {
    const index = this.state.selected.indexOf(id);
    if (index > -1) {
      let newSelection = this.state.selected;
      newSelection.splice(index, 1);
      this.setState({ selected: newSelection });
    } else {
      const newSelection = this.state.selected;
      newSelection.push(id);
      this.setState({ selected: newSelection });
    }
  }

  resetSelection() {
    this.setState({ selected: [] });
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
