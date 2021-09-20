import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleChange = ({ target: { checked } }) => {
    const { music } = this.props;
    this.setState({ loading: true });

    if (checked) {
      addSong(music).then(() => this.setState({ loading: false }));
    } else {
      removeSong(music).then(() => this.setState({ loading: false }));
    }
  };

  render() {
    console.log(this.props);
    const { music: { previewUrl, trackName, trackId } } = this.props;
    const { loading } = this.state;

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
            <label
              data-testid={ `checkbox-music-${trackId}` }
              htmlFor="favorite"
            >
              Favorita
              <input
                id="favorite"
                type="checkbox"
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
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
