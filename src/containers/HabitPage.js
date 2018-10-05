import React, { Component } from 'react';
import HabitTable from '../components/HabitTable';
import HabitList from '../components/HabitList';
import SplitPane from 'react-split-pane';

class HabitPage extends Component {
  //habits will look like this
  /*
    habits: [
      {
        name: 'Exercise',
        dates: ['03/12/2018', '03/13/2018']
      }
    ]
  */
  state = {
    habits: [
      {
        name: 'Exercise',
        dates: ['03/12/2018', '03/13/2018']
      },
      {
        name: 'Meditation',
        dates: ['03/12/2018', '03/13/2018']
      }
    ]
  }

  componentDidMount() {
    //fetch all the habits stored
    //use SQL? for now, we'll use the most basic DB or storage
  }

  render() {
    //eventually change it so the right pane is ABOVE the left pane
    return (
      <SplitPane split="vertical" minSize={50} default={500}>
        <HabitTable habits={this.state.habits} />
        <HabitList habits={this.state.habits} />
      </SplitPane>
    );
  }
}

export default HabitPage;