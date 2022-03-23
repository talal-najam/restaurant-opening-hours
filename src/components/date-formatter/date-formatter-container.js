import { convertSecondsToDate, capitalizeFirstLetter } from '../../utils/helpers';
import './date-formatter-styles.css'
import DateFormatterView from './date-formatter-view';
import { WEEK_DAYS } from '../../utils/constants';


/**
 * TODO:
 * Items that I'd like to add:
 * - Unit tests
 * - Validation/error handling
 * - Stories
 * - Dockerfile
 */

// Handle overlapping intervals and return them
const getIntervals = (day, timeRange) => {
  let range = timeRange[day]
  let result = [];

  if (range && range.length === 0) {
    return [];
  }

  // if restaurant doesn't close on the same day, find next available close
  if (range && range.length > 0 && range[range.length - 1].type === 'open') {
    let type = '';
    let retries = 0
    let nextDay;
    while (type !== 'close' && retries < 7) {
      let currIdx = WEEK_DAYS.indexOf(day);
      nextDay = WEEK_DAYS[currIdx + 1] || WEEK_DAYS[0];

      if (timeRange[nextDay].length > 0 && timeRange[nextDay][0].type === 'close') {
        type = 'close'
      }
      retries++;
    }
    if (retries >= 7) {
      return []
    }
    range = [...range, timeRange[nextDay][0]]
  }

  // If first item is closing time, remove from current interval
  if (range[0].type === 'close') {
    range = range.slice(1)
  }
  result = range.map(obj => convertSecondsToDate(obj.value));
  return result;
}

const parseIntervals = (intervals) => {
  let result = []
  // Create pairs of opening and closing times
  for (let i = 0; i < intervals.length; i += 2) {
    const chunk = `${intervals[i]} - ${intervals[i + 1]}`
    result.push(chunk);
  }
  return result
}

const getOpeningHours = (day, range) => {
  const formattedDay = capitalizeFirstLetter(day);
  const rawIntervals = getIntervals(day, range)
  const timings = parseIntervals(rawIntervals);

  const result = {
    label: formattedDay,
    timings: timings,
    isClosed: timings.length === 0
  }
  return result;
}

const DateFormatter = ({ data }) => {
  const openingHours = WEEK_DAYS.map(day => getOpeningHours(day, data));
  return (
    <>
      <DateFormatterView
        data={openingHours}
      />
    </>
  )
}

export default DateFormatter;
