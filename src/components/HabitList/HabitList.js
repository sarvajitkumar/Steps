import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitListItem from './HabitListItem';
import DataStore from 'nedb';
import moment from 'moment';
import { handleAddHabit } from '../../actions'

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
    if (newHabitName === '') return;

    this.props.dispatch(handleAddHabit({
      name: newHabitName,
      dates: []
    }));

    this.setState({
      newHabitInputOpened: false
    });
  }
  
  submitChangeName = (habit, newName) => {
    db.update({ _id: habit._id }, { $set: { name: newName } });
  }

  getConsecutiveCount(dates) {
    let date = moment();
    let counter = dates.includes(date.format('MM/DD/YYYY')) ? 1 : 0;

    while (date != null) {
      date.subtract(1, 'days');
      const formattedDate = date.format('MM/DD/YYYY');

      if (dates.includes(formattedDate)) counter += 1
      else date = null;
    }

    return counter;
  }

  render() {
    return (
      <div className="habit-list">
        {this.props.habits.map(habit => (
          <HabitListItem
            key={habit._id}
            name={habit.name}
            completionCount={this.getConsecutiveCount(habit.dates)}
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

export default connect()(HabitList);