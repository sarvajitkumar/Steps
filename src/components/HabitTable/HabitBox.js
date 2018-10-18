import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const habitBoxStyles = css`
  width: 30px;
  height: 30px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`

const HabitBox = (props) => {
  return (
    <div className={habitBoxStyles}
          style={{backgroundColor: props.backgroundColor}}
          onClick={props.onClick} />
  );
}

HabitBox.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default HabitBox;