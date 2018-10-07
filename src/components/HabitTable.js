import React, { Component } from 'react';
import HabitBox from './HabitBox';
import DateRow from './DateRow';
import Moment from 'moment';
import {extendMoment} from 'moment-range';

class HabitTable extends Component {
  state = {
    dates: []
  }

  componentWillMount() {
    this.getDates();
  }

  getDates() {
    const moment = extendMoment(Moment);
    const range = moment.range(moment().subtract(15, 'days'), moment().add(15, 'days'));
    const dates = Array.from(range.by('days'));

    this.setState({
      dates
    });
  }

  render() {
    const habits = this.props.habits;

    return (
      <div className="habit-table">
        {habits.map(habit => {
          //get saved starting date. and for each check whether or not the habit's dates includes this number
          //if it does then set completed to true, otherwise false

          //might have to make these into a separate component

          //here we can have a method that
          //checks each date and habit and whether the habit.dates.includes(date.format('MM/DD/YYYY'))
          return (
            <div key={`${habit.name}-row`} className="habit-row">
              {this.state.dates.map((_, index) => (
                <HabitBox key={`${habit.name}-box-${index}`} />
              ))}
            </div>
          )
        })}

        <DateRow dates={this.state.dates} />
      </div>
    );
  }
}

export default HabitTable;