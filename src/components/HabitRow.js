import React, { Component } from 'react';
import HabitBox from './HabitBox';

class HabitRow extends Component {
  componentDidMount() {
    //set the coloring of the habit based upon whether or not the habit's dates include 
    //any of the dates
  }

  render() {
    //here we can have a method that
    //checks each date and habit and whether the habit.dates.includes(date.format('MM/DD/YYYY'))
    const habit = this.props.habit;

    return (
      <div className="habit-row">
        {this.props.dates.map((_, index) => (
          <HabitBox key={`${habit.name}-box-${index}`} />
        ))}
      </div>
    );
  }
}

export default HabitRow;