import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const habitBoxStyles = css`
  width: 36px;
  height: 35px;
  border-bottom: 1px solid #999999;
  border-right: 1px solid #999999;
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