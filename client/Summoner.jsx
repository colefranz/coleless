import WinRate from './WinRate.jsx';

export default class Summoner extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRankIcon = () => {
    if (_.isEmpty(this.props.data.tier)) {
      return null;
    }

    return (
      <img src={'/base-icons/' + this.props.data.tier.toLowerCase() + '.png'}
        className="icon"
        title={this.props.data.tier + ' ' + this.props.data.rank} />
    );
  }

  render() {
    if (!this.props || !this.props.data) {
      return null;
    }

    return (
      <div className="summoner">
        <p className="summoner-name">{this.props.data.summonerName}</p>
        <p></p>
        {this.renderRankIcon()}
        <img src={this.props.data.champ.icon} className="icon" />
        <WinRate wins={this.props.data.wins} losses={this.props.data.losses} />
      </div>
    );
  }
}
