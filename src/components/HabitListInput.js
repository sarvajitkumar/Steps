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

  handleInputSubmit = (evt) => {
    this.props.submitChange(this.state.name);
  }

  render() {
    return (
      <div>
        <input type="text"
               value={this.state.name}
               onChange={this.handleInputChange}
               onBlur={this.handleInputSubmit} />
      </div>
    );
  }
}

export default HabitListInput;