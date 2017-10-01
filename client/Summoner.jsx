export default class Summoner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props || !this.props.data) {
      return null;
    }

    return (
      <div>
        <p>{this.props.data.summonerName}</p>
        <p>{this.props.data.tier + ' ' + this.props.data.rank}</p>
      </div>
    );
  }
}
