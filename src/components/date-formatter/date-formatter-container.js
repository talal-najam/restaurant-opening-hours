import { convertSecondsToDate, capitalizeFirstLetter } from '../../utils/helpers';
import './date-formatter-styles.css'
import DateFormatterView from './date-formatter-view';
import { WEEK_DAYS } from '../../utils/constants';


// Handle overlapping intervals
const getIntervals = (day, timeRange) => {
  let range = timeRange[day]
  let result = [];
  let nextDay = [];

  if (range && range.length === 0) {
    return [];
  }

  if (range.length > 0 && range[range.length - 1].type === 'open') {
    let type = '';
    let retries = 0

    // if restaurant doesn't close on the same day, find next available close
    while (type != 'close' && retries < 7) {
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

  // If first item is close, remove from current interval
  if (range[0].type === 'close') {
    range = range.slice(1)
  }
  result = range.map(obj => convertSecondsToDate(obj.value));

  return result;
}

// Generate timing pairs of opening & closing hours
const parseIntervals = (intervals) => {
  let result = []
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
