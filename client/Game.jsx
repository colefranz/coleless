import Summoner from './Summoner.jsx';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRedTeam = () => {
    // todo is this needed?
    if (!_.isArrayLike(participants) || participants.length < 1) {
      return null;
    }

    const redTeam = _.filter(this.props.data.participants, function(participant) {
      return participant.teamId === 100;
    });

    return (
      <div id="red-team">
        {this.renderParticipants(redTeam)}
      </div>
    )
  }

  renderBlueTeam = () => {
    // todo is this needed?
    if (!_.isArrayLike(participants) || participants.length < 1) {
      return null;
    }

    const blueTeam = _.filter(this.props.data.participants, function(participant) {
      return participant.teamId === 200;
    });

    return (
      <div id="blue-team">
        {this.renderParticipants(blueTeam)}
      </div>
    )
  }

  renderParticipants(participants) {
    return _.map(this.props.data.participants, function(participant, index) {
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
      <div>
        {this.renderRedTeam()}
        {this.renderBlueTeam()}
      </div>
    );
  }
}
