import React from "react";

const Intro = () => (
  <section style={styles.section}>
    <div style={styles.left}>
    <h2 style={styles.heading}>We build brands<br />with creators</h2>

      <button style={styles.button}>Our Story →</button>
    </div>
    <div style={styles.right}>
    <p>
  Arkitect connects forward-thinking brands with the right creators to amplify reach and drive real engagement.
  We match storytelling with strategy to deliver campaigns that truly resonate.
</p>
<p>
  With a focus on authenticity and data-driven insights, we help brands grow through trusted influencer partnerships.
  Every collaboration is crafted to build impact, community, and long-term value.
</p>

      <p>📞 +91 9717164805</p>
      <p>📧 <a href="mailto:hello@example.com" style={{ color: "#fff" }}>info@inverso.com</a></p>
    </div>
  </section>
);

const styles = {
  section: {
    padding: "5rem 3rem",
    color: "#fff",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    
    
    alignItems: "flex-start",
    gap: "3rem",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  left: {
    flex: "1 1 40%",
  },
  right: {
    flex: "1 1 50%",
    fontSize: "1.2rem",
    lineHeight: "1.8",
    fontFamily: "Inter, sans-serif",
  },
  heading: {
    fontSize: "3vw",
  },
  button: {
    marginTop: "1rem",
    padding: "0.8rem 1.5rem",
    fontSize: "1rem",
    background: "transparent",
    border: "1px solid #fff",
    borderRadius: "999px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Intro;
