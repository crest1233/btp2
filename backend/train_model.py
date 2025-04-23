import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Load and debug
df = pd.read_csv("influencer_data.csv")
print("Columns:", df.columns)
print("Sample:", df.head())

# Check required columns exist
if "engagement_rate" not in df.columns or "commercial_rate" not in df.columns:
    raise ValueError("Required columns missing in influencer_data.csv")

# Train model
X = df[["engagement_rate"]]
y = df["commercial_rate"]
model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "model.pkl")
print("✅ Model trained and saved as model.pkl")
