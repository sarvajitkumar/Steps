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

  handleInputSubmit = () => {
    this.props.submitChange(this.state.name);
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.nameInput.focus();
    }
  }

  render() {
    return (
      <div className="habit-list-name-input">
        <input type="text"
               ref={(input) => { this.nameInput = input; }}
               value={this.state.name}
               placeholder={this.props.placeholder && this.props.placeholder}
               onChange={this.handleInputChange}
               onBlur={this.handleInputSubmit} />
      </div>
    );
  }
}

export default HabitListInput;