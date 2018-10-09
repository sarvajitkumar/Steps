import React from 'react';
import PropTypes from 'prop-types';

const HabitBox = (props) => {
  return (
    <div className="habit-box"
          style={{backgroundColor: props.backgroundColor}}
          onClick={props.onClick} />
  );
}

HabitBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default HabitBox;