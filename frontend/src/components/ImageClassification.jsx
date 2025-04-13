import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
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
      const response = await axios.post('http://127.0.0.1:5075/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error('Error uploading image:', err);
      if (err.response) {
        setError(`Error: ${err.response.data.error || 'Unknown error from backend'}`);
      } else {
        setError('Error uploading image. Please check the network connection or try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Freshness Detection</h2>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 w-full"
        />

        {preview && (
          <img
            src={preview}
            alt="Selected preview"
            className="w-full max-h-64 object-contain rounded-md border border-gray-300 shadow-sm"
          />
        )}

        <button
          onClick={handleImageUpload}
          disabled={loading}
          className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Uploading...
            </div>
          ) : (
            'Upload Image'
          )}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {prediction && (
          <div className="w-full mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow text-center">
            <h3 className="text-lg font-medium text-green-800">Prediction Result</h3>
            <p className="text-xl font-bold text-green-700 mt-2">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
