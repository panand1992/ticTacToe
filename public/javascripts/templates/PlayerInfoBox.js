import React from 'react';

class PlayerInfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_1: '',
      player_2: ''
    };
  }

  updatePlayerOne(e) {
    this.setState({player_1: e.target.value});
  }

  updatePlayerTwo(e) {
    this.setState({player_2: e.target.value});
  }

  startGame() {
    if(this.state.player_1 === '' || this.state.player_2 === '') {
      alert('Players name can not be empty');
    } else {
      this.props.startGame(this.state.player_1, this.state.player_2);
    }
  }


  render() {
    return (
      <div className="player_info_box">
        <div className="player_info_title">Player details</div>
        <div className="players_info">
          <div className="players_input">
            <label>Player 1</label><br/>
            <input type="text" onChange={this.updatePlayerOne.bind(this)}/>
          </div>
          <div className="players_input">
            <label>Player 2</label><br/>
            <input type="text" onChange={this.updatePlayerTwo.bind(this)} />
          </div>
        </div>
        <div>
          <button onClick={this.startGame.bind(this)}>Start Play</button>
        </div>
      </div>
    );
  }
}

export default PlayerInfoBox;