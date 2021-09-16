import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  }

  render() {
    const { name } = this.state;
    const minValueSize = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ name }
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            disabled={ name.length < minValueSize }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
