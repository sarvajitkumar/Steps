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
    const db = new DataStore({
      filename: 'steps/habitsData',
      autoload: true
    });

    db.find({}, (err, data) => {
      this.setState({
        habits: data
      });
    });
  }

  render() {
    //eventually change it so the right pane is ABOVE the left pane
    if (!this.state.habits.length) {
      return <div>LOADING</div>
    }

    return (
      <SplitPane split="vertical" minSize={50} default={500}>
        <HabitTable habits={this.state.habits} />
        <HabitList habits={this.state.habits} />
      </SplitPane>
    );
  }
}

export default HabitPage;