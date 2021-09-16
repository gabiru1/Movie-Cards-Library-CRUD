import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { Link } from 'react-router-dom';

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
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Your Profile</Link>
      </header>
    );
  }
}

export default Header;
