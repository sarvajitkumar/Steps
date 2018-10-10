import React, { Component } from 'react';

class HabitListItemSettings extends Component {
  componentWillMount() {
    document.body.addEventListener('click', this.handleOutsideClick.bind(this), false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleOutsideClick.bind(this), false);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleOutsideClick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.close();
    }
  }

  render() {
    const { habit, style } = this.props;

    return (
      <div ref={this.setWrapperRef}
           className="habit-settings-container"
           style={style}>
        <div className="habit-settings">
          {habit.name}
          <button onClick={this.handleDelete}>DELETE</button>
        </div>
      </div>
    )
  }
}

export default HabitListItemSettings;