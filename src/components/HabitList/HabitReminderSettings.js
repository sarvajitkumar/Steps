import React, { Component, Fragment } from 'react';
import { handleUpdateHabit } from '../../actions';
import { css } from 'emotion';
import { connect } from 'react-redux';
import { _setReminders } from '../../utils/setReminders';

const habitReminderButtonStyles = css`
  background-color: #A7A7A7;
  color: #686868;
  border: 1px solid #afafaf;
  width: 18px;
  text-align: center;
  font-size: 10px;
  padding: 2px 2.5px 2.5px 2px;
  cursor: default;
  outline: none;
`;

class HabitReminderSettings extends Component {
  constructor(props) {
    super(props);

    const habit = this.props.habit;
    const shouldRemind = habit.reminders ? habit.reminders.shouldRemind : false;
    const time = habit.reminders ? habit.reminders.time : "";

    this.state = {
      shouldRemind, time
    }
  }

  getDayBackgroundColor = (day) => {
    const days = this.props.habit.reminders && this.props.habit.reminders.days;
    if (!days) return css`background-color: #A7A7A7`;

    return days.includes(day) ?
      css`background-color: #1BBD49` :
      css`background-color: #A7A7A7`;
  }

  handleReminderDayClick = (day) => {
    const habit = this.props.habit;
    const days = (habit.reminders && habit.reminders.days) || [];

    if (days.includes(day)) {
      days.splice(days.indexOf(day), 1);
    } else {
      days.push(day);
    }

    const newReminders = {
      ...habit.reminders,
      days
    };

    this.updateHabit(newReminders);
  }

  handleReminderCheck = (e) => {
    this.setState({ shouldRemind: e.target.checked });
    const newReminders = {
      ...this.props.habit.reminders,
      shouldRemind: e.target.checked
    }
    
    this.updateHabit(newReminders);
  }

  handleReminderTime = (e) => {
    const habit = this.props.habit;
    const newReminders = {
      ...habit.reminders,
      time: e.target.value
    }

    this.updateHabit(newReminders);
  }

  updateHabit(newReminders) {
    const { habit } = this.props;
    this.props.dispatch(handleUpdateHabit({
      ...habit,
      reminders: newReminders
    }));

    this.refreshReminders(habit.name, newReminders);
  }

  refreshReminders(name, newReminders) {
    _setReminders(name, newReminders);
  }

  render() {
    return (
      <Fragment>
        <div className={this.props.habitRowStyles}>
          <span>Repeat:</span>
          <div className={css`flex:0.48`}>
          {['Su','M','Tu','W','Th', 'F', 'Sa'].map(day => (
            <button
              key={day}
              className={`${habitReminderButtonStyles} ${this.getDayBackgroundColor(day)}`}
              onClick={() => {this.handleReminderDayClick(day)}}>
              {day}
            </button>
          ))}
          </div>
        </div>
        <div className={this.props.habitRowStyles}>
          <span>Reminder:</span>
          <div className={css`flex:0.48`}>
            <input type="checkbox"
              checked={this.state.shouldRemind}
              onChange={this.handleReminderCheck} />
            <input type="time"
              defaultValue={this.state.time}
              disabled={!this.state.shouldRemind}
              onBlur={this.handleReminderTime} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect()(HabitReminderSettings);