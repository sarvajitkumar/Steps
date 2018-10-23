import React, { Component } from 'react';
import { css } from 'emotion';
const { ipcRenderer } = window.require('electron');

const habitListItemStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 6px;
  height: 35px;
  max-height: 35px;
  border-bottom: 1px solid transparent;
  font-size: 14px;
`;

const habitListItemInputStyles = css`
  background-color: transparent;
  color: white;
  border: none;

  &:focus {
    background-color: black;
    color: white;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding-top: 1px;
    padding-bottom: 1px;
  }
`;

class HabitListItem extends Component {
  state = {
    name: this.props.name || '',
    isHovering: false
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

  handleHover = () => {
    this.setState({ isHovering: !this.state.isHovering });
  }

  openHabitSettings = (habitData) => {
    ipcRenderer.send('open-habit-settings', habitData);
  }

  render() {
    const {
      habit,
      autoFocus,
      placeholder,
      completionCount
    } = this.props;

    return (
      <div className={habitListItemStyles}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}>
        <input type="text"
               className={habitListItemInputStyles}
               ref={(input) => { this.nameInput = input; }} 
               autoFocus={autoFocus}
               placeholder={placeholder}
               value={this.state.name}
               onChange={this.handleInputChange}
               onKeyPress={this.handleKeyPress}
               onBlur={this.handleBlur} />

        {
          this.state.isHovering ?
          <span onClick={() => {this.openHabitSettings(habit)}}>
            ...
          </span> :
          <div>
            <span>{completionCount}</span>
            <span className={css`color:#1bbd49;`}>✓</span>
          </div>
        }
      </div>
    );
  }
}

export default HabitListItem;