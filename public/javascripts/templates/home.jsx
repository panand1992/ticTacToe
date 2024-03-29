import React from 'react';
import PlayerInfoBox from './PlayerInfoBox';
import '../../stylesheets/style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player_1: '',
      player_2: '',
      start_game: false,
      current_player: '',
      player_1_type: 'X',
      player_2_type: 'O',
      timeout: null,
      timer: null,
      timing: 30,
      game_box_arr: new Array(9)
    };

    this.checkGameStatus = this.checkGameStatus.bind(this);
    this.showTimer = this.showTimer.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  startGame(player_1, player_2) {
    let types = ['X', 'O'];
    let current_player = Math.floor(Math.random() * 2);
    let player_1_type = types[Math.floor(Math.random() * 2)];
    let player_2_type = 'O';
    if(player_1_type === 'O') {
      player_2_type = 'X';
    }
    this.setState({
      start_game : true,
      current_player: (current_player + 1),
      player_1_type: player_1_type,
      player_2_type: player_2_type,
      player_1: player_1,
      player_2: player_2
    });
    this.showTimer();
  }

  makeMove(val) {
    let current_type = '';
    if(this.state.current_player === 1) {
      current_type = this.state.player_1_type;
    } else {
      current_type = this.state.player_2_type;
    }
    let game_box_arr = this.state.game_box_arr.slice();
    game_box_arr[val] = current_type;
    this.setState({game_box_arr: game_box_arr}, function () {
      this.showTimer();
    });
  }

  showTimer() {
    var self = this;
    clearTimeout(this.state.timeout);
    clearInterval(this.state.timer);
    let time = 30;
    let timer_fn = setInterval(function () {
      time = time - 1;
      self.setState({timing: time});
      if(time <= 0) {
        clearInterval(timer_fn);
      }
    }, 1000);
    let timer = setTimeout(function () {
      self.finishGame('time');
    }, 30000);
    this.setState({timer: timer_fn, timeout: timer}, function () {
      self.checkGameStatus();
    });
  }

  finishGame(by_type) {
    let won_by = this.state['player_' + this.state.current_player];
    if(by_type === 'time') {
      if(this.state.current_player === 1) {
        won_by = this.state.player_2;
      } else {
        won_by = this.state.player_1;
      }
    }
    alert('game finished and won by ' + won_by);
    clearTimeout(this.state.timeout);
    clearInterval(this.state.timer);
  }

  checkGameStatus() {
    let flag_1 = false;
    for(let i=0;i<3;i++) {
      let first = this.state.game_box_arr[i*3];
      let flag = true;
      for(let j=1;j<3;j++) {
        if(first === undefined || first !== this.state.game_box_arr[(i*3)+j]) {
          flag = false;
          break;
        }
      }
      if(flag) {
        flag_1 = true;
        break;
      }
    }
    for(let i=0;i<3;i++) {
      let first = this.state.game_box_arr[i];
      let flag = true;
      for(let j=1;j<3;j++) {
        if(first === undefined || first !== this.state.game_box_arr[(j*3)+i]) {
          flag = false;
          break;
        }
      }
      if(flag) {
        flag_1 = true;
        break;
      }
    }
    if(this.state.game_box_arr[0] !== undefined && this.state.game_box_arr[0] === this.state.game_box_arr[4] && this.state.game_box_arr[4] === this.state.game_box_arr[8] ) {
      flag_1 = true;
    }
    if(this.state.game_box_arr[6] !== undefined && this.state.game_box_arr[6] === this.state.game_box_arr[4] && this.state.game_box_arr[4] === this.state.game_box_arr[2]) {
      flag_1 = true;
    }
    let flag_2 = true;
    for(let k=0;k<9;k++) {
      if(this.state.game_box_arr[k] === undefined) {
        flag_2 = false;
        break;
      }
    }
    if(flag_1) {
      this.finishGame('move');
    } else if(flag_2) {
      alert('game finished and ended in a draw');
      clearTimeout(this.state.timeout);
      clearInterval(this.state.timer);
    } else {
      let current_player = 1;
      if(this.state.current_player === 1) {
        current_player = 2;
      } else {
        current_player = 1;
      }
      this.setState({current_player: current_player});
    }
  }

  render() {
    let gameBoard = [];
    for(let i=0;i<9;i++) {
      let gameBox = <div
        key={'box_'+i}
        id={'box_'+i}
        onClick={this.makeMove.bind(this, i)}
        className={this.state.game_box_arr[i] === undefined ? '' : 'filled'}
      >{this.state.game_box_arr[i]}</div>
      gameBoard.push(gameBox);
    }
    return (
      <div>
        <div className="container">
          <div className="game_title">Tic Tac Toe</div>
          <div>
            {
              this.state.start_game ?
                <div className="game_wrapper">
                  <div className="current_player">Current Player: <b>{this.state['player_' + this.state.current_player]} ({this.state['player_' + this.state.current_player + '_type']})</b></div>
                  <div className="timer">Time Remaining: <b>{this.state.timing} seconds</b></div>
                  <div className="gameBoard">
                    {gameBoard}
                  </div>
                </div>
                :
                <PlayerInfoBox
                  startGame={this.startGame.bind(this)}
                />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;