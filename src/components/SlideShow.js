// src/components/SlideShow.js
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectSlide from "./ProjectSlide";

const slides = [
    {
      title: "CREATORS THAT CONVERT",
      subtitle: "Partner with authentic influencers who drive real engagement and results.",
      image: "https://images.unsplash.com/photo-1629116189848-153bfcb790ba?auto=format&fit=crop&w=1600&q=80",
      tags: ["Influencer", "Content", "Authenticity"],
    },
    {
      title: "BRAND STORIES THAT SCALE",
      subtitle: "We help brands tell better stories through trusted creator collaborations.",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b9c70bdf?auto=format&fit=crop&w=1600&q=80",
      tags: ["Branding", "Strategy", "Campaigns"],
    },
  ];
  
  
const SlideShow = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((i) => (i + 1) % slides.length);
  const prevSlide = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence exitBeforeEnter>
        <ProjectSlide key={index} {...slides[index]} />
      </AnimatePresence>

      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, display: "flex", justifyContent: "space-between", padding: "2rem" }}>
        <button onClick={prevSlide} style={navBtn}>←</button>
        <button onClick={nextSlide} style={navBtn}>→</button>
      </div>
    </div>
  );
};

const navBtn = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  padding: "1rem 1.5rem",
  fontSize: "1.5rem",
  cursor: "pointer",
  opacity: 0.7,
};

export default SlideShow;
