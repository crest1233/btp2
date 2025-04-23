# predict_single_price.py
import sys
import json
import joblib

model = joblib.load("model.pkl")
engagement = float(sys.argv[1])
predicted = model.predict([[engagement]])[0]
print(json.dumps({ "predicted_price": round(predicted) }))
