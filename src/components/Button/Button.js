import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

class Button extends React.Component {
  render() {
    const { name, event, value } = this.props;

    return (
      <button type="button" className={name} onClick={event}>
        {value}
      </button>
    );
  }
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Button;
