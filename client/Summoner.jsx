import WinRate from './WinRate.jsx';

export default class Summoner extends React.Component {
  constructor(props) {
    super(props);
  }

  getRankIcon = () => {
    return '/base-icons/' + this.props.data.tier.toLowerCase() + '.png';
  }

  render() {
    if (!this.props || !this.props.data) {
      return null;
    }

    return (
      <div className="summoner">
        <p className="summoner-name">{this.props.data.summonerName}</p>
        <p></p>
        <img src={this.props.data.champ.icon} className="icon" />
        <img src={this.getRankIcon()}
          className="icon"
          title={this.props.data.tier + ' ' + this.props.data.rank} />
        <WinRate wins={this.props.data.wins} losses={this.props.data.losses} />
      </div>
    );
  }
}
