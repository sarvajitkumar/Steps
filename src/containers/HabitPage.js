import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import HabitTable from '../components/HabitTable/HabitTable';
import HabitList from '../components/HabitList/HabitList';
import { handleInitialData } from '../actions';
import { getWindowWidth } from '../utils/api/preferencesApi';
const { ipcRenderer } = window.require('electron');

class HabitPage extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());

    ipcRenderer.on('reload-db', () => {
      this.props.dispatch(handleInitialData())
      this.forceUpdate();
    });

    getWindowWidth().then(windowWidth => {
      if (windowWidth) {
        ipcRenderer.send('set-width', windowWidth);
      }
    });
  }

  render() {
    //if (this.props.loading) {
    //  return <div>LOADING...</div>
    //}

    return (
      <SplitPane split="vertical" minSize={180} primary="second" paneStyle={{overflow: "auto"}}>
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
