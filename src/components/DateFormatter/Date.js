import { getDayName } from '../../utils';


const Date = ({ day, timings }) => {
  const today = getDayName('en');
  let isToday = today === day;
  return (
    <div className={`time-interval ${isToday ? 'active' : ''}`}>
      <div className='time-item'>
        {day}:
      </div>
      <div className="time-item timing-container">
        {timings}
      </div>
    </div>
  )
}

export default Date;
