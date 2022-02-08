import React from "react";
import "./App.css";

import Feedback from "@feedbackfarm/react";

function App() {
  return (
    <div className="App">
      <Feedback
        projectId="atdCdWpgjIDLJMg3yI6s"
        identifier="anonymous"
        identifierMode="required"
      >
        <span>Give Feedback</span>
      </Feedback>
    </div>
  );
}

export default App;
