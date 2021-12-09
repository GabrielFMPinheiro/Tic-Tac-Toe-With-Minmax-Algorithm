import React, { Component } from 'react';

import Board from './components/Board/Board';

import './App.css';
import Header from './components/Header/Header';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Board />
      </div>
    );
  }
}
