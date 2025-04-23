import React from "react";

const styles = {
  hero: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    padding: "0 2rem",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    overflow: "hidden",
  },
  
  content: {
    zIndex: 1,
    maxWidth: "800px",
  },
  title: {
    fontSize: "8vw",
    lineHeight: "1.1",
    margin: 0,
    fontWeight: 300,
  },
  place: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginTop: "1.5rem",
    fontFamily: "Inter, sans-serif",
    color: "#f0f0f0",
  },
  socials: {
    position: "absolute",
    top: "2.5rem",              // ⬆️ Match this to navbar's vertical center
    right: "2.5rem",            // ⬅️ Slightly more padding to match logo
    display: "flex",
    gap: "0.75rem",
    zIndex: 1000,               // Ensure it's above everything
  }
  
,
  icon: {
    background: "#fff",
    color: "#000",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

const Hero = () => (
  <section style={styles.hero}>
    {/* Top-right Social Icons */}
    
    <div style={styles.content}>
      <h1 style={styles.title}>
        <span style={styles.place}>INVERSO</span>
      </h1>
      <p style={styles.subtitle}>
      Connecting brands with the right influencers to grow together.
      </p>
    </div>
  </section>
);

export default Hero;
