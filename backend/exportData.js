// exportData.js
const fs = require("fs");
const mysql = require("mysql2/promise");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "tanishk07",
  database: "InfluencerDB",
};

(async () => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute(`
    SELECT engagement_rate, commercial_rate FROM influencers
    WHERE engagement_rate IS NOT NULL AND commercial_rate IS NOT NULL
  `);

  const cleaned = rows.filter(r => !isNaN(r.engagement_rate) && /^\d+/.test(r.commercial_rate));
  const data = cleaned.map(r => ({
    engagement_rate: parseFloat(r.engagement_rate),
    commercial_rate: parseFloat(r.commercial_rate.match(/\d+/)[0]),
  }));

  const csvWriter = createCsvWriter({
    path: "influencer_data.csv",
    header: [
      { id: "engagement_rate", title: "engagement_rate" },
      { id: "commercial_rate", title: "commercial_rate" },
    ],
  });

  await csvWriter.writeRecords(data);
  console.log("✅ Data exported to influencer_data.csv");
  process.exit();
})();
