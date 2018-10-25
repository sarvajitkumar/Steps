import DataStore from 'nedb';
const { ipcRenderer } = window.require('electron');

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

export function getWindowWidth() {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.findOne({name: 'windowWidth'}, (err, preference) => {
      if (err) rej(err);
      res(preference.value);
    });
  });
}

export function updatePreference(name, field) {
  return new Promise((res, rej) => {
    const db = loadDatabase();

    db.update({ name }, Object.assign(field, {name}),
      { upsert: true }, (err) => {
        if (err) rej(err);

        if (name === 'windowWidth') {
          ipcRenderer.send('set-width', field.value);
        }
      });
  });
}