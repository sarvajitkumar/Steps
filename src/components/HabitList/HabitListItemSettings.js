import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRemoveHabit } from '../../actions';
const { ipcRenderer } = window.require('electron');

class HabitListItemSettings extends Component {
  state = {
    habit: null
  }

  componentDidMount() {
    ipcRenderer.on('habit-data', (_, habit) => {
      this.setState({ habit });
    });
  }

  handleDelete = () => {
    this.props.dispatch(handleRemoveHabit(this.state.habit._id));
  
    setTimeout(
      () => {
        ipcRenderer.send('handle-settings-delete-click');
      }, 200
    )
  }

  render() {
    const { habit } = this.state;
    if (!habit) return <div>Loading...</div>

    return (
      <div className="habit-settings-container">
        <div className="habit-settings">
          <div className="habit-settings-header">{habit.name}</div>
          <div className="habit-settings-reminders">
            <div>Repeat</div>
            <div>Reminder</div>
            <div>Weekly Target</div>
          </div>
          <div className="habit-settings-streaks">
            <div>Current Streak: 3</div>
            <div>Longest Streak: 4</div>
            <div>Total Completions: 5</div>
            <div>Weekly Completions: 6</div>
          </div>
          <div className="habit-settings-footer">
            <button onClick={this.handleDelete}>DELETE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(HabitListItemSettings);