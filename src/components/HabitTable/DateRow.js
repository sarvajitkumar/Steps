import React, { Component } from 'react';
import moment from 'moment';

class DateRow extends Component {
  render() {
    const dates = this.props.dates;

    return (
      <div className="date-row">
        {dates.map((date, index) => {
          const formattedDate = date.format('DD');

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
}

export default DateRow;