import React from "react";

const Footer = ({ setActivePage }) => {
  return (
    <div style={styles.footer}>
      <button style={styles.button} onClick={() => setActivePage("Dashboard")}>
        <span style={styles.icon}>📚</span> Courses
      </button>
      <button style={styles.button} onClick={() => setActivePage("Profile")}>
        <span style={styles.icon}>👤</span> Profile
      </button>
      <button style={styles.button} onClick={() => setActivePage("Leaderboard")}>
        <span style={styles.icon}>🏆</span> Leaderboard
      </button>
      <button style={styles.button} onClick={() => setActivePage("Goals")}>
        <span style={styles.icon}>🎯</span> Goals
      </button>
    </div>
  );
};

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    background: "#333",
    padding: "10px 0",
  },
  button: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "20px",
  },
};

export default Footer;
