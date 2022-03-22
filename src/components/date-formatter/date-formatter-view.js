import { Date } from './components';

const DateFormatter = ({ data }) => {
  return (
    <div className="date-formatter-wrapper">
      <h3>Restaurant Opening Hours:</h3>
      <div role="list" className="intervals-wrapper">
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
export default DateFormatter;
