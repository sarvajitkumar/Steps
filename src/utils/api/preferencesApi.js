import DataStore from 'nedb';

function loadDatabase() {
  return new DataStore({
    filename: 'steps/preferencesData',
    autoload: true
  });
}

export function getPreferences() {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.find({}).exec((err, preferences) => {
      if (err) rej(err);
      res(preferences);
    });
  });
}

export function updatePreference(name, field) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.update({ name }, Object.assign(field, {name}),
      { upsert: true }, (err) => {
        if (err) rej(err);
      });
  });
}

// export function remove() {
//   const db = new loadDatabase();
//   db.remove({}, { multi: true})
// }