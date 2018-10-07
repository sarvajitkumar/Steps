import React, { Component } from 'react';

class DateRow extends Component {
  state = {
    dates: []
  }

  componentWillMount() {
    this.formatDates();
  }

  formatDates() {
    this.setState({
      dates: this.props.dates.map(date => date.format('DD'))
    })
  }

  render() {
    return (
      <div className="date-row">
        {this.state.dates.length && this.state.dates.map((date, index) => {
          return (
            <span key={`dateRow-${index}-${date}`}
                  className="dateRow-date">
              {date}
            </span>
          )
        })}
      </div>
    );
  }
}

export default DateRow;