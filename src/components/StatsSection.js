import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  {
    number: 500,
    label: "Campaigns Launched",
    description:
      "From micro to macro — we've helped launch over 500 campaigns tailored to unique brand goals and target audiences.",
  },
  {
    number: 300,
    label: "Influencers Onboarded",
    description:
      "We work with over 300 vetted influencers across niches to ensure authenticity and brand alignment.",
  },
  {
    number: 200,
    label: "Brands Served",
    description:
      "Our client portfolio includes D2C startups, lifestyle brands, and enterprise-level companies.",
  },
  {
    number: 100,
    label: "Success Stories",
    description:
      "We've generated measurable ROI through data-backed collaborations and creative storytelling.",
  },
];

const StatCard = ({ number, label, description }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(number / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= number) {
        clearInterval(interval);
        start = number;
      }
      setCount(start);
    }, 25);
    return () => clearInterval(interval);
  }, [number]);

  return (
    <motion.div
      style={styles.card}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h3 style={styles.number}>{count}+</h3>
      <p style={styles.label}>{label.toUpperCase()}</p>
      <p style={styles.desc}>{description}</p>
    </motion.div>
  );
};

const StatsSection = () => (
    <section id="about" style={styles.section}>

    <div style={styles.wrapper}>
      <div style={styles.left}>
        <div style={styles.leftSticky}>
          <h2 style={styles.heading}>
            Brand growth<br /> powered by creators
          </h2>
          <p style={styles.subtext}>
            We scale brands through hyper-targeted influencer partnerships backed by data and storytelling.
          </p>
          <button style={styles.button}>
            Explore Our Network <span style={styles.arrow}>→</span>
          </button>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.grid}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  </section>
);


const styles = {
  section: {
    width: "100%",
    background: "#fff",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    marginTop: "-80px",
    padding: "8rem 2rem",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
  },
  wrapper: {
    width: "100%",
    maxWidth: "1300px",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "4rem",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 35%",
    minWidth: "300px",
    position: "relative",
  },
  leftSticky: {
    position: "sticky",
    top: "100px",
  },
  heading: {
    fontSize: "3.5rem",
    fontWeight: 600,
    marginBottom: "1.5rem",
    lineHeight: "1.2",
    color: "#000",
  },
  subtext: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "2rem",
  },
  button: {
    background: "#fff",
    border: "1px solid #ccc",
    padding: "0.9rem 2rem",
    borderRadius: "999px",
    fontWeight: 500,
    fontSize: "1rem",
    cursor: "pointer",
  },
  arrow: {
    marginLeft: "0.5rem",
  },
  right: {
    flex: "1 1 60%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
  },
  card: {
    background: "#f5f5f5",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
    minHeight: "220px",
    transition: "transform 0.3s ease",
  },
  number: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    margin: 0,
    color: "#000",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    marginTop: "0.25rem",
    marginBottom: "0.75rem",
    color: "#555",
  },
  desc: {
    fontSize: "0.95rem",
    color: "#666",
    lineHeight: "1.5",
  },
};

export default StatsSection;
