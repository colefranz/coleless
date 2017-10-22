import Game from './Game.jsx';
import AddSummoner from './AddSummoner.jsx';
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
      },
      // will keep track of all the summoner informaiton
      // SARA: You can look at statusboard for this I think
      summonerQueue: {},
      searchForSummoner: false
    };
  }

  // comment out for now because I legit don't know how to access it
  // componentDidMount() {
  //   this.accountsInput.focus();
  // }

  // Sara: Okay, how do I want to do this now?
  // So on the main page I can have a search bar, which already exists
  // Search for the summoner
  // If it exists, pull up information for it
  // Add to a queue of some sort

  // Function just sees if account exists or not
  retrieveAccounts = (event) => {
    event.preventDefault();

    const self = this;
    // this will go away soon becuase we will add one account at a time
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
            state.summonerName = body.summonerName;
            state.summonerId = body.summonerId;

            return state;
          });
        });
      });
    });
  }

  renderErrorMessage = function() {
    const self = this;
    let message = self.state.error.message;

    if (message !== '') {
      return (
        <div class="error-message">
          <p>{self.state.error.message}</p>
        </div>
      );
    }
  }

  // Sara: we want to move this
  
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

  showForm = (event) => {
    const self = this;

    self.setState(function(state) {
      state.searchForSummoner = !this.state.searchForSummoner;

      return state;
    });
  }

  renderSummonerForm = (event) => {
    const self = this;

    if (self.state.searchForSummoner === true) {
      return (
        <div id="summoner-form">
          <form onSubmit={self.retrieveAccounts}>
            <label htmlFor="accounts-input">Enter your accounts </label>
            <input type="text"
              ref={(ref) => self.accountsInput = ref}
              id="accounts-input"
              value={self.state.accounts || ''}
              onChange={self.accountsChange} />
          </form>
        </div>
      );
    }
  }

  accountsChange = (event) => {
    this.setState({accounts: event.target.value})
  }

  // Note for Sara: Eventually we are going to want to move Game so that it will be 
  // accessed only after we've added the player to the queue
  // Sara: only show the form after the + button is clicked
  render() {
    return (
      <div id="main">
        <div id="get-summoner-stuff">
          {this.renderSummonerForm()}
          <div id="add-summoner" onClick={this.showForm}>
            +
          </div>
        </div>
        {this.renderErrorMessage()}
        <AddSummoner summonerName={this.state.summonerName}
          summonerId={this.state.summonerId}
          summonerFound={this.state.summonerFound} />
        <Game player={this.state.inGameAccount} data={this.state.currentGame} />
      </div>
    );
  }
}
