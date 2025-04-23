const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "tanishk07",
  database: "InfluencerDB",
};

const pool = mysql.createPool(dbConfig);

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    req.db = await pool.getConnection();
    next();
  } catch (err) {
    console.error("DB connection failed:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// POST: Influencer Signup
app.post("/influencer-signup", async (req, res) => {
  const influencer = req.body;
  influencer.engagement_rate = influencer.engagement_rate || 0.05;

  const sql = `
    INSERT INTO influencers (
      timestamp, name, email, mobile_number, instagram_link, 
      follower_range, niche, engagement_rate, dashboard_screenshot,
      gender_ratio, commercial_rate
    ) VALUES (
      NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `;

  const values = [
    influencer.name,
    influencer.email,
    influencer.mobile_number,
    influencer.instagram_link,
    influencer.follower_range || "1K-5K",
    influencer.niche,
    influencer.engagement_rate,
    influencer.dashboard_screenshot,
    influencer.gender_ratio,
    influencer.commercial_rate,
  ];

  try {
    const [result] = await req.db.execute(sql, values);
    res.json({ message: "Successfully signed up", influencerId: result.insertId });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Error saving influencer data" });
  } finally {
    req.db.release();
  }
});

// POST: Find Influencers (ranked)
app.post("/find-influencers", async (req, res) => {
  const { email, niche } = req.body;
  if (!niche) return res.status(400).json({ error: "Niche is required" });

  try {
    let sql = `
      SELECT * FROM influencers 
      WHERE niche = ?
    `;
    const params = [niche.toLowerCase()];
    if (email) {
      sql += " AND email != ?";
      params.push(email);
    }

    const [rows] = await req.db.execute(sql, params);

    const scored = rows
      .map((inf) => {
        const engagementScore = parseFloat(inf.engagement_rate) * 0.4;
        const followerScore = parseFollowerRange(inf.follower_range) / 100000 * 0.3;
        const priceScore = (10000 - parsePrice(inf.commercial_rate)) / 10000 * 0.3;

        return {
          ...inf,
          score: engagementScore + followerScore + priceScore,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    res.json(scored);
  } catch (err) {
    console.error("Find influencers error:", err);
    res.status(500).json({ error: "Error fetching influencers" });
  } finally {
    req.db.release();
  }
});
// GET: Predict single price by engagement_rate
app.get("/predict-price", async (req, res) => {
  const rate = parseFloat(req.query.engagement_rate);

  if (!rate || isNaN(rate)) {
    return res.status(400).json({ error: "Invalid or missing engagement_rate" });
  }

  try {
    const py = spawn("python3", ["predict_prices.py", rate.toString()]);
    let output = "";
    let error = "";

    py.stdout.on("data", (data) => output += data.toString());
    py.stderr.on("data", (data) => error += data.toString());

    py.on("close", (code) => {
      if (code !== 0) {
        console.error("Python error:", error);
        return res.status(500).json({ error: "Python script failed" });
      }

      try {
        const parsed = JSON.parse(output);
        res.json(parsed);
      } catch (e) {
        console.error("Parse error:", e);
        res.status(500).json({ error: "Failed to parse ML output" });
      }
    });
  } catch (err) {
    console.error("Prediction route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// GET: Outlier Detection (full dataset, ML-powered)
app.get("/outliers", async (req, res) => {
  try {
    const py = spawn("python3", ["predict_from_db.py"]);
    let output = "";
    let error = "";

    py.stdout.on("data", (data) => (output += data.toString()));
    py.stderr.on("data", (data) => (error += data.toString()));

    py.on("close", (code) => {
      if (code !== 0) {
        console.error("Python error:", error);
        return res.status(500).json({ error: "Python script failed" });
      }

      try {
        const parsed = JSON.parse(output);
        res.json(parsed);
      } catch (e) {
        console.error("Parse error:", e);
        res.status(500).json({ error: "Failed to parse outlier result" });
      }
    });
  } catch (err) {
    console.error("Outlier route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Helpers
function parseFollowerRange(range) {
  switch (range) {
    case "1K-5K":
      return 3000;
    case "5K-10K":
      return 7500;
    case "10K-50K":
      return 30000;
    case "50K+":
      return 100000;
    default:
      return 1000;
  }
}

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

// Cleanup
app.use((req, res, next) => {
  if (req.db) req.db.release();
  next();
});

app.listen(5001, () => console.log("✅ Server running on port 5001"));
