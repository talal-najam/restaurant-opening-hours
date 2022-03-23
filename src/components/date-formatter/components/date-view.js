import { getDayName } from '../../../utils/helpers';
import { string, bool, array} from 'prop-types';
import './date-styles.css';

const DateView = ({ day, timings, isClosed }) => {
  const today = getDayName('en');
  let isToday = today === day;
  
  return (
    <div className={`time-interval ${isToday ? 'active' : ''}`}>
      <div className='time-item'>
        <span>{day}:</span>
      </div>
      <div className="time-item timing-container">
        {isClosed ? (
          <div>
            <span>Closed</span>
          </div>
        ) :
          timings.map((pair) => (
            <div key={day} className="stacked-timings">
              <span>{pair}</span>
            </div>
          ))
        }
      </div>

    </div>
  )
}

DateView.propTypes = {
  day: string,
  timings: array,
  isClosed: bool
}

export default DateView;
