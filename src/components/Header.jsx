import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    getUser().then((userData) => this.setState({ name: userData.name, loading: false }));
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (<p data-testid="header-user-name">{ name }</p>)}
      </header>
    );
  }
}

export default Header;
