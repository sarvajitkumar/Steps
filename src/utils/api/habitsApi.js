import DataStore from 'nedb';

/*

Schema

[
  {
    _id: (some random id NEDB gives us)
    name: 'exercise',
    dates: ['01/01/2018', '01/02/2018'] //the dates the habit was completed
    reminders: {
      shouldRemind: true/false,
      days: ['Su', M', 'Tu', 'W', 'Th', 'F', 'Sa'],
      time: '13:34'
    },
  }
]

*/

function loadDatabase() {
  return new DataStore({
    filename: 'steps/habitsData',
    timestampData: true,
    autoload: true
  });
}

export function fetchHabits() {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.find({}).sort({createdAt: 1})
      .exec((err, habits) => {
        if (err) rej(err);
        res(habits);
      })
  })
}

export function createHabit({name, dates}) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.insert({name, dates}, (err, habit) => {
      if (err) rej(err);
      res(habit)
    });
  })
}

export function _updateHabit({_id, name, dates, reminders}) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.update({ _id }, {
      $set: {
        name,
        dates,
        reminders
      }
    }, { returnUpdatedDocs: true },
    (err, _, habit) => {
      if (err) rej(err);
      res(habit);
    });
  });
}

export function deleteHabit(_id) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.remove({ _id }, {}, (err => {
      if (err) rej(err);
      res();
    }));
  });
}