import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitTable from '../components/HabitTable/HabitTable';
import HabitList from '../components/HabitList/HabitList';
import SplitPane from 'react-split-pane';
import { handleInitialData } from '../actions';


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
    this.props.dispatch(handleInitialData())
      .then(({habits}) => {
        this.setState({
          habits
        });
      });
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

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
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

function mapStateToProps({ habits }) {
  return {
    loading: !habits.length,
    habits
  }
}

export default connect(mapStateToProps)(HabitPage);