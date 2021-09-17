import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      music: [], // array de musicas de um album
      requestEnd: false, // Seta o estado da requisicao como false para fazer a logica da funcao que requisita
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props; // Silveira/Kauan monstros!!!!
    getMusics(id).then((musicData) => {
      console.log(musicData);
      this.setState({ music: musicData, requestEnd: true });
    });
  }

  render() {
    const { music, requestEnd } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {console.log(music)}
      </div>
    );
  }
}

export default Album;
