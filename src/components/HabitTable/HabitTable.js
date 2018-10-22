import React, { Component } from 'react';
import { connect } from 'react-redux';
import HabitRow from './HabitRow';
import DateRow from './DateRow';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { css } from 'emotion';
import { getPreferences } from '../../utils/api/preferencesApi';

class HabitTable extends Component {
  state = {
    dates: []
  }

  componentDidMount() {
    getPreferences().then((preferences) => {
      const startDate = preferences.find(preference => preference.name === 'startDateToDisplay')

      if (startDate) {
        this.setDates(startDate.value);
      } else {
        this.setDates(Moment().subtract(15, 'days'));
      }
    })
  }

  setDates(startDate) {
    const moment = extendMoment(Moment);
    const range = moment.range(moment(startDate), moment().add(15, 'days'));
    const dates = Array.from(range.by('days'));

    this.setState({ dates });
  }

  render() {
    return (
      <div className={css`position: absolute`}>
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