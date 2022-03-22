import data from "./data/userData";
import { DateFormatter } from "./components";
import './index.css';

const App = () => {
    return (
      <DateFormatter data={data} />
  );
};

export default App;
