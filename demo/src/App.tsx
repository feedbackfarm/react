import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Feedback from "@feedbackfarm/react";

function App() {
  return (
    <div className="App">
      <Feedback>
        <span>Give Feedback</span>
      </Feedback>
    </div>
  );
}

export default App;
