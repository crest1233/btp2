import React from "react";
import Navbar from "../components/Navbar";

const SuccessPage = () => (
  <div style={{ background: "#fff", minHeight: "100vh" }}>
    <div style={styles.headerSection}>
      <Navbar />
    </div>

    <div style={styles.wrapper}>
      <h1 style={styles.title}>Thank you!</h1>
      <p style={styles.subtitle}>
        Our team will contact you shortly. Good luck with your collaboration 
      </p>
    </div>
  </div>
);

const styles = {
  headerSection: {
    background: "linear-gradient(120deg, #a47dab, #e8def8)",
    padding: "5rem 0", // ✅ Increased height
  },
  wrapper: {
    maxWidth: "600px",
    margin: "6rem auto",
    textAlign: "center",
    padding: "2rem",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    fontWeight: 600,
    color: "#333",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
  },
};

export default SuccessPage;
