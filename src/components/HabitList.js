import React, { Component } from 'react';
import HabitListInput from './HabitListInput';
import DataStore from 'nedb';

class HabitList extends Component {
  componentDidMount() {
    this.db = new DataStore({ filename: 'steps/habitsData', autoload: true });
  }
  
  submitChangeName = (habit, newName) => {
    this.db.update({ _id: habit._id }, { $set: { name: newName } });
  }

  render() {
    return (
      <div className="habit-list">
        {this.props.habits.map(habit => (
          <HabitListInput
            key={habit._id}
            name={habit.name}
            submitChange={(newName) => { this.submitChangeName(habit, newName)} } />
        ))}
      </div>
    );
  }
}

export default HabitList;