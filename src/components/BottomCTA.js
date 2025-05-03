import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PredictPriceForm = () => {
  const { register, handleSubmit } = useForm();
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setPredictedPrice(null);

    try {
      const engagementRate = parseFloat(data.engagement_rate);
      const followers = parseInt(data.followers, 10);

      let rate;

      if (followers < 10000) {
        rate = 1000 + engagementRate * 9000;
      } else if (followers < 50000) {
        rate = 10000 + engagementRate * 40000;
      } else if (followers < 100000) {
        rate = 50000 + engagementRate * 450000;
      } else if (followers < 500000) {
        rate = 500000 + engagementRate * 500000;
      } else {
        rate = 1000000 + engagementRate * 1000000;
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
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Predict Your Commercial Rate</h1>
        <p style={styles.description}>
          Based on your follower count and engagement rate, we’ll estimate your ideal price.
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

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Followers</label>
              <input
                {...register("followers")}
                type="number"
                placeholder="e.g. 20000"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Engagement Rate (%)</label>
              <input
                {...register("engagement_rate")}
                type="number"
                step="0.01"
                placeholder="e.g. 2.5"
                style={styles.input}
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
            <h3>🎯 Estimated Commercial Rate</h3>
            <p style={styles.price}>₹ {(predictedPrice / 3).toLocaleString("en-IN")}</p>

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
