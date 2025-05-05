import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import Intro from "./Intro";
import Navbar from "./Navbar";
import StatsSection from "./StatsSection";
import TeamSection from "./TeamSection";
import CurvedProjects from "./CurvedProjects";
import BottomCTA from "./BottomCTA";
import InfluencerSignup from "./InfluencerSignup";

const LandingPage = () => {
  const curvedRef = useRef();
  const aboutRef = useRef();
  const location = useLocation();

  const scrollToSection = (index) => {
    if (index === 0 && curvedRef.current?.scrollToSection) {
      curvedRef.current.scrollToSection(0);
    }
    if (index === 1 && curvedRef.current?.scrollToSection) {
      curvedRef.current.scrollToSection(1);
    }
    if (index === 2 && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo !== undefined) {
      scrollToSection(location.state.scrollTo);
    }
  }, [location.state]);

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
        <CurvedProjects ref={curvedRef} />
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
