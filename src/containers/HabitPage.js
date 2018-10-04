import React, { Component } from 'react';
import HabitTable from '../components/HabitTable';

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
  }

  render() {
    return (
      <div>
        <HabitTable habits={this.state.habits} />
        {/* <HabitTable /> */}
        {/* <HabitList /> */}
      </div>
    );
  }
}

export default HabitPage;