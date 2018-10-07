import React, { Component } from 'react';
import HabitListItem from './HabitListItem';
import DataStore from 'nedb';

let db;

class HabitList extends Component {
  state = {
    newHabitInputOpened: false
  }

  componentDidMount() {
    db = new DataStore({
      filename: 'steps/habitsData',
      timestampData: true,
      autoload: true 
    });
  }

  createHabit = (newHabitName) => {
    if (newHabitName !== '') {
      db.insert({
        name: newHabitName,
        dates: []
      }, (err, habit) => {
        this.props.syncAddedHabit(habit);
      });
    }

    this.setState({
      newHabitInputOpened: false
    });
  }
  
  submitChangeName = (habit, newName) => {
    db.update({ _id: habit._id }, { $set: { name: newName } });
  }

  render() {
    return (
      <div className="habit-list">
        {this.props.habits.map(habit => (
          <HabitListItem
            key={habit._id}
            name={habit.name}
            submitChange={(newName) => { this.submitChangeName(habit, newName)} } />
        ))}
        {this.state.newHabitInputOpened ?
          <div>
            <HabitListItem
              placeholder={"Exercise"}
              autofocus={true}
              name={this.state.newHabitName}
              submitChange={this.createHabit} />
          </div> :
          <div
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px'}}
            onClick={() => {this.setState({newHabitInputOpened: true})}}>
            +
          </div>
        }
      </div>
    );
  }
}

export default HabitList;