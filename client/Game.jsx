import React from 'react';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  renderParticipants = () => {
    const participants = this.props.info.participants;

    // todo is this needed?
    if (!_.isArrayLike(participants) || participants.length < 1) {
      return null;
    }

    return _.map(this.props.info.participants, function(participant) {
      return (
        <img src={participant.champ.icon} />
      );
    });
  }

  render() {
    if (!this.props || !this.props.info) {
      return null;
    }

    return (
      <div>
        {this.renderParticipants()}
      </div>
    );
  }
}
