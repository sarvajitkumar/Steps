import React, { Component } from 'react';
import HabitListItemSettings from './HabitListItemSettings';
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

  openHabitSettings = (e) => {
    console.log('sent?');
    ipcRenderer.send('open-habit-settings', 'ping');

    // const { offsetTop, offsetWidth } = e.target.parentElement;
    // const habitSettingsStyles = {
    //   top: offsetTop + 35,
    //   width: offsetWidth
    // }

    // this.setState({
    //   showSettings: true,
    //   habitSettingsStyles
    // });
  }

  closeHabitSettings = () => {
    this.setState({showSettings: false})
  }

  render() {
    const { id, habit, autoFocus, placeholder, completionCount } = this.props;

    return (
      <div id={id} className="habit-list-item">
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

        <span onClick={this.openHabitSettings}>
          ...
        </span>
        {this.state.showSettings &&
          <HabitListItemSettings
            habit={habit}
            close={this.closeHabitSettings}
            style={this.state.habitSettingsStyles}/> }
      </div>
    );
  }
}

export default HabitListInput;