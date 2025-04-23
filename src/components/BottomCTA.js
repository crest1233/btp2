// src/pages/PredictPriceForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

const PredictPriceForm = () => {
  const { register, handleSubmit } = useForm();
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setPredictedPrice(null);
  
    try {
      // 👇 Simulate result (frontend-only mode)
      // Remove this if backend is available
      const fakePrediction = (parseFloat(data.engagement_rate || 0) * 1000).toFixed(2);
      setPredictedPrice(fakePrediction);
  
      // 👇 This would be real backend call, comment it out for now
      // const res = await axios.get(
      //   `http://localhost:5001/predict-price?engagement_rate=${data.engagement_rate}`
      // );
      // setPredictedPrice(res.data.predicted_price);
    } catch (err) {
      console.error("Prediction failed", err);
      setPredictedPrice("Error");
    }
  
    setLoading(false);
  };
  

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
     
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Predict Your Commercial Rate</h1>
        <p style={styles.description}>
          Enter your engagement rate to see what you could be charging.
        </p>
      </div>

      <div style={styles.formCard}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input {...register("name")} style={styles.input} placeholder="John Doe" required />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input {...register("email")} type="email" style={styles.input} required />
            </div>
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

          <button type="submit" disabled={loading} style={styles.submit}>
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>

        {predictedPrice !== null && (
  <div style={styles.result}>
    <h3 style={{ color: "#000" }}>🎯 Predicted Commercial Rate:</h3>
    <p style={styles.price}>₹ {(predictedPrice / 10).toFixed(2)}</p>
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
    fontSize: "2.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#fff",
  },
  description: {
    fontSize: "1rem",
    color: "#f9f9f9",
  },
  formCard: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "3rem 2rem",
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
  },
  price: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#4caf50",
  },
};

export default PredictPriceForm;
