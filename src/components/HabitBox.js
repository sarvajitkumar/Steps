import React, { Component } from 'react';

class HabitBox extends Component {
  state = {
    backgroundColor: this.props.backgroundColor
  }

  handleClick = () => {
    this.props.toggleHabit();

    this.setState({
      backgroundColor: this.state.backgroundColor === 'grey' ? 'green' : 'grey'
    })
  }

  render() {
    return (
      <div className="habit-box"
           style={{backgroundColor: this.state.backgroundColor}}
           onClick={this.handleClick} />
    );
  }
}

export default HabitBox;