import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateRow = ({ dates }) => {
  return (
    <div className="date-row">
      {dates.map((date, index) => {
        const formattedDate = date.format("DD");

        return (
          <div key={`dateRow-date-${index}-${formattedDate}`}
                className="dateRow-date">
            <span className={`dateRow-date ${date.isSame(moment(), 'day') && 'date-is-today'}`}>
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