import React, { Component } from 'react';
const { ipcRenderer } = window.require('electron');

class HabitListInput extends Component {
  state = {
    name: this.props.name || ''
  }

  handleInputChange = (evt) => {
    this.setState({
      name: evt.target.value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.nameInput.blur();
    }
  }

  handleBlur = () => {
    this.props.submitChange(this.state.name);
  }

  openHabitSettings = (habitData) => {
    ipcRenderer.send('open-habit-settings', habitData);
  }

  render() {
    const { habit, autoFocus, placeholder, completionCount } = this.props;

    return (
      <div className="habit-list-item">
        <input type="text"
               className="habit-list-item-input"
               ref={(input) => { this.nameInput = input; }} 
               autoFocus={autoFocus}
               placeholder={placeholder}
               value={this.state.name}
               onChange={this.handleInputChange}
               onKeyPress={this.handleKeyPress}
               onBlur={this.handleBlur} />

        <span className="habit-list-item-info">
          {completionCount}{"✓"}
        </span>

        <span onClick={() => {this.openHabitSettings(habit)}}>
          ...
        </span>
      </div>
    );
  }
}

export default HabitListInput;