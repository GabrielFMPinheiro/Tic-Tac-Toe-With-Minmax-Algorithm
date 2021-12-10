import React from 'react';
import binder from 'react-class-binder';

import Cell from '../Cell/Cell';
import Button from '../Button/Button';

import './Board.css';

const scores = {
  1: 10,
  2: -10,
  tie: 0,
};

class Board extends binder(React.Component) {
  constructor() {
    super();

    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      player: '',
      isComputerPlaying: true,
      winner: null,
      playerPlayed: false,
      viewInitialScreen: true,
    };
  }

  eventHandler({ target }) {
    const { id } = target;
    const { player, board, isComputerPlaying } = this.state;
    if (board[id] === '') {
      board[id] = player;
      this.setState({ playerPlayed: true }, () => {
        if (isComputerPlaying && this.state.playerPlayed) {
          this.setState({ player: this.changePlayers() }, this.bestMove);
        } else {
          let result = this.winner(board);
          this.setState({ player: this.changePlayers(), winner: result });
        }
      });
    }
  }

  changePlayers() {
    const { player } = this.state;
    return player === 1 ? 2 : 1;
  }

  winner(board) {
    let winner = null;
    const winChances = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winChances.forEach((chance) => {
      if (
        board[chance[0]] === board[chance[1]] &&
        board[chance[0]] === board[chance[2]] &&
        board[chance[0]] !== ''
      ) {
        winner = board[chance[0]];
      }
    });

    if (!board.includes('') && winner === null) {
      return 'tie';
    }

    return winner;
  }

  bestMove() {
    const { board, player } = this.state;
    let bestScore = -Infinity;
    let move;
    board.forEach((cell, i) => {
      if (cell === '') {
        board[i] = player;
        let score = this.minmax(board, false, player);
        board[i] = '';
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    });

    board[move] = 1;
    let result = this.winner(board);
    this.setState({
      board: board,
      player: this.changePlayers(),
      winner: result,
      playerPlayed: false,
    });
  }

  minmax(board, isMaximizing, player) {
    let result = this.winner(board);

    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      board.forEach((cell, i) => {
        if (cell === '') {
          board[i] = 1;
          let score = this.minmax(board, false, player);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      board.forEach((cell, i) => {
        if (cell === '') {
          board[i] = this.changePlayers();
          let score = this.minmax(board, true, this.changePlayers());
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  }

  resetGame() {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
      player: '',
      isComputerPlaying: true,
      winner: null,
      playerPlayed: false,
      viewInitialScreen: true,
    });
  }

  checkBtnsClicked() {
    let elements = document.getElementsByClassName('game-mode-btn active');

    for (let element of elements) {
      element.classList.remove('active');
    }
  }

  selectPlayer({ target }) {
    let elements = document.getElementsByClassName('player active');

    for (let element of elements) {
      element.classList.remove('active');
    }
    target.classList.toggle('active');
    this.setState({ player: target.innerHTML === 'X' ? 1 : 2 });
  }

  game(board) {
    return (
      <main className="board-container">
        <div className="column-1" />
        <div className="column-2" />
        <div className="row-1" />
        <div className="row-2" />
        {board.map((cell, index) => {
          return (
            <Cell
              value={cell}
              id={index}
              key={index}
              eventHandler={this.eventHandler}
              data-testid={index}
            />
          );
        })}
      </main>
    );
  }

  initialScreen() {
    return (
      <section className="btn-container">
        <h3>First Player</h3>
        <div>
          <Button
            event={this.selectPlayer}
            value={'X'}
            name={'player first-player-btn'}
          />
          <Button
            event={this.selectPlayer}
            value={'O'}
            name={'player second-player-btn'}
          />
        </div>
        <h3>Mode</h3>
        <div>
          <Button
            event={({ target }) => {
              this.setState({ isComputerPlaying: true });
              this.checkBtnsClicked();
              target.classList.toggle('active');
            }}
            value={'1 P'}
            name={'game-mode-btn'}
          />
          <Button
            event={({ target }) => {
              this.setState({ isComputerPlaying: false });
              this.checkBtnsClicked();
              target.classList.toggle('active');
            }}
            value={'2 P'}
            name={'game-mode-btn'}
          />
        </div>
        <Button
          event={() =>
            this.setState({ viewInitialScreen: false }, () => {
              if (this.state.player === 1 && this.state.isComputerPlaying) {
                this.bestMove();
              }
            })
          }
          value={'START'}
          name={'start-btn'}
        />
      </section>
    );
  }

  finalGame(winner) {
    if (winner === 1) {
      return 'X won !';
    } else if (winner === 2) {
      return 'O won !';
    }
    return 'Tie !';
  }

  render() {
    const { board, viewInitialScreen, winner } = this.state;

    if (viewInitialScreen === true) {
      return <>{this.initialScreen()}</>;
    } else if (winner !== null) {
      return (
        <section className="result-container">
          <h1 className="result-title">{this.finalGame(winner)}</h1>
          <Button event={this.resetGame} value={'RESTART'} name={'reset-btn'} />
        </section>
      );
    } else {
      return <>{this.game(board)}</>;
    }
  }
}

export default Board;
