import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (index) => {
    setIsMobileMenuOpen(false); // close sidebar on click
    if (location.pathname === "/") {
      onNavigate?.(index);
    } else {
      navigate("/", { state: { scrollTo: index } });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav style={styles.nav}>
      <div style={styles.navCenter}>
        {/* Burger Icon */}
        <button
          style={styles.burger}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="burger"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul style={styles.menu} className="desktop-menu">
          <li style={styles.menuItem}>
            <span onClick={() => handleNavClick(0)} style={styles.link}>Influencers</span>
          </li>
          <li style={styles.menuItem}>
            <span onClick={() => handleNavClick(1)} style={styles.link}>Brands</span>
          </li>
          <li style={styles.menuItem}>
            <span onClick={() => handleNavClick(2)} style={styles.link}>About</span>
          </li>
          <li style={styles.menuItem}>
            <Link to="/contact" style={styles.link}>Contact</Link>
          </li>
        </ul>

        {/* Mobile Sidebar */}
        <ul
          className="mobile-menu"
          style={{
            ...styles.sidebar,
            transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <li style={{ textAlign: "right" }}>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </li>
          <li style={styles.menuItem}>
            <span onClick={() => handleNavClick(0)} style={styles.link}>Influencers</span>
          </li>
          <li style={styles.menuItem}>
            <span onClick={() => handleNavClick(1)} style={styles.link}>Brands</span>
          </li>
          <li style={styles.menuItem}>
            <span onClick={() => handleNavClick(2)} style={styles.link}>About</span>
          </li>
          <li style={styles.menuItem}>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={styles.link}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: "relative",
    width: "100%",
    paddingTop: "2rem",
    display: "flex",
    justifyContent: "center",
    zIndex: 100,
  },
  navCenter: {
    width: "100%",
    maxWidth: "1200px",
    padding: "0 1rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  burger: {
    fontSize: "2rem",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "none", // shown via media query
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
  sidebar: {
    listStyle: "none",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    background: "#2b2b2b",
    padding: "2rem 1.5rem",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
    boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    zIndex: 999,
    width: "80%",
    maxWidth: "280px",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
  },
  menuItem: {
    textAlign: "center",
    transition: "transform 0.3s ease, filter 0.3s ease",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    cursor: "pointer",
    display: "inline-block",
    transition: "all 0.3s ease",
  },
};

// Hover effect + mobile toggle styles
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  li:hover a, li:hover span {
    transform: scale(1.05);
    filter: brightness(1.3);
    background-color: rgba(255,255,255,0.1);
  }

  @media (max-width: 767px) {
    .desktop-menu {
      display: none !important;
    }
    .burger {
      display: block !important;
    }
  }

  @media (min-width: 768px) {
    .mobile-menu {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default Navbar;
