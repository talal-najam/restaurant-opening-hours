import data from "./data/userData";
import { DateFormatter } from "./components";
import './index.css';

const App = () => {
    return (
    <div className="date-wrapper">
      <h2>Restaurant Opening Hours:</h2>
      <DateFormatter data={data} />
    </div>    
  );
};

export default App;
