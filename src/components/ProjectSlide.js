// src/components/ProjectSlide.js
import React from "react";
import { motion } from "framer-motion";

const ProjectSlide = ({ title, subtitle, image, tags }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4rem",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "600px", zIndex: 2 }}>
        <h1 style={{ fontSize: "6rem", marginBottom: "1rem" }}>{title}</h1>
        <p style={{ fontSize: "1.3rem", marginBottom: "3rem" }}>{subtitle}</p>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          background: "#111",
          color: "#fff",
          borderRadius: "999px",
          padding: "1.2rem 2.5rem",
          fontSize: "1rem",
          cursor: "pointer",
          width: "fit-content",
          alignSelf: "flex-start",
        }}
      >
        VIEW
      </motion.div>

      <div style={{ position: "absolute", bottom: "2rem", left: "4rem", display: "flex", gap: "1rem" }}>
        {tags.map((tag, i) => (
          <span
            key={i}
            style={{
              border: "1px solid #fff",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              fontSize: "0.8rem",
              opacity: 0.8,
            }}
          >
            {tag.toUpperCase()}
          </span>
        ))}
      </div>
    </motion.section>
  );
};

export default ProjectSlide;
