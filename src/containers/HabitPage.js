import React, { Component } from 'react';
import HabitTable from '../components/HabitTable';
import HabitList from '../components/HabitList';
import SplitPane from 'react-split-pane';
import DataStore from 'nedb';

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
    this.db = new DataStore({
      filename: 'steps/habitsData',
      timestampData: true,
      autoload: true
    });

    this.db.find({}).sort({ createdAt: 1 }).exec((err, data) => {
      this.setState({
        habits: data
      });
    });
  }

  habitsUpdated = () => {
    this.db.loadDatabase();

    this.db.find({}).sort({ createdAt: 1 }).exec((err, data) => {
      this.setState({
        habits: data
      });
    });
  }

  render() {
    //eventually change it so the right pane is ABOVE the left pane
    // if (!this.state.habits.length) {
    //   return <div>LOADING</div>
    // }

    return (
      <SplitPane split="vertical" minSize={150} primary="second">
        <HabitTable habits={this.state.habits} />
        <HabitList habits={this.state.habits} habitsUpdated={this.habitsUpdated} />
      </SplitPane>
    );
  }
}

export default HabitPage;