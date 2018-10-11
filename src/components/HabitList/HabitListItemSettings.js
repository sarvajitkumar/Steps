import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleRemoveHabit } from '../../actions';

class HabitListItemSettings extends Component {
  componentWillMount() {
    document.body.addEventListener('click', this.handleOutsideClick.bind(this), false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick.bind(this), false);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleOutsideClick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.close();
    }
  }

  handleDelete = () => {
    this.props.dispatch(handleRemoveHabit(this.props.habit._id))
  }

  render() {
    const { habit, style } = this.props;

    return (
      <div ref={this.setWrapperRef}
           className="habit-settings-container"
           style={style}>
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