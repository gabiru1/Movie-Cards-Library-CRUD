import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  handleChange = ({ target: { checked } }) => { // target = checkbox
    const { music, onChange } = this.props;
    console.log();
    this.setState({ loading: true });

    if (checked) {
      addSong(music).then(() => this.setState({ loading: false }));
    } else {
      removeSong(music).then(() => this.setState({ loading: false }));
    }
    this.fetchFavorites();
    onChange();
  };

  fetchFavorites = () => {
    getFavoriteSongs()
      .then((data) => this.setState({ favorites: data }));
  }

  render() {
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { loading, favorites } = this.state;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {loading
          ? <Loading />
          : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                data-testid={ `checkbox-music-${trackId}` } /* O requisito pede que o data-testid fique na label, porem nao esta funcionando quando eh colocado no input */
                type="checkbox"
                checked={ favorites.some((music) => music.trackId === trackId) }
                onChange={ this.handleChange }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

MusicCard.defaultProps = {
  onChange: () => {},
};

export default MusicCard;
