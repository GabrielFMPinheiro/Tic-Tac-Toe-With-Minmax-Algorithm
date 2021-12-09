import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Board from './Board';

const gameStart = (player, mode) => {
  render(<Board />);
  let btnPlayer = screen.getByRole('button', {
    name: player,
  });
  let btnMode = screen.getByRole('button', {
    name: mode,
  });
  let startGame = screen.getByRole('button', {
    name: /start/i,
  });
  userEvent.click(btnPlayer);
  userEvent.click(btnMode);
  userEvent.click(startGame);
};

describe('Board component', () => {
  describe('in initial screen', () => {
    beforeEach(() => {
      render(<Board />);
    });
    it('should have 5 btns on initial screen', () => {
      let btns = screen.getAllByRole('button');
      expect(btns).toHaveLength(5);
    });
    it('all btns should have the right name', () => {
      const names = ['X', 'O', '1 P', '2 P', 'START'];

      names.forEach((name) => {
        let btn = screen.getByRole('button', { name: `${name}` });
        expect(btn).toBeInTheDocument();
      });
    });
    it('should have the headings "first Player" and "Mode"', () => {
      let playerHeader = screen.getByRole('heading', { name: /first player/i });
      let mode = screen.getByRole('heading', { name: /mode/i });
      expect(playerHeader).toBeInTheDocument();
      expect(mode).toBeInTheDocument();
    });
  });
});

describe('in game screen', () => {
  describe('playing P1 mode', () => {
    describe('with Robot as first player', () => {
      beforeEach(() => {
        gameStart('X', '1 P');
      });
      it('should have "x" in first cell', () => {
        let cell = screen.getByTestId('0');
        expect(cell).toHaveAttribute('src', 'x.png');
      });
      it('should follow the minmax algorithm', () => {
        let cellO = document.getElementById('1');
        userEvent.click(cellO);

        let nextMoveX = screen.getByTestId('3');
        expect(nextMoveX).toHaveAttribute('src', 'x.png');

        let nextMoveO = document.getElementById('4');
        userEvent.click(nextMoveO);

        let winnerMsg = screen.getByRole('heading', { name: /x won/i });
        expect(winnerMsg).toBeInTheDocument();
      });
    });

    describe('with human as first player', () => {
      beforeEach(() => {
        gameStart('O', '1 P');
      });
      it('should have "o" when the user clicks', () => {
        let cellO = document.getElementById('0');
        userEvent.click(cellO);

        let imgO = screen.getByTestId('0');
        expect(imgO).toHaveAttribute('src', 'o.png');
      });
      it('should follow the minmax algorithm', () => {
        let cellO = document.getElementById('0');
        userEvent.click(cellO);

        let nextMoveX = screen.getByTestId('4');
        expect(nextMoveX).toHaveAttribute('src', 'x.png');

        let nextMoveO = document.getElementById('1');
        userEvent.click(nextMoveO);

        nextMoveX = screen.getByTestId('2');
        expect(nextMoveX).toHaveAttribute('src', 'x.png');
      });
    });
  });
  describe('playing P2 mode', () => {
    describe('with X as first player', () => {
      beforeEach(() => {
        gameStart('X', '2 P');
      });
      it('should not have any image when start the game', () => {
        let i = 0;
        while (i < 8) {
          let img = screen.getByTestId(i.toString());
          expect(img).toHaveAttribute('src', 'none');
          i += 1;
        }
      });
      it('should appear the "X" image when the user click on the first time', () => {
        let cellX = document.getElementById('3');
        userEvent.click(cellX);

        let imgCellX = screen.getByTestId('3');
        expect(imgCellX).toHaveAttribute('src', 'x.png');
      });
      it('should appear the "O" image on the second click', () => {
        let cellX = document.getElementById('3');
        userEvent.click(cellX);

        let nextMove = document.getElementById('1');
        userEvent.click(nextMove);

        let imgCellO = screen.getByTestId('1');
        expect(imgCellO).toHaveAttribute('src', 'o.png');
      });
    });
    describe('with O as first player', () => {
      beforeEach(() => {
        gameStart('O', '2 P');
      });
      it('should not have any image when start the game', () => {
        let i = 0;
        while (i < 8) {
          let img = screen.getByTestId(i.toString());
          expect(img).toHaveAttribute('src', 'none');
          i += 1;
        }
      });
      it('should appear the "O" image when the user click on the first time', () => {
        let cellO = document.getElementById('2');
        userEvent.click(cellO);

        let imgCellO = screen.getByTestId('2');
        expect(imgCellO).toHaveAttribute('src', 'o.png');
      });
      it('should appear the "X" image on the second click', () => {
        let cell0 = document.getElementById('3');
        userEvent.click(cell0);

        let nextMove = document.getElementById('1');
        userEvent.click(nextMove);

        let imgCellX = screen.getByTestId('1');
        expect(imgCellX).toHaveAttribute('src', 'x.png');
      });
    });
  });
});
