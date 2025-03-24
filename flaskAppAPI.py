from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import traceback

# Load dataset
df = pd.read_csv("Food_Dataset.csv")
df['Cleaned_Ingredients'] = df['Cleaned_Ingredients'].astype(str).apply(lambda x: x.lower().replace(',', ' '))

# Load trained model and vectorizer
with open("knn_model.pkl", "rb") as model_file:
    knn = pickle.load(model_file)
with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

def recommend_recipes(ingredients, n_results=5):
    try:
        input_vec = vectorizer.transform([ingredients.lower().replace(',', ' ')])
        distances, indices = knn.kneighbors(input_vec, n_neighbors=n_results)
        results = df.iloc[indices[0]].copy()
        results = results.sort_values(by='Ingredient_count')
        return results[['TranslatedRecipeName', 'TranslatedIngredients', 'TotalTimeInMins', 'Cuisine',
                        'TranslatedInstructions', 'URL', 'Cleaned_Ingredients', 'image_url', 'Ingredient_count',
                        'NutritionDetails', 'AllergenInformation', 'WhoShouldAvoid']].to_dict(orient='records')
    except Exception as e:
        print("Error in recommend_recipes:", traceback.format_exc())
        raise e

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json
        ingredients = data.get("ingredients", "")
        n_results = data.get("n_results", 5)
        
        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400
        
        recommendations = recommend_recipes(ingredients, n_results)
        return jsonify(recommendations)
    except Exception as e:
        print("Error in /api/recommend:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5025)

