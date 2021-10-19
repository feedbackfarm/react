import React from "react";
import "./App.css";

import Feedback from "@feedbackfarm/react";

function App() {
  return (
    <div className="App">
      <Feedback projectId="123">
        <span>Give Feedback</span>
      </Feedback>
    </div>
  );
}

export default App;
