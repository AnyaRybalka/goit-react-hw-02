import { useState, useEffect } from "react";
import "./App.css";
import Description from "./components/Description/Description.jsx";
import Options from "./components/Options/Options.jsx";
import Feedback from "./components/Feedback/Feedback.jsx";
import Notification from "./components/Notification/Notification.jsx";

const reviewType = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [clicks, setClicks] = useState(() => {
    const storedClicks = localStorage.getItem("clicks");
    return storedClicks ? JSON.parse(storedClicks) : reviewType;
  });

  useEffect(() => {
    localStorage.setItem("clicks", JSON.stringify(clicks));
  }, [clicks]);

  const updateFeedback = (feedbackType) => {
    setClicks((prevState) => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;

  const handleDelete = () => {
    localStorage.removeItem("clicks");
    setClicks({ ...reviewType });
  };

  const positiveValue = Math.round(
    ((clicks.good + clicks.neutral) / totalFeedback) * 100
  );

  return (
    <div>
      <Description />
      <Options
        handleClick={updateFeedback}
        totalFeedback={totalFeedback}
        handleDelete={handleDelete}
      />
      {totalFeedback ? (
        <Feedback
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          total={totalFeedback} 
          positive={positiveValue}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;