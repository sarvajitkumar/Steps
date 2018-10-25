import moment from 'moment';
import { fetchHabits } from './api/habitsApi';
const { ipcRenderer } = window.require('electron');

//or we can save it on the habit obj as
//reminders.reminderObjs

//in those cases we have to find a way to update the reminder for that habit....
//how do we differentiate between making sure of this

//1. if user clicks the checkbox,
//  add the reminder
//2. if user simply changes the time or day
//  we update the reminder

//we can save these in the DB and then if it's there call them again
//otherwise use Node's API to refresh()

export function fetchAndSetReminders() {
  fetchHabits().then((habits) => {
    habits.forEach(habit => {
      if (habit.reminders) {
        const { shouldRemind, days, time } = habit.reminders;

        if (shouldRemind && days.length && time) {
          _setReminders(habit.name, habit.reminders)
        }
      }
    });
  });
}

export function _setReminders(name, reminders) {
  const {
    days,
    time
  } = reminders;

  days.forEach(day => {
    _setReminderForDay(day, time, name)
  })
}

function _setReminderForDay(day, time, name) {
  switch(day) {
    case 'Su':
      _setCountdown(time, 0, name);
      break;
    case 'M':
      _setCountdown(time, 1, name);
      break;
    case 'Tu':
      _setCountdown(time, 2, name);
      break;
    case 'W':
      _setCountdown(time, 3, name);
      break;
    case 'Th':
      _setCountdown(time, 4, name);
      break;
    case 'F':
      _setCountdown(time, 5, name);
      break;
    case 'Sa':
      _setCountdown(time, 6, name);
      break;
    default:
      return;
  }
} 

function _setCountdown(time, day, name) {
  const now = moment();
  const [hours, minutes] = time.split(':').map(time => parseInt(time));
  const reminderDate = new moment();
  reminderDate.hours(hours);
  reminderDate.minutes(minutes);
  reminderDate.day(day);
  reminderDate.seconds(0);
  reminderDate.millisecond(0);

  let countdown = reminderDate.valueOf() - now.valueOf();
  countdown = (countdown > 0) ? countdown : countdown + 604800000;

  const reminderEvalString = `
    setTimeout(() => {
      const notification = new Notification({
        title: "Steps",
        body: "${name}"
      }).show();

      // setInterval(() => {
      //   notification.show();
      // }, 604800000)
    }, ${countdown});
  `;

  ipcRenderer.send('add-reminder', reminderEvalString);
}