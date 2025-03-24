from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import traceback  # Import for detailed error reporting

app = Flask(__name__)

# Load the trained model
MODEL_PATH = "fruit_vegetable_classifier.h5"  # Update with your model path
model = load_model(MODEL_PATH)

# Define the same class labels used during training
CLASS_LABELS = ["healthy apple", "rotten banana", "healthy orange", "rotten orange"]  # Update with your actual class names

# Function to preprocess the uploaded image
def preprocess_image(img_path, img_size=(150, 150)):
    try:
        img = image.load_img(img_path, target_size=img_size)  # Resize image
        img_array = image.img_to_array(img) / 255.0  # Normalize
        img_array = np.expand_dims(img_array, axis=0)  # Reshape for model input
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if the file is part of the request
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        # If no file is selected
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Save the uploaded file
        file_path = "temp_image.jpg"
        file.save(file_path)

        # Preprocess and predict
        img_array = preprocess_image(file_path)
        if img_array is None:
            return jsonify({"error": "Image preprocessing failed"}), 500
        
        prediction = model.predict(img_array)
        predicted_class = CLASS_LABELS[np.argmax(prediction)]  # Get highest probability class

        # Remove the temporary file after prediction
        os.remove(file_path)

        return jsonify({"prediction": predicted_class})

    except Exception as e:
        print("An error occurred while processing the request:")
        print(str(e))
        print(traceback.format_exc())  # Print the full traceback for detailed error logging
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5075)
