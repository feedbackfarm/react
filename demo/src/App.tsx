import React from 'react';
import FeedbackFarm from '@feedbackfarm/react';
import './App.css';

function App() {
  return (
    <div className="App">
      <FeedbackFarm projectId="STw0dcqk4mvMIhqTtw2h" theme="dark">
        <span>Give Feedback</span>
      </FeedbackFarm>
    </div>
  );
}

export default App;
