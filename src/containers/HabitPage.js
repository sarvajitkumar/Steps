import React, { Component } from 'react';
import HabitTable from '../components/HabitTable/HabitTable';
import HabitList from '../components/HabitList/HabitList';
import SplitPane from 'react-split-pane';
import DataStore from 'nedb';

let db;

class HabitPage extends Component {
  //habit schema
  /*
    habits: [
      {
        name: 'Exercise',
        dates: ['03/12/2018', '03/13/2018']
      }
    ]
  */
  state = {
    habits: []
  }

  componentDidMount() {
    db = new DataStore({
      filename: 'steps/habitsData',
      timestampData: true,
      autoload: true
    });

    this.fetchHabits();
  }

  syncAddedHabit = (newHabit) => {
    this.setState({
      habits: [ ...this.state.habits, newHabit ]
    })
  }

  syncToggleHabit = (newHabit) => {
    const newHabits = this.state.habits.map(habit => {
      if (habit._id === newHabit._id) return newHabit
      return habit;
    });

    this.setState({
      habits: newHabits
    })
  }

  fetchHabits() {
    db.find({}).sort({ createdAt: 1 }).exec((err, data) => {
      this.setState({
        habits: data
      });
    });
  }

  render() {
    if (!this.state.habits.length) {
      return <div>LOADING</div>
    }

    return (
      <SplitPane split="vertical" minSize={180} primary="second" paneStyle={{overflow:"auto"}}>
        <HabitTable
          habits={this.state.habits}
          syncToggleHabit={this.syncToggleHabit} />
        <HabitList
          habits={this.state.habits}
          syncAddedHabit={this.syncAddedHabit} />
      </SplitPane>
    );
  }
}

export default HabitPage;