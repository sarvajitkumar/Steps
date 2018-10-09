import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitBox from './HabitBox';
import { handleUpdateHabit } from '../../actions';

class HabitRow extends Component {
  toggleHabit = (date) => {
    if (date.isAfter(new Date())) return;

    const habit = this.props.habit;
    const formattedDate = date.format("MM/DD/YYYY");
    const hasCompleted = habit.dates.includes(formattedDate);

    this.props.dispatch(handleUpdateHabit({
      _id: habit._id,
      name: habit.name,
      dates: (hasCompleted ?
        habit.dates.filter(date => date !== formattedDate) :
        habit.dates.concat(formattedDate)
      )
    }));
  }

  getBoxBackgroundColor(date) {
    const habitHasDate = this.props.habit.dates.includes(date.format("MM/DD/YYYY"));

    if (date.isAfter(new Date())) {
      return 'grey';
    } else if (habitHasDate) {
      return 'green';
    } else {
      return 'darkgrey';
    }
  }

  render() {
    return (
      <div className="habit-row">
        {this.props.dates.map(date => (
          <HabitBox key={`habit-box-${date.format("MM/DD")}`}
                    onClick={() => {this.toggleHabit(date)}}
                    backgroundColor={this.getBoxBackgroundColor(date)} />
        ))}
      </div>
    );
  }
}

export default connect()(HabitRow);