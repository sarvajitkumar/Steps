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

//add habit
//update habit
//remove habit