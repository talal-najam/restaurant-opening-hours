import { getDayName } from '../../../utils/helpers';
import './date-styles.css';

const Date = ({ day, timings, isClosed }) => {
  const today = getDayName('en');
  let isToday = today === day;
  return (
    <div className={`time-interval ${isToday ? 'active' : ''}`}>
      <div className='time-item'>
        <span>{day}:</span>
      </div>
      <div className="time-item timing-container">
        {isClosed ? (
          <div >
            <span>Closed</span>
          </div>
        ) :
          timings.map((pair, index) => (
            <div class="stacked-timings">
              <span>{pair}</span>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Date;
