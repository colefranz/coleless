import Game from './Game.jsx';
import getParamByName from './utils/getParamByName.jsx';

export default class Coleless extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: getParamByName('accounts'),
      currentGame: undefined,
      summonerFound: false,
      error: {
        message: ''
      }
    };
  }

  componentDidMount() {
    this.accountsInput.focus();
  }

  // Sara: Okay, how do I want to do this now?
  // So on the main page I can have a search bar

  // Function just sees if account exists or not
  retrieveAccounts = (event) => {
    // Sara: you want to come in here to be able to play with a page I think
    // so that you can kind of get somewhere without it erroring out
    // Okay, first question: how do we see if an account exists at all?
    event.preventDefault();

    const self = this;
    const accounts = this.state.accounts.split(',');

    // Okay. If the account does not exist, output a message to user saying
    // that the account does not exist
    // 'Sorry, the summoner name you entered does not exist. Please enter a valid summoner name.'

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
        // A 400 error corresponds to the summoner not existing
        // We could probably break this up further into its 
        // own function that has a switch that actuall
        // displays the error on the screen
        if (!res.ok) {
          let errorMessage;

          switch (res.status) {
            case 404: 
              errorMessage = 'The summoner you entered does not exist. Please enter a valid summoner name';
              break;
            
            case 400:
              errorMessage = 'API key may be out of date. Please update';
              break;
            
            default:
              errorMessage = 'An error has occurred';
              break;
          }

          self.setState(function(state) {
            state.error.message = errorMessage;
            
            return state;
          });

          return;
        }

        res.json().then((body) => {
          self.setState(function(state) {
            state.summonerFound = true;

            return state;
          });
        });
      });
    });
  }

  renderErrorMessage = function() {
    const self = this;

    if (self.state.error.message !== '') {
      return (
        <div>
          <p>{self.state.error.message}</p>
        </div>
      );
    }
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
        <div>
          {this.renderErrorMessage()}
        </div>
        <Game player={this.state.inGameAccount} data={this.state.currentGame} />
      </div>
    );
  }
}
