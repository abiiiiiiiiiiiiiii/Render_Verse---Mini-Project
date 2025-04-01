import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Import Firebase
import { doc, getDoc } from "firebase/firestore";
import defaultProfile from "../images/profile.jpg"; // Default avatar

const ProfilePage = () => {
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState({
    avatar: "https://via.placeholder.com/100",
    level: "Intermediate",
    diamonds: 250,
    streak: 15,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid); // Get user document from Firestore
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); // Set user's name from Firestore
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>👤 Profile</h1>
        <img src={userProfile.avatar} alt="User Avatar" style={styles.avatar} />
        <h2 style={styles.name}>{userName || "Loading..."}</h2>
        <div style={styles.statsContainer}>
          <p style={styles.info}>
            <span style={styles.label}>Level:</span> {userProfile.level}
          </p>
          <p style={styles.info}>
            <span style={styles.label}>Diamonds:</span> {userProfile.diamonds}{" "}
            <span role="img" aria-label="diamond">💎</span>
          </p>
          <p style={styles.info}>
            <span style={styles.label}>Streak:</span> {userProfile.streak}🔥
          </p>
        </div>
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
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "320px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "15px",
    color: "#333",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #3498db",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  name: {
    fontSize: "22px",
    marginTop: "15px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  statsContainer: {
    marginTop: "15px",
    textAlign: "left",
  },
  info: {
    fontSize: "18px",
    margin: "8px 0",
    color: "#555",
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
  },
  label: {
    fontWeight: "bold",
    color: "#222",
  },
};

export default ProfilePage;
