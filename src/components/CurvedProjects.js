import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import
import CreatorImage from "../assets/creator1.jpg";
import BrandImage from "../assets/brand1.jpg";

const projects = [
  {
    title: "CREATORS ",
    desc: "Partner with authentic influencers who drive real engagement and results.",
    image: CreatorImage,
    tags: ["Influencer", "Content", "Authenticity"],
  },
  {
    title: "BRAND STORIES",
    desc: "We help brands tell better stories through trusted creator collaborations.",
    image: BrandImage,
    tags: ["Branding", "Strategy", "Campaigns"],
  },

];

const CurvedProjects = forwardRef((_, ref) => {
  const [hovering, setHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // ✅ Hook

  const sectionRefs = [useRef(null), useRef(null)];

  useImperativeHandle(ref, () => ({
    scrollToSection: (index) => {
      sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
    },
  }));

  const handleMouseMove = (e) => {
    setCoords({ x: e.clientX, y: e.clientY });
  };

  return (
    <div style={styles.container}>
      {projects.map((project, index) => (
        <section
          ref={sectionRefs[index]}
          key={index}
          onClick={() => {
            if (index === 0) navigate("/signup");
            else if (index === 1) navigate("/find-by-email");
            
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
          style={{
            ...styles.slide,
            backgroundImage: `url(${project.image})`,
          }}
        >
          <div style={styles.overlay}>
            <h1 style={styles.title}>
              {project.title.split(" ")[0]} <br />
              {project.title.split(" ")[1]}
            </h1>
            <p style={styles.desc}>{project.desc}</p>

            <div style={styles.tags}>
              {project.tags.map((tag, i) => (
                <span key={i} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {hovering && (
            <div
              style={{
                ...styles.cursor,
                left: coords.x - 60,
                top: coords.y - 60,
              }}
            >
              VIEW
            </div>
          )}
        </section>
      ))}
    </div>
  );
});

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    overflowY: "scroll",
    scrollSnapType: "y mandatory",
    scrollBehavior: "smooth",
  },
  slide: {
    height: "100vh",
    scrollSnapAlign: "start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "40px",
    overflow: "hidden",
    position: "relative",
    cursor: "none",
  },
  overlay: {
    zIndex: 2,
    padding: "6rem 4rem",
    color: "#fff",
    maxWidth: "50%",
  },
  title: { fontSize: "6rem", fontWeight: 600, marginBottom: "1rem" },
  desc: { fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.9 },
  tags: { display: "flex", gap: "1rem" },
  tag: {
    border: "1px solid #fff",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    fontSize: "0.8rem",
  },
  cursor: {
    position: "fixed",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    fontWeight: 600,
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    zIndex: 99,
    transition: "transform 0.2s ease",
  },
};

export default CurvedProjects;
