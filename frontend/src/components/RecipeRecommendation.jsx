import React, { useState } from 'react';
import axios from 'axios';
import Card from '../components/Card'; // Make sure the path is correct

function RecipeRecommendation() {
  const [ingredients, setIngredients] = useState('');
  const [nResults, setNResults] = useState(5);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!ingredients.trim()) {
      setError('Please provide some ingredients.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5025/api/recommend', {
        ingredients,
        n_results: nResults,
      });
      setRecommendations(response.data);
    } catch (err) {
      setError('Error fetching recipe recommendations');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">🍽️ Get Recipe Recommendations</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Ingredients (comma separated):</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              placeholder="e.g. onion, tomato, egg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Results:</label>
            <input
              type="number"
              value={nResults}
              onChange={(e) => setNResults(Number(e.target.value))}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              min="1"
              max="10"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-4 text-white bg-green-500 rounded-xl hover:bg-green-600 text-lg font-semibold transition duration-300 shadow-md"
            >
              🍳 Get Recipes
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 text-center mt-6 font-semibold">{error}</p>}

        {recommendations.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((recipe, index) => (
              <Card key={index} item={recipe} showIngredientCount />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeRecommendation;
