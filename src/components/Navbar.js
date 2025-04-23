import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onNavigate }) => (
  <nav style={styles.nav}>
    

    <div style={styles.navCenter}>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <span onClick={() => onNavigate(0)} style={styles.link}>Influencers</span>
        </li>
        <li style={styles.menuItem}>
          <span onClick={() => onNavigate(1)} style={styles.link}>Brands</span>
        </li>
        <li style={styles.menuItem}>
  <span onClick={() => onNavigate(2)} style={styles.link}>About</span>
</li>

<li style={styles.menuItem}>
  <Link to="/contact" style={styles.link}>Contact</Link>
</li>

      </ul>
    </div>
  </nav>
);

const styles = {
  nav: {
    position: "relative", // ✅ scrolls with page now
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "2.5rem",
    zIndex: 100,
  },
  logo: {
    position: "absolute", // logo stays left (not fixed)
    left: "2rem",
    top: "50%",
    transform: "translateY(-50%)",
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#fff",
  },
  navCenter: {
    display: "flex",
    justifyContent: "center",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "2.5rem",
    background: "#2b2b2b",
    padding: "1rem 3rem",
    borderRadius: "999px",
    fontSize: "1rem",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  menuItem: {
    transition: "transform 0.3s ease, filter 0.3s ease",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "0.3rem 0.6rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};

// Optional hover styles (for smoother interaction)
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  li:hover a {
    transform: scale(1.1);
    filter: brightness(1.3);
  }
`;
document.head.appendChild(styleTag);

export default Navbar;
