import Game from './Game.jsx';
import getParamByName from './utils/getParamByName.jsx';

export default class Coleless extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: getParamByName('accounts'),
      currentGame: undefined
    };
  }

  componentDidMount() {
    this.accountsInput.focus();
  }

  findAccounts = (event) => {
    event.preventDefault();

    const self = this;

    const accounts = this.state.accounts.split(',');

    // TODO might be better to make this do one at a time
    _.forEach(accounts, function(account) {
      fetch('/currentgame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: accounts[0].trim()
        })
      }).then(function(res) {
        if (!res.ok) {
          return;
        }

        res.json().then((body) => {
          self.setState({
            currentGame: body,
            inGameAccount: account
          });
        });
      });
    });
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
            value={this.state.accounts || ''}
            onChange={this.accountsChange} />
        </form>
        <Game player={this.state.inGameAccount} data={this.state.currentGame} />
      </div>
    );
  }
}
