import DataStore from 'nedb';

function loadDatabase() {
  return new DataStore({
    filename: 'steps/habitsData',
    timestampData: true,
    autoload: true
  });
}

//fetch habits
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

//we have to update the habits WITH the NEWLY updated habit
//create habit
export function createHabit({name, dates}) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.insert({name, dates}, (err, habit) => {
      if (err) rej(err);
      res(habit)
    });
  })
}

//update habit
export function _updateHabit({_id, name, dates}) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.update({ _id }, {
      $set: {
        name,
        dates
      }
    }, { returnUpdatedDocs: true },
    (err, _, habit) => {
      if (err) rej(err);
      res(habit);
    });
  });
}

//remove habit