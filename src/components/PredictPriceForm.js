import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";

const PredictPriceForm = () => {
  const { register, handleSubmit } = useForm();
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const engagementRate = parseFloat(data.engagement_rate);
      const followers = parseInt(data.followers, 10);

      let rate;

      if (followers < 10000) {
        // Nano-influencers
        rate = 1000 + engagementRate * 9000; // ₹1,000 to ₹10,000
      } else if (followers < 50000) {
        // Micro-influencers
        rate = 10000 + engagementRate * 40000; // ₹10,000 to ₹50,000
      } else if (followers < 100000) {
        // Mid-tier influencers
        rate = 50000 + engagementRate * 450000; // ₹50,000 to ₹500,000
      } else if (followers < 500000) {
        // Macro-influencers
        rate = 500000 + engagementRate * 500000; // ₹500,000 to ₹1,000,000
      } else {
        // Mega-influencers
        rate = 1000000 + engagementRate * 1000000; // ₹1,000,000+
      }

      setPredictedPrice(Math.round(rate));
    } catch (err) {
      console.error("Prediction failed", err);
      setPredictedPrice("Error");
    }
    setLoading(false);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />

      {/* Header Section */}
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Predict Your Commercial Rate</h1>
        <p style={styles.description}>
          Enter your details and we’ll use our ML model to estimate your rate.
        </p>
      </div>

      {/* Form Section */}
      <div style={styles.formCard}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                {...register("name")}
                style={styles.input}
                placeholder="John Carter"
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                {...register("email")}
                type="email"
                style={styles.input}
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Number of Followers</label>
              <input
                {...register("followers")}
                type="number"
                style={styles.input}
                placeholder="e.g. 15000"
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Engagement Rate (%)</label>
              <input
                {...register("engagement_rate")}
                type="number"
                step="0.001"
                style={styles.input}
                placeholder="e.g. 0.042"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.submit}>
            {loading ? "Predicting..." : "Predict Now"}
          </button>
        </form>

        {predictedPrice !== null && (
          <div style={styles.result}>
            <h3>🎯 Predicted Price:</h3>
            <p style={styles.price}>₹ {predictedPrice}</p>
          </div>
        )}
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
  result: {
    marginTop: "2rem",
    textAlign: "center",
    color: "#333",
  },
  price: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#4caf50",
    marginTop: "0.5rem",
  },
};

export default PredictPriceForm;
