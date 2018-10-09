import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitBox from './HabitBox';
import { handleUpdateHabit } from '../../actions';

class HabitRow extends Component {
  state = {
    habit: this.props.habit
  }

  toggleHabit = (date) => {
    if (date.isAfter(new Date())) return;

    const habit = this.props.habit;
    const formattedDate = date.format('MM/DD/YYYY');
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

  checkHabitCompletion = (habit, date) => {
    return habit.dates.includes(date.format("MM/DD/YYYY"));
  }

  getBoxBackgroundColor(date) {
    const habit = this.state.habit;

    if (date.isAfter(new Date())) {
      return 'grey';
    } else if (habit.dates.includes(date.format("MM/DD/YYYY"))) {
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
                    toggleHabit={() => {this.toggleHabit(date)}}
                    backgroundColor={this.getBoxBackgroundColor(date)} />
        ))}
      </div>
    );
  }
}

export default connect()(HabitRow);