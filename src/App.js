import React, { useEffect, useState } from "react";
import axios from "axios";
import CssLoader from "./Components/CssLoader/CssLoader";
import AppContainer from "./Components/AppContainer/AppContainer";
import "./App.scss";

function App() {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const [restaurants, changeRestaurants] = useState([]);

  useEffect(() => {
    setLoader(true);
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://cdn.adpushup.com/reactTask.json"
        );
        const data = response.data;
        changeRestaurants(data);
      } catch (e) {
        setError("Something Went Wrong.");
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="app">
      {(loader && <CssLoader />) ||
        (error && <div className="error">{error}</div>) || (
          <AppContainer restaurants={restaurants} />
        )}
    </div>
  );
}

export default App;
