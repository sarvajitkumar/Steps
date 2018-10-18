import React, { Component } from 'react';
import {
  getPreferences,
  updatePreference,
} from '../utils/api/preferencesApi';
import '../styles/Preferences.scss'

class Preferences extends Component {
  state = {
    startDateToDisplay: "",
    dailyReminderOn: false,
    dailyReminderTime: "",
    soundsOn: false,
    launchAtLogin: false,
    windowWidth: null
  }

  componentDidMount() {
    getPreferences().then((preferences) => {
      if (!preferences.length) return;

      preferences.forEach(preference => {
        this.setState({
          [preference.name]: preference.value
        });
      });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this._setAndUpdatePreference(name, value);
  }

  handleCheckClick = (e) => {
    const { name, checked } = e.target;
    this._setAndUpdatePreference(name, checked);
  }

  _setAndUpdatePreference = (name, value) => {
    let prevState;
    this.setState((state) => {
      prevState = state;
      return { [name]: value }
    });

    try {
      updatePreference(name, {value});
    } catch(e) {
      this.setState({ [name]: prevState[name] })
      console.error(e);
    }
  }

  render() {
    const {
      startDateToDisplay,
      dailyReminderOn,
      dailyReminderTime,
      soundsOn,
      launchAtLogin,
      windowWidth
    } = this.state;

    return (
      <div className="preferences">
        <div className="row">
          <label>Start Date:</label>
          <div>
            <input type="date" name="startDateToDisplay" value={startDateToDisplay} onChange={this.handleChange} />
          </div>
        </div>
        <div className="row">
          <label>Daily Reminder:</label>
          <div>
            <input type="checkbox" name="dailyReminderOn" checked={dailyReminderOn} onChange={this.handleCheckClick} />
            <input type="date"
              disabled={!dailyReminderOn}
              name="dailyReminderTime"
              value={dailyReminderTime}
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="row">
          <label>Sounds:</label>
          <input type="checkbox" name="soundsOn" checked={soundsOn} onChange={this.handleCheckClick} />
        </div>
        <div className="row">
          <label>Launch At Login:</label>
          <input type="checkbox" name="launchAtLogin" checked={launchAtLogin} onChange={this.handleCheckClick} />
        </div>
        <div className="row">
          <label>Window With:</label>
          <div>
            <input type="range" step="50" min="300" max="1000" name="windowWidth" value={windowWidth} onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;