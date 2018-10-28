// import DataStore from 'nedb';

// function loadDatabase() {
//   return new DataStore({
//     filename: 'steps/habitsData',
//     autoload: true
//   });
// }

// function fetchReminders() {
//   return new Promise((res, rej) => {
//     const db = loadDatabase();

//     db.find({}).sort({createdAt: 1})
//       .exec((err, habits) => {
//         const reminders = [];
//         habits.forEach(habit => {
//           if (!habits.reminders) res();

//           const habitReminders = habit.reminders.map(r => JSON.parse(r));
//           reminders.push(habitReminders);
//         });

//         res(reminders);
//       })
//   });
// }

// export function _addHabitReminder(habit) {
//   //make sure we save the timeout and interval
//   //so that we can just hit refresh upon lodaing the app again
// }

// export function _updateHabitReminders(habit) {
//  return new Promise((res, rej) => {
//    const db = loadDatabase()

  //  here we have to make sure we clear all the intervals
  //  and that we set the new reminders
//  });
// }