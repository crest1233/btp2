import React, { useState, useEffect } from "react"; // ✅ All imports first
import { useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const FindInfluencersByEmail = () => {
  const { register, handleSubmit } = useForm();

  // ✅ useState inside component
  const [showCustomNiche, setShowCustomNiche] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outliers, setOutliers] = useState([]);



  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
  
    try {
      const finalData = {
        email: data.email,
        niche: data.nicheSelect === "Other" ? data.niche : data.nicheSelect,
      };
  
      // 👇 Fake data while backend is unavailable
      const fakeResponse = [
        { name: "Ayesha Khan", followers: 120000, rate: "₹5,000" },
        { name: "Rohan Mehta", followers: 95000, rate: "₹4,200" },
      ];
      setInfluencers(fakeResponse);
  
      // 👇 Comment this out if deploying frontend only
      // const response = await axios.post("http://localhost:5001/find-influencers", finalData);
      // setInfluencers(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  
    setLoading(false);
  };
  

  const parseFollower = (range) => {
    switch (range) {
      case "1K-5K": return 3000;
      case "5K-10K": return 7500;
      case "10K-50K": return 30000;
      case "50K+": return 100000;
      default: return 1000;
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:5001/outliers")
      .then((res) => {
        const top5 = res.data
          .filter(i => i.is_outlier)
          .sort((a, b) => (b.commercial_rate - b.predicted_price) - (a.commercial_rate - a.predicted_price))
          .slice(0, 5);
        setOutliers(top5);
      })
      .catch((err) => {
        console.error("Failed to fetch outliers", err);
      });
  }, []);
  

  const parsePrice = (priceStr) => {
    if (!priceStr) return 10000;
    const match = priceStr.match(/\d+/);
    return match ? parseInt(match[0]) : 10000;
  };

  const engagementTop = [...influencers]
    .sort((a, b) => b.engagement_rate - a.engagement_rate)
    .slice(0, 3);

  const followersTop = [...influencers]
    .sort((a, b) => parseFollower(b.follower_range) - parseFollower(a.follower_range))
    .slice(0, 3);

  const priceTop = [...influencers]
    .sort((a, b) => parsePrice(a.commercial_rate) - parsePrice(b.commercial_rate))
    .slice(0, 3);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />

      {/* Header Section */}
      <div style={styles.headerSection}>
        <h1 style={styles.heading}>Find Top Influencers</h1>
        <p style={styles.description}>
          Let us help you discover the most suitable creators for your niche.
        </p>
      </div>

      {/* Form Section */}
      <div style={styles.formCard}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="example@email.com"
                style={styles.input}
              />
            </div>
            
<div style={styles.field}>
  <label style={styles.label}>Niche</label>
  <select
  {...register("nicheSelect", { required: true })}
  onChange={(e) => setShowCustomNiche(e.target.value === "Other")}
  style={styles.select}
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
  <div style={styles.field}>
    <label style={styles.label}>Custom Niche</label>
    <input
      {...register("niche")}
      placeholder="Enter your niche"
      style={styles.input}
    />
  </div>
)}

</div>

          </div>

          <button type="submit" style={styles.submit} disabled={loading}>
            {loading ? "Searching..." : "Find Influencers"}
          </button>
        </form>

        {/* Feedback */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Visualizations */}
        {influencers.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h3 style={styles.chartTitle}>Top 3 by Engagement Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={engagementTop}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement_rate" fill="#a47dab" />
              </BarChart>
            </ResponsiveContainer>

            


            <h3 style={styles.chartTitle}>Top 3 by Price (lower is better)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={priceTop.map(i => ({
                  ...i,
                  price: parsePrice(i.commercial_rate)
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis reversed />
                <Tooltip />
                <Bar dataKey="price" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
            <h3 style={styles.chartTitle}>Top 3 by Followers</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={followersTop.map(i => ({
                  ...i,
                  followers: parseFollower(i.follower_range)
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="followers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            {outliers.length > 0 && (
  <>
    <h3 style={styles.chartTitle}>🔥 Top 5 Most Overpriced Influencers</h3>
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={outliers.map((i) => ({
          name: i.name,
          actual: i.commercial_rate,
          predicted: i.predicted_price,
        }))}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          angle={-30}
          textAnchor="end"
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="actual" fill="#ff4d4f" name="Actual Price" />
        <Bar dataKey="predicted" fill="#82ca9d" name="Predicted Price" />
      </BarChart>
    </ResponsiveContainer>
  </>
)}


            {/* Final Top 3 by Weighted Score */}
            <ul style={styles.finalList}>
  {[...influencers]
    .sort((a, b) => {
      const scoreA =
        (parseFloat(a.engagement_rate) * 0.4) +
        (parseFollower(a.follower_range) / 100000 * 0.3) +
        ((10000 - parsePrice(a.commercial_rate)) / 10000 * 0.3);
      const scoreB =
        (parseFloat(b.engagement_rate) * 0.4) +
        (parseFollower(b.follower_range) / 100000 * 0.3) +
        ((10000 - parsePrice(b.commercial_rate)) / 10000 * 0.3);
      return scoreB - scoreA;
    })
    .slice(0, 3)
    .map((inf, index) => {
      const finalScore =
        (parseFloat(inf.engagement_rate) * 0.4) +
        (parseFollower(inf.follower_range) / 100000 * 0.3) +
        ((10000 - parsePrice(inf.commercial_rate)) / 10000 * 0.3);

      return (
        <li key={index} style={styles.finalItem}>
          <div style={styles.cardHeader}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={styles.influencerName}>{inf.name}</strong>
              <span style={styles.scoreText}>Score: <span style={styles.score}>{finalScore.toFixed(2)}</span></span>
            </div>
            <button
              onClick={() => setInfluencers((prev) =>
                prev.map((i, idx) =>
                  idx === influencers.indexOf(inf) ? { ...i, showInfo: !i.showInfo } : i
                )
              )}
              style={styles.moreBtn}
            >
              {inf.showInfo ? "Hide Info" : "More Info"}
            </button>
          </div>

          {inf.showInfo && (
            <div style={styles.infoBox}>
              <p><b>Email:</b> {inf.email}</p>
              <p><b>Phone:</b> {inf.mobile_number}</p>
              <p><b>Instagram:</b>{" "}
                <a href={inf.instagram_link} target="_blank" rel="noreferrer" style={styles.link}>
                  {inf.instagram_link}
                </a>
              </p>
              <p><b>Engagement Rate:</b> {inf.engagement_rate}%</p>
              <p><b>Commercial Rate:</b> ₹{inf.commercial_rate}</p>
              <p><b>Gender Ratio:</b> {inf.gender_ratio}</p>
            </div>
          )}
        </li>
      );
    })}
</ul>


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
  error: {
    color: "red",
    marginTop: "1rem",
    textAlign: "center",
  },
  chartTitle: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
    marginTop: "3rem",
    textAlign: "center",
    color: "#333",
  },
  finalList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
    textAlign: "center",
    color: "#333",
  },
  finalItem: {
    margin: "1rem auto",
    fontSize: "1.1rem",
    background: "#f9f9f9",
    borderRadius: "12px",
    padding: "1rem",
    maxWidth: "500px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  score: {
    fontWeight: 600,
    color: "#000",
  },
  finalList: {
    listStyle: "none",
    padding: 0,
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  
  finalItem: {
    background: "#fdfdfd",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    padding: "1.5rem 2rem",
    transition: "all 0.3s ease",
  },
  
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  
  influencerName: {
    fontSize: "1.3rem",
    fontWeight: 600,
    color: "#222",
  },
  
  scoreText: {
    fontSize: "0.95rem",
    color: "#666",
    marginTop: "0.2rem",
  },
  
  moreBtn: {
    background: "#a47dab",
    color: "#fff",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "999px",
    fontSize: "0.85rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  
  infoBox: {
    marginTop: "1rem",
    background: "#f4f0fa",
    borderRadius: "12px",
    padding: "1rem 1.5rem",
    lineHeight: "1.6",
    fontSize: "0.95rem",
    color: "#333",
  },
  
  link: {
    color: "#6a4c93",
    textDecoration: "underline",
    wordBreak: "break-all",
  },
  input: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa",
  },
  
  select: {
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa",
    appearance: "none", // smoothens look across browsers
    WebkitAppearance: "none",
    MozAppearance: "none",
  },
  
  
};


export default FindInfluencersByEmail;
