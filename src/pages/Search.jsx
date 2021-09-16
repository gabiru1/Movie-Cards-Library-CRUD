import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchComplete: false,
      loading: false,
      foundArtist: '',
      name: '',
      album: [], // recebe um array de objetos
    };
  }

  seachAlbums = () => {
    const { foundArtist } = this.state;
    this.setState({ loading: true, name: '' });
    searchAlbumsAPI(foundArtist)
      .then((data) => { // array de objetos
        this.setState({
          loading: false,
          searchComplete: true,
          album: data, // data = array de objetos contendo os albuns encontrados
        });
      });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value, foundArtist: value });
  }

  render() {
    const { name, searchComplete, loading, album, foundArtist } = this.state;
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
            onClick={ this.seachAlbums }
          >
            Pesquisar
          </button>
        </form>
        {searchComplete
          ? (
            <div>
              <p>
                Resultado de álbuns de:
                {foundArtist}
              </p>
              {album.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <ul>
                    {album.map(({ colectionId, colectionName }) => (
                      <li key="colectionId">
                        <Link
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `/album/${colectionId}` }
                        >
                          {colectionName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          )
          : (
            <div>{loading ? <Loading /> : ''}</div> // como searchComplete é setado como falso, necessita-se de um segundo if para que "loading" não seja renderizado antes de acionar o botão
          )}
      </div>
    );
  }
}

export default Search;
