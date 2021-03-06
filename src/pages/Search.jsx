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
      albums: [], // recebe um array de objetos, cada objeto é um album
    };
  }

  seachAlbums = () => {
    const { foundArtist } = this.state;
    this.setState({ loading: true, name: '' });
    searchAlbumsAPI(foundArtist) // requisição api fake
      .then((data) => { // array de objetos albuns
        this.setState({
          loading: false,
          searchComplete: true,
          albums: data, // data = array de objetos contendo os albuns encontrados
        });
      });
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value, foundArtist: value });
  }

  render() {
    const { name, searchComplete, loading, albums, foundArtist } = this.state;
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
                {' '}
                {foundArtist}
              </p>
              {albums.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <ul>
                    {albums.map(({ collectionId, collectionName }, index) => (
                      <li key={ collectionId }>
                        <Link
                          data-testid={ `link-to-album-${collectionId}` }
                          to={ `/album/${collectionId}` }
                        >
                          <img
                            src={ albums[index].artworkUrl100 }
                            alt={ collectionName }
                          />
                          {collectionName}
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
