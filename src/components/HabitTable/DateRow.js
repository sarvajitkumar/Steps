import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { css } from 'emotion';

const dateRowStyles = css`
  display: flex;
  align-items: center;
`;

const dateRowDateStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 35px;
  font-size: 10px;
  border-right: 1px solid transparent;
`;

const dateRowDateIsTodayStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: black;
  border-radius: 50%;
  color: white;
`;

function getDateStyles (date) {
  if (date.isSame(moment(), 'day')) {
    return dateRowDateIsTodayStyles;
  } else if (date.isAfter(moment(), 'day')) {
    return css`color: #b9b8b9`;
  } else {
    return "";
  }
}

const DateRow = ({ dates }) => {
  return (
    <div className={dateRowStyles}>
      {dates.map((date, index) => {
        const formattedDate = date.format("DD");

        return (
          <div key={`dateRow-date-${index}-${formattedDate}`}
               className={dateRowDateStyles}>
            <span className={getDateStyles(date)}>
              {formattedDate}
            </span>
          </div>
        );
      })}
    </div>
  );
}

DateRow.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.instanceOf(moment)).isRequired
}

export default DateRow;