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

  // Sara's function to just get if the account exists or not
  retrieveAccounts = (event) => {
    // Sara: you want to come in here to be able to play with a page I think
    // so that you can kind of get somewhere without it erroring out
    // Okay, first question: how do we see if an account exists at all?
    event.preventDefault();

    const self = this;
    // I guess for now we will enter them separated by a comma (might be easiest)
    const accounts = this.state.accounts.split(',');

    _.forEach(accounts, function(account) {
      fetch('/searchedAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summonerName: accounts[0].trim()
        })
      }).then(function(res) {
        if (!res.ok) {
          console.log('res is not ok');
          return;
        }

        res.json().then((body) => {
         console.log('winning');
        });
      });
    });
  }
  
  // findAccounts = (event) => {
  //   // Sara: you want to come in here to be able to play with a page I think
  //   // so that you can kind of get somewhere without it erroring out
  //   // Okay, first question: how do we see if an account exists at all?
  //   event.preventDefault();

  //   const self = this;
  //   const accounts = this.state.accounts.split(',');

  //   // TODO might be better to make this do one at a time
  //   _.forEach(accounts, function(account) {
  //     // Sara: This is what fails it. We don't immediately want to fetch the current currentgame
  //     // because we also want match history
  //     // Next step: find match history
  //     // First, just try getting the summoner maybe?
  //     fetch('/currentgame', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         name: accounts[0].trim()
  //       })
  //     }).then(function(res) {
  //       // console.log(res);
  //       if (!res.ok) {
  //         console.log('res is not ok');
  //         return;
  //       }

  //       res.json().then((body) => {
  //         self.setState({
  //           currentGame: body,
  //           inGameAccount: account
  //         });
  //       });
  //     });
  //   });
  // }

  accountsChange = (event) => {
    this.setState({accounts: event.target.value})
  }

  render() {
    return (
      <div id="main">
        <form onSubmit={this.retrieveAccounts}>
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
