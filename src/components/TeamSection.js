// src/components/TeamSection.js
import React from "react";
import AditriImg from "../assets/aditri.jpg";
import TanishkImg from "../assets/tanishk.jpg";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
const team = [
  {
    name: "Aditri Paweria",
    image: AditriImg,
    socials: [
        { icon: <FaInstagram />, url: "https://www.instagram.com/aditripaweria/" },
        { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/aditri-paweria-91265a258/" },
      ],
  },
  {
    name: "Tanishk Singh",
    image: TanishkImg,
    socials: [
        { icon: <FaInstagram />, url: "https://instagram.com/tanishk" },
        { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/tanishk-singh-623842276/" },
      ],
  },
];

const TeamSection = () => (
  <section style={styles.section}>
    <div style={styles.wrapper}>
      <h3 style={styles.heading}>OUR TEAM</h3>

      {team.map((member, idx) => (
        <div key={idx} style={styles.member}>
          <div style={styles.left}>
            <img src={member.image} alt={member.name} style={styles.avatar} />
            <p style={styles.name}>{member.name}</p>
          </div>

          <div style={styles.socials}>
  {member.socials.map((social, i) => (
    <a
      key={i}
      href={social.url}
      target="_blank"
      rel="noreferrer"
      style={styles.icon}
    >
      {social.icon}
    </a>
  ))}
</div>

        </div>
      ))}
    </div>
  </section>
);

const styles = {
    section: {
      width: "100%",
      background: "#fff",
      borderBottomLeftRadius: "40px",
      borderBottomRightRadius: "40px",
      padding: "5rem 2rem",
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      width: "100%",
      maxWidth: "1200px",
    },
    heading: {
      textAlign: "center",
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#111",
      letterSpacing: "1.5px",
      marginBottom: "3rem",
      marginTop: "2rem",
      textTransform: "uppercase",
    },
    member: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.5rem 0",
      borderTop: "1px solid #eee",
    },
    left: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    avatar: {
      width: "64px",
      height: "64px",
      borderRadius: "16px",
      objectFit: "cover",
    },
    name: {
      fontSize: "1.1rem",
      fontWeight: 500,
      margin: 0,
      color: "#111",
    },
    socials: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    icon: {
      width: "32px",
      height: "32px",
      borderRadius: "999px",
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    icon: {
        width: "32px",
        height: "32px",
        borderRadius: "999px",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        color: "#333",
        cursor: "pointer",
        textDecoration: "none",
        transition: "all 0.2s ease",
      },
      
  };
  
export default TeamSection;
