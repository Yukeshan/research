import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setPrediction('');
        setError('');
    };

    const handleImageUpload = async () => {
        if (!image) {
            setError('Please select an image');
            return;
        }

        const formData = new FormData();
        formData.append('file', image);

        setLoading(true);
        try {
            // Make the request to the Flask backend
            const response = await axios.post('http://127.0.0.1:5075/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure Content-Type is set correctly
                },
            });

            // Assuming the Flask API returns a 'prediction' field
            setPrediction(response.data.prediction);
        } catch (err) {
            console.error('Error uploading image:', err);

            // Check if error has response (i.e., backend error)
            if (err.response) {
                setError(`Error: ${err.response.data.error || 'Unknown error from backend'}`);
            } else {
                setError('Error uploading image. Please check the network connection or try again later.');
            }
        } finally {
            setLoading(false); // Ensure loading state is reset regardless of success or failure
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Upload an Image for Prediction</h2>

            <input
                type="file"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-gray-50 file:text-gray-700 file:cursor-pointer mb-4"
            />

            <button
                onClick={handleImageUpload}
                disabled={loading}
                className={`w-full py-2 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
            >
                {loading ? 'Uploading...' : 'Upload Image'}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {prediction && (
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-800">Prediction:</h3>
                    <p className="text-xl font-semibold text-blue-600">{prediction}</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
