import React from 'react';
import Game from './Game.jsx';

export default class Coleless extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: '',
      currentGame: undefined
    };
  }

  componentDidMount() {
    this.accountsInput.focus();
  }

  findAccounts = (event) => {
    event.preventDefault();

    const self = this;

    //TODO forEach(accounts);
    const accounts = this.state.accounts.split(',');

    fetch('/currentgame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: accounts[0].trim(),
      })
    }).then(function(res) {
      if (!res.ok) {
        self.setState({error: res.statusText});

        return;
      }

      res.json().then((body) => {
        self.setState({currentGame: JSON.stringify(body)});
      });
    }, function(res) {
      self.setState({error: res.statusText});
    })
  }

  accountsChange = (event) => {
    this.setState({accounts: event.target.value})
  }

  render() {
    return (
      <div id="main">
        <form onSubmit={this.findAccounts}>
          <label htmlFor="accounts-input">Enter your accounts </label>
          <input type="text"
            ref={(ref) => this.accountsInput = ref}
            id="accounts-input"
            value={this.state.accounts}
            onChange={this.accountsChange} />
        </form>
        <Game info={this.state.currentGame} />
      </div>
    );
  }
}
