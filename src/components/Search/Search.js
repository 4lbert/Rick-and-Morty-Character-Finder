import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      characters: [],
    };
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
