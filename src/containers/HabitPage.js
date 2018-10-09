import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitTable from '../components/HabitTable/HabitTable';
import HabitList from '../components/HabitList/HabitList';
import SplitPane from 'react-split-pane';
import { handleInitialData } from '../actions';

class HabitPage extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    if (this.props.loading) {
      return <div>LOADING...</div>
    }

    return (
      <SplitPane split="vertical" minSize={180} primary="second" paneStyle={{overflow:"auto"}}>
        <HabitTable habits={this.props.habits} />
        <HabitList habits={this.props.habits} />
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

//habit schema
/*
  habits: [
    {
      name: 'Exercise',
      dates: ['03/12/2018', '03/13/2018']
    }
  ]
*/