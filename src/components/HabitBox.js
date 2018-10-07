import React, { Component } from 'react';

class HabitBox extends Component {
  render() {
    return (
      <div className="habit-box"
           style={{backgroundColor: this.props.backgroundColor}}
           onClick={this.props.toggleHabit} />
    );
  }
}

export default HabitBox;