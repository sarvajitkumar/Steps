import React, { Component } from 'react';
import HabitPage from './HabitPage';
import '../styles/App.css';
import { fetchAndSetReminders } from '../utils/setReminders';

class App extends Component {
  componentDidMount() {
    fetchAndSetReminders();
  }

  render() {
    return (
      <div className="App">
        <HabitPage />
      </div>
    );
  }
}

export default App;