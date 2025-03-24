from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import logging

app = Flask(__name__)

# Enable CORS for all routes (or for a specific route)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})  # Allow CORS only from React app

# Set up basic logging
logging.basicConfig(level=logging.DEBUG)

# Load the trained model
MODEL_PATH = "fruit_vegetable_classifier.h5"  # Update with your model path
model = load_model(MODEL_PATH)

# Define the same class labels used during training
CLASS_LABELS = ["healthy apple", "rotten banana", "healthy orange", "rotten orange"]  # Update with your actual class names

# Function to preprocess the uploaded image
def preprocess_image(img_path, img_size=(150, 150)):
    img = image.load_img(img_path, target_size=img_size)  # Resize image
    img_array = image.img_to_array(img) / 255.0  # Normalize
    img_array = np.expand_dims(img_array, axis=0)  # Reshape for model input
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    # Log the incoming request
    app.logger.debug("Received request to /predict")

    # Check if the file is part of the request
    if 'file' not in request.files:
        app.logger.error("No file part in the request")
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    # If no file is selected
    if file.filename == '':
        app.logger.error("No selected file")
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save the uploaded file
        file_path = "temp_image.jpg"
        file.save(file_path)

        # Log the file save operation
        app.logger.debug(f"File saved at {file_path}")

        # Preprocess and predict
        img_array = preprocess_image(file_path)
        prediction = model.predict(img_array)
        predicted_class = CLASS_LABELS[np.argmax(prediction)]  # Get highest probability class

        # Log the prediction
        app.logger.debug(f"Prediction made: {predicted_class}")

        # Remove the temporary file after prediction
        os.remove(file_path)

        return jsonify({"prediction": predicted_class})
    
    except Exception as e:
        # Log the error
        app.logger.error(f"Error occurred: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5075)
