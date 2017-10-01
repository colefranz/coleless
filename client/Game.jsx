import Summoner from './Summoner.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRedTeam = () => {
    // todo is this needed?
    const participants = this.props.data.participants;

    if (!_.isArrayLike(participants) || participants.length < 1) {
      return null;
    }

    const redTeam = _.filter(this.props.data.participants, function(participant) {
      return participant.teamId === 100;
    });

    return (
      <div className="red team">
        {this.renderParticipants(redTeam)}
      </div>
    )
  }

  renderBlueTeam = () => {
    const participants = this.props.data.participants;

    // todo is this needed?
    if (!_.isArrayLike(participants) || participants.length < 1) {
      return null;
    }

    const blueTeam = _.filter(participants, function(participant) {
      return participant.teamId === 200;
    });

    return (
      <div className="blue team">
        {this.renderParticipants(blueTeam)}
      </div>
    )
  }

  renderParticipants(participants) {
    return _.map(participants, function(participant, index) {
      return (
        <Summoner key={index} data={participant} />
      );
    });
  }

  render() {
    if (!this.props || !this.props.data) {
      return null;
    }

    return (
      <div className="game">
        <h2>Following: {this.props.player}</h2>
        <div className="teams">
          {this.renderRedTeam()}
          {this.renderBlueTeam()}
        </div>
      </div>
    );
  }
}
