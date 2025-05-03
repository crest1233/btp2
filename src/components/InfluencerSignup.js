import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InfluencerSignup = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [showCustomNiche, setShowCustomNiche] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    const finalData = {
      ...data,
      niche: data.nicheSelect === "Other" ? data.niche : data.nicheSelect,
    };

    try {
      const response = await axios.post(
        "https://backend-26d4.onrender.com/influencer-signup",
        finalData
      );

      if (response.data && response.data.influencerId) {
        reset();
        navigate("/success"); // redirect to success page
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Error: " + (error.response?.data?.error || "Unknown error"));
    }

    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Contact us</h1>
        <p style={styles.description}>
          We're here to help you foster meaningful partnerships and achieve your brand goals with ease.
        </p>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input {...register("name")} style={styles.input} placeholder="John Carter" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input {...register("email")} type="email" style={styles.input} placeholder="example@email.com" />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Phone</label>
              <input {...register("mobile_number")} type="tel" style={styles.input} placeholder="(+91) 456 789 8989" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Niche</label>
              <select
                {...register("nicheSelect")}
                style={styles.input}
                onChange={(e) => setShowCustomNiche(e.target.value === "Other")}
                defaultValue=""
              >
                <option value="" disabled>Select Niche</option>
                <option value="Fashion & Beauty">Fashion & Beauty</option>
                <option value="Lifestyle & Travel">Lifestyle & Travel</option>
                <option value="Food & Cooking">Food & Cooking</option>
                <option value="Tech & Gadgets">Tech & Gadgets</option>
                <option value="Other">Other</option>
              </select>

              {showCustomNiche && (
                <input
                  {...register("niche")}
                  placeholder="Enter your niche"
                  style={{ ...styles.input, marginTop: "1rem" }}
                />
              )}
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Instagram URL</label>
              <input {...register("instagram_link")} style={styles.input} placeholder="https://instagram.com/yourprofile" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Follower Range</label>
              <select {...register("follower_range")} style={styles.input}>
                <option value="">Select Range</option>
                <option value="1K-5K">1K-5K</option>
                <option value="5K-10K">5K-10K</option>
                <option value="10K-50K">10K-50K</option>
                <option value="50K+">50K+</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Engagement Rate (%)</label>
              <input {...register("engagement_rate")} type="number" step="0.01" style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Commercial Rate (INR)</label>
              <input {...register("commercial_rate")} style={styles.input} placeholder="1000-2000" />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Gender Ratio</label>
            <input {...register("gender_ratio")} style={styles.input} placeholder="e.g. 70% Female / 30% Male" />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Dashboard Screenshot URL</label>
            <input {...register("dashboard_screenshot")} style={styles.input} />
          </div>

          <button type="submit" disabled={loading} style={styles.submit}>
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  headerSection: {
    background: "linear-gradient(120deg, #a47dab, #e8def8)",
    textAlign: "center",
    padding: "5rem 2rem 3rem",
  },
  heading: {
    fontSize: "3rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#fff",
  },
  description: {
    maxWidth: "500px",
    margin: "0 auto",
    fontSize: "1rem",
    color: "#f9f9f9",
  },
  formCard: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "4rem 2rem",
    background: "#fff",
    borderRadius: "30px",
    marginTop: "-40px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  row: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
  },
  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "500",
    marginBottom: "0.5rem",
    color: "#333",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa",
    appearance: "none",
  },
  submit: {
    marginTop: "2rem",
    alignSelf: "center",
    background: "#111",
    color: "#fff",
    padding: "1rem 2.5rem",
    border: "none",
    borderRadius: "999px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default InfluencerSignup;
