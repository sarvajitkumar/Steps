import React, { Component } from 'react';
import HabitTable from '../components/HabitTable';
import HabitList from '../components/HabitList';
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

    // db.remove({}, {multi: true});
    this.fetchHabits();
  }

  syncAddedHabit = (newHabit) => {
    this.setState({
      habits: [ ...this.state.habits, newHabit ]
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
    // if (!this.state.habits.length) {
    //   return <div>LOADING</div>
    // }

    return (
      <SplitPane split="vertical" minSize={180} primary="second" paneStyle={{overflow:"auto"}}>
        <HabitTable habits={this.state.habits} />
        <HabitList
          habits={this.state.habits}
          syncAddedHabit={this.syncAddedHabit} />
      </SplitPane>
    );
  }
}

export default HabitPage;