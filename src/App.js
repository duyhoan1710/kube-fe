import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

const apiServer = process.env.REACT_APP_API_SERVER;

function App() {
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(`${apiServer}/ping`);

        setStatus(true);
      } catch {
        setStatus(false);
      }
    };

    fetchData();
  }, []);

  const getStatus = () => {
    switch (status) {
      case true:
        return "Done";
      case false:
        return "Fail";
      default:
        return "Pending";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Host: {apiServer}</p>
        <p>Status: {getStatus()}</p>
      </header>
    </div>
  );
}

export default App;
