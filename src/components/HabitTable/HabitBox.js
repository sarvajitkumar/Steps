import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const habitBoxStyles = css`
  width: 36px;
  height: 35px;
  border-bottom: 1px solid #999999;
  border-right: 1px solid #999999;
`

const HabitBox = (props) => {
  return (
    <div className={css`${habitBoxStyles} ${props.boxDynamicStyles}`}
      onClick={props.onClick} />
  );
}

HabitBox.propTypes = {
  boxDynamicStyles: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default HabitBox;