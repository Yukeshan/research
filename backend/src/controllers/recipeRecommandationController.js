const reverseRecipeSearch =  async (req, res) => {
    const { ingredients, n_results } = req.body;

    if (!ingredients) {
        return res.status(400).json({ error: "No ingredients provided" });
    }

    try {
        // Make a request to the Flask API
        const response = await axios.post("http://127.0.0.1:5000/recommend", {
            ingredients,
            n_results,
        });

        // Send the response back to the frontend
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching recipe recommendations" });
    }
}

  module.exports = {
    reverseRecipeSearch
  };