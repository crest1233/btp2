import React, { useRef } from "react";
import Hero from "./Hero";
import Intro from "./Intro";
import Navbar from "./Navbar";
import StatsSection from "./StatsSection";
import TeamSection from "./TeamSection";
import CurvedProjects from "./CurvedProjects";
import BottomCTA from "./BottomCTA";
import InfluencerSignup from "./InfluencerSignup"; // ✅ import this

const LandingPage = () => {
  const curvedRef = useRef();
  const aboutRef = useRef();

  const scrollToSection = (index) => {
    if (index === 0 && curvedRef.current) {
      curvedRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (index === 2 && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
    
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.bgSection, background: "linear-gradient(120deg, #a47dab, #e8def8)" }}>
        <Navbar onNavigate={scrollToSection} />
        <Hero />
        <Intro />
      </div>

      <div style={styles.whiteWrapper}>
        <div ref={aboutRef}>
          <StatsSection />
        </div>
        <div ref={curvedRef}>
          <CurvedProjects />
        </div>
        <BottomCTA />
        <TeamSection />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    overflowX: "hidden",
    background: "#000",
  },
  bgSection: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    overflow: "hidden",
  },
  whiteWrapper: {
    background: "#fff",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    borderBottomLeftRadius: "40px",
    borderBottomRightRadius: "40px",
    marginTop: "-60px",
    zIndex: 2,
    position: "relative",
  },
};

export default LandingPage;
