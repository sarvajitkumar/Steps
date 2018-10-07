import React, { Component } from 'react';
import DataStore from 'nedb';
import HabitBox from './HabitBox';

let db;

class HabitRow extends Component {
  componentDidMount() {
    db = new DataStore({
      filename: 'steps/habitsData',
      timestampData: true,
      autoload: true
    });
  }

  toggleHabit = (date) => {
    const formattedDate = date.format('MM/DD/YYYY');
    const habit = this.props.habit;
    const hasCompleted = habit.dates.includes(formattedDate);

    db.update({ _id: habit._id }, {
      $set: {
        dates: (hasCompleted ?
          habit.dates.filter(date => date !== formattedDate) :
          habit.dates.concat(formattedDate)
        )
      }
    });
  }

  checkHabitCompletion = (habit, date) => {
    return habit.dates.includes(date.format("MM/DD/YYYY"));
  }

  render() {
    const habit = this.props.habit;

    return (
      <div className="habit-row">
        {this.props.dates.map(date => (
          <HabitBox key={`habit-box-${date.format('MM/DD')}`}
                    toggleHabit={() => {this.toggleHabit(date)}}
                    backgroundColor={this.checkHabitCompletion(habit, date) ? 'green': 'grey'} />
        ))}
      </div>
    );
  }
}

export default HabitRow;