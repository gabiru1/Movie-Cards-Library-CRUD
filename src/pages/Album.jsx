import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allMusics: [], // array de musicas de um album
      requestEnd: false, // Seta o estado da requisicao como false para fazer a logica da funcao que requisita
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props; // Silveira/Kauan monstros!!!! Me ajudaram nesse requisito
    getMusics(id).then((musicData) => { // filtra o album clicado
      this.setState({ allMusics: musicData, requestEnd: true });
    });
  }
  // a posição 0 do array allMusics não é uma música, apenas as informações do album

  render() {
    const { allMusics, requestEnd } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {requestEnd
          ? (
            <div>
              <p data-testid="artist-name">{ allMusics[0].artistName }</p>
              <p data-testid="album-name">{ allMusics[0].collectionName }</p>
              <img src={ allMusics[0].artworkUrl100 } alt="album" />
            </div>
          )
          : ''}
        {requestEnd
          ? allMusics.slice(1).map((music, musicNumber) => (
            <MusicCard music={ music } key={ musicNumber } />))
          : ''}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
