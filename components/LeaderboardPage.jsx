import React from "react";

const leaderboardData = [
  { rank: 1, name: "Alice", diamonds: 120 },
  { rank: 2, name: "Bob", diamonds: 110 },
  { rank: 3, name: "Charlie", diamonds: 100 },
  { rank: 4, name: "David", diamonds: 90 },
  { rank: 5, name: "Eve", diamonds: 85 },
];

const LeaderboardPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏆 Leaderboard 🏆</h1>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Rank</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Diamonds</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr key={player.rank} style={{ ...styles.row, backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff" }}>
                <td style={{ ...styles.td, fontWeight: "bold", color: index === 0 ? "#e74c3c" : "#2c3e50" }}>
                  {player.rank}
                </td>
                <td style={{ ...styles.td, fontWeight: index < 3 ? "bold" : "normal" }}>
                  {player.name}
                </td>
                <td style={styles.td}>
                  {player.diamonds}{" "}
                  <span role="img" aria-label="diamond">💎</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    transition: "transform 0.3s ease-in-out",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#2c3e50",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerRow: {
    backgroundColor: "#3498db",
    color: "white",
    textTransform: "uppercase",
    fontSize: "16px",
  },
  th: {
    padding: "12px",
    fontSize: "18px",
  },
  td: {
    padding: "12px",
    fontSize: "16px",
    borderBottom: "1px solid #ddd",
  },
  row: {
    transition: "background-color 0.3s",
    cursor: "pointer",
  },
};

export default LeaderboardPage;
