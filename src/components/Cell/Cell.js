import React from 'react';
import PropTypes from 'prop-types';

import './Cell.css';

import xImage from './assets/x.png';
import oImage from './assets/o.png';

class Cell extends React.Component {
  chooseImg() {
    const { value } = this.props;
    if (value === 1) {
      return xImage;
    } else if (value === 2) {
      return oImage;
    }
    return 'none';
  }

  render() {
    const { id, eventHandler } = this.props;

    return (
      <div className="cell-container" id={id} onClick={eventHandler}>
        <img
          src={this.chooseImg()}
          alt=""
          className="player-img"
          style={{ display: this.chooseImg() !== 'none' ? 'initial' : 'none' }}
        />
      </div>
    );
  }
}

Cell.propTypes = {
  value: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  eventHandler: PropTypes.func.isRequired,
};

export default Cell;
