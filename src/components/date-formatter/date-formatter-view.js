import { Date } from './components';
import { array } from 'prop-types';

const DateFormatterView = ({ data }) => {
  return (
    <div className="date-formatter-wrapper">
      <h3>Restaurant Opening Hours:</h3>
      <div role="list">
        {data.map((weekday, index) => (
          <div role="listitem" key={index}>
            <Date
              day={weekday.label} timings={weekday.timings} isClosed={weekday.isClosed}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

DateFormatterView.propTypes = {
  data: array
}

export default DateFormatterView;
