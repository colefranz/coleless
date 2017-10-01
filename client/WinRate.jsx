export default class WinRate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props || !this.props.wins || !this.props.losses) {
      return null;
    }

    const {wins, losses} = this.props;
    const winRate = ((wins / (wins + losses)) * 100).toFixed(2) + '%';
    const loseRate = ((losses / (wins + losses)) * 100).toFixed(2) + '%';

    return (
      <div className="win-rate">
        <p>{winRate}</p>
        <span className="wins" style={{'width': winRate}}/>
        <span className="losses" style={{'width': loseRate}}/>
      </div>
    );
  }
}
