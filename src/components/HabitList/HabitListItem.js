import React, { Component } from 'react';

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
      this.props.submitChange(this.state.name);
      this.nameInput.blur();
    }
  }

  handleBlur = () => {
    this.props.submitChange(this.state.name);
  }

  render() {
    return (
      <div className="habit-list-item">
        <input type="text"
               className="habit-list-item-input"
               ref={(input) => { this.nameInput = input; }} 
               autoFocus={this.props.autoFocus}
               placeholder={this.props.placeholder}
               value={this.state.name}
               onChange={this.handleInputChange}
               onKeyPress={this.handleKeyPress}
               onBlur={this.handleBlur} />

        <span className="habit-list-item-info">
          {this.props.completionCount}{"✓"}
        </span>
      </div>
    );
  }
}

export default HabitListInput;