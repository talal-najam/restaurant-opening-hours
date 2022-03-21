import { convertSecondsToDate, capitalizeFirstLetter, sortArrayByValue } from '../../utils';
import './styles.css'
import Date from './Date';

const WEEK_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/**
 * Need output like below
 * 
 * Monday      Closed
 * Tuesday	    10 AM - 6 PM
 * Wednesday   Closed
 * Thursday	  10 AM - 6 PM
 * Friday      10 AM - 1 AM
 * Saturday	  10 AM - 1 AM
 * Sunday	    12 PM - 9
 */

const getIntervals = (day, x) => {
  let range = x[day]
  let result = [];
  var nextDay = [];
  
  if (range[range.length - 1].type === 'open') {
    let type = '';
    let retries = 0
    
    // find next available close in the week
    while(type != 'close' && retries < 7) {
      let currIdx = WEEK_DAYS.indexOf(day);
      if(currIdx === WEEK_DAYS.length - 1) {
        nextDay = WEEK_DAYS[0];
      } else {
        nextDay = WEEK_DAYS[currIdx + 1];
      }

      if(x[nextDay].length > 0 && x[nextDay][0].type === 'close') {
        type = 'close'
      }
      retries++;
    }
    if (retries >= 7) {
      return <p>Error</p>
    }
    range = [...range, x[nextDay][0]]
  }

  if(range[0].type === 'close') {
    range = range.slice(1)
  }

  result = range.map(obj => {
    const time = convertSecondsToDate(obj.value);
    return time
  })
  return result;
}

const getOpeningHours = (day, range) => {
  const formattedDay = capitalizeFirstLetter(day);

  if (range && range[day].length === 0) {
    return <Date day={formattedDay} timings={`Closed`} />
  }

  const time = getIntervals(day, range)
  return (
    <Date
      day={formattedDay} timings={time.join(" - ")}
    />
  );
}

const DateFormatter = ({ data }) => {
  return (
    <>
      <div>
        {WEEK_DAYS.map((day, index) => (
          <div key={index}>
            {getOpeningHours(day, data)}
          </div>
        ))}
      </div>
    </>
  )
}

export default DateFormatter;