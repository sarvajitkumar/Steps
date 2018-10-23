import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRemoveHabit } from '../../actions';
import { css } from 'emotion';
import { getHabitProgress } from '../../utils/api/habitProgressApi';
const { ipcRenderer } = window.require('electron');

const HabitItemSettingsContainerStyles = css` position: absolute;
  display: flex;
  justify-content: center;
  background-color: #FAFAFA;
  width: 300px;
  max-width: 300px;
  height: 340px;
  max-height: 340px;
`;

const HabitItemSettingsStyles = css`
  width: inherit;
  height: inherit;
  color: #7A7A7A;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;

  .habit-item-settings-header {
    font-size: 20px;
    text-align: center;
  }
  > * {
    padding: 5px 0;
  }
`;

const habitItemSettingsStreaksStyles = css`
  border-top: 1px solid #DEDEDE;
  border-bottom: 1px solid #DEDEDE;
`;

const habitItemSettingsFooterStyles = css`
  display: flex;
  justify-content: flex-end;
`;

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

    const {
      currentStreak,
      longestStreak,
      totalCompletions,
      weeklyCompletions
    } = getHabitProgress(habit);

    return (
      <div className={HabitItemSettingsContainerStyles}>
        <div className={HabitItemSettingsStyles}>
          <div className="habit-item-settings-header">{habit.name}</div>
          <div>
            <div>Repeat</div>
            <div>Reminder</div>
            <div>Weekly Target</div>
          </div>
          <div className={habitItemSettingsStreaksStyles}>
            <div>Current Streak: {currentStreak}</div>
            <div>Longest Streak: {longestStreak}</div>
            <div>Total Completions: {totalCompletions}</div>
            <div>Weekly Completions: {weeklyCompletions}</div>
          </div>
          <div className={habitItemSettingsFooterStyles}>
            <button onClick={this.handleDelete}>DELETE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(HabitListItemSettings);