import React, { Component } from 'react';

class HabitList extends Component {
  render() {
    //for each habit, make an input box that allows you to change that habit
    return (
      <div className="habit-list">
        {this.props.habits.map(habit => (
          <div>
            <input value={habit.name} />
          </div>
        ))}
      </div>
    );
  }
}

export default HabitList;