import Summoner from './Summoner.jsx';

// Displays option to add summoner
export default class AddSummoner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props || this.props.summonerFound === false) {
      return null;
    }

    // Sara: Figure out how to get icon for summoner
    // If 'Add' is clicked, then search and show the summoner info
    // PUT THIS IN THE OTHER FILE
    return (
      <div className="summoner-result">
        <div className="summoner-information">
          <p>{this.props.summonerName}</p>
        </div>
      </div>
    );
  }
}
