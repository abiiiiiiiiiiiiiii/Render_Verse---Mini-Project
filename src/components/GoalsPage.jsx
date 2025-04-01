import React from "react";

const goals = [
  { title: "Complete 5 Lessons", progress: 3, total: 5 },
  { title: "Earn 500 Diamonds", progress: 250, total: 500 },
  { title: "Maintain a 10-Day Streak", progress: 7, total: 10 },
];

const GoalsPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎯 Goals</h1>
      {goals.map((goal, index) => (
        <div key={index} style={styles.goalBox}>
          <h3>{goal.title}</h3>
          <div style={styles.progressBarContainer}>
            <div
              style={{
                ...styles.progressBar,
                width: `${(goal.progress / goal.total) * 100}%`,
              }}
            />
          </div>
          <p>
            {goal.progress} / {goal.total} completed
          </p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  goalBox: {
    background: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  progressBarContainer: {
    width: "100%",
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
};

export default GoalsPage;
