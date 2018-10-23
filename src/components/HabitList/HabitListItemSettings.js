import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRemoveHabit } from '../../actions';
import { css } from 'emotion';
const { ipcRenderer } = window.require('electron');

const HabitItemSettingsContainerStyles = css`
  position: absolute;
  display: flex;
  justify-content: center;
`;

const HabitItemSettingsStyles = css`
  width: 150px;
  height: auto;
  background-color: #ccc;
  color: black;
  border-radius: 5px;
  padding: 5px;

  .habit-item-settings-header {
    text-align: center;
  }

  > :not(.habit-item-settings-header) {
    font-size: 10px;
  }

  > * {
    padding: 5px 0;
  }
`;

const habitItemSettingsStreaksStyles = css`
  border-top: 1px solid darkgrey;
  border-bottom: 1px solid darkgrey;
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
            <div>Current Streak: 3</div>
            <div>Longest Streak: 4</div>
            <div>Total Completions: 5</div>
            <div>Weekly Completions: 6</div>
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