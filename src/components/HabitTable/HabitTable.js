import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitRow from './HabitRow';
import DateRow from './DateRow';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { css } from 'emotion';

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

    this.setState({ dates });
  }

  render() {
    return (
      <div className={css`position:absolute;`}>
        {this.props.habits.map(habit => (
          <HabitRow key={`${habit.name}-row`}
                    habit={habit}
                    dates={this.state.dates} />
        ))}

        <DateRow dates={this.state.dates} />
      </div>
    );
  }
}

export default connect()(HabitTable);