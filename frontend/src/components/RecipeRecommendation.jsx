import React, { useState } from 'react';
import axios from 'axios';

function RecipeRecommendation() {
  const [ingredients, setIngredients] = useState('');
  const [nResults, setNResults] = useState(5);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error

    if (!ingredients.trim()) {
      setError('Please provide some ingredients.');
      return;
    }

    try {
      // Send the request to the backend API
      const response = await axios.post('http://localhost:5025/api/recommend', {
        ingredients,
        n_results: nResults,
      });

      // Assuming the backend returns an array of recipes sorted by Ingredient_count
      setRecommendations(response.data);
    } catch (err) {
      setError('Error fetching recipe recommendations');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Recipe Recommendations
      </h2>

      {/* Recipe search form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="text-lg text-gray-700 mb-2">
            Ingredients (comma separated):
          </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. onion, tomato, egg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-700 mb-2">
            Number of Results:
          </label>
          <input
            type="number"
            value={nResults}
            onChange={(e) => setNResults(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="10"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
        >
          Get Recipes
        </button>
      </form>

      {/* Display error if any */}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {/* Display the recipe recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendations.map((recipe, index) => (
            <div className="bg-white p-6 rounded-lg shadow-md" key={index}>
              <img
                src={recipe.image_url}
                alt={recipe.TranslatedRecipeName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600">
                {recipe.TranslatedRecipeName}
              </h3>
              <p><strong>Ingredients:</strong> {recipe.TranslatedIngredients}</p>
              <p><strong>Total Time:</strong> {recipe.TotalTimeInMins} mins</p>
              <p><strong>Cuisine:</strong> {recipe.Cuisine}</p>
              <p><strong>Instructions:</strong> {recipe.TranslatedInstructions}</p>
              <a
                href={recipe.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 mt-2 inline-block font-bold"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipeRecommendation;
