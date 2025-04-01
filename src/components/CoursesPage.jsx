import React from "react";

const courses = [
  { title: "Introduction to Animation", progress: "Completed" },
  { title: "Types of Animation", progress: "In Progress" },
  { title: "Principles of Animation", progress: "Locked" },
];

const CoursesPage = ({ setActivePage }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 Courses</h1>
      <p>Browse and continue your learning journey!</p>
      <div>
        {courses.map((course, index) => (
          <div key={index} style={styles.courseBox}>
            <h3>{course.title}</h3>
            <p>Status: {course.progress}</p>
          </div>
        ))}
      </div>
      <button style={styles.button} onClick={() => setActivePage("Dashboard")}>
        Go to Dashboard
      </button>
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
  courseBox: {
    background: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CoursesPage;
