# predict_from_db.py
import pandas as pd
import joblib
import json

# Load model
model = joblib.load("model.pkl")

# Load dataset
df = pd.read_csv("influencer_data.csv")

# Ensure required columns
if "engagement_rate" not in df.columns or "commercial_rate" not in df.columns:
    raise ValueError("Missing required columns")

# Predict price
df["predicted_price"] = model.predict(df[["engagement_rate"]])
df["is_outlier"] = df["commercial_rate"] > df["predicted_price"] * 1.5

# Output results as JSON
print(json.dumps(df.to_dict(orient="records")))
