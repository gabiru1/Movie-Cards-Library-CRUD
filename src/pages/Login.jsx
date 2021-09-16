import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userLogged: false,
      loading: false,
      name: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ name: value });
  }

  handleKeyDown(event) {
    const keyEnter = 13;
    if (event.keyCode === keyEnter) {
      this.handleChange();
    }
  }

  signIn = () => {
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name })
      .then(() => this.setState({ userLogged: true, loading: false }));
  }

  render() {
    const { name, userLogged, loading } = this.state;
    const minValueSize = 3;
    if (userLogged) {
      return (
        <Redirect to="/search" />
      );
    }
    return (
      <div data-testid="page-login">
        {loading
          ? <Loading />
          : (
            <div>
              <input
                onKeyPress={ this.handleKeyDown }
                value={ name }
                type="text"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
              <button
                disabled={ name.length < minValueSize }
                type="button"
                data-testid="login-submit-button"
                onClick={ this.signIn }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default Login;
