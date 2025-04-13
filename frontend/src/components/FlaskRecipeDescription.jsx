import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FlaskRecipeDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  useEffect(() => {
    if (!recipe) {
      navigate("/RecipeRecommendation"); // fallback
    } else {
      window.scrollTo(0, 0);
    }
  }, [recipe, navigate]);

  if (!recipe) return null;

  return (
    <section className="min-h-screen bg-eggshell flex justify-center items-center p-6">
      <article className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full">
        <div>
          <img
            src={recipe?.image_url}
            alt={recipe?.TranslatedRecipeName}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
          <div className="space-y-6 text-wenge-brown font-outfit">
            <h1 className="text-4xl font-fancy text-dark-charcoal">{recipe?.TranslatedRecipeName}</h1>

            {/* Who Should Avoid */}
            <article className="bg-rose-white p-6 rounded-xl shadow-md">
              <h3 className="font-fancy text-3xl text-nutmeg">Who Should Avoid</h3>
              <p className="mt-3 text-lg">{recipe?.WhoShouldAvoid}</p>
            </article>

            {/* Cooking Time */}
            <article className="bg-rose-white p-6 rounded-xl shadow-md">
              <h3 className="font-fancy text-3xl text-nutmeg">Cooking Time</h3>
              <p className="mt-3 text-lg">
                <span className="font-semibold">Total: </span>{recipe?.TotalTimeInMins} minutes
              </p>
            </article>

            {/* Ingredients */}
            <article className="bg-rose-white p-6 rounded-xl shadow-md">
              <h3 className="font-fancy text-3xl text-nutmeg">Ingredients</h3>
              <ul className="mt-3 space-y-2 text-lg">
                {recipe?.TranslatedIngredients.split(',').map((ingredient, index) => (
                  <li key={index} className="flex items-center text-dark-raspberry">
                    <span className="mr-2">•</span> {ingredient.trim()}
                  </li>
                ))}
              </ul>
            </article>

            {/* Instructions */}
            <article className="bg-rose-white p-6 rounded-xl shadow-md">
              <h3 className="font-fancy text-3xl text-nutmeg">Instructions</h3>
              <ol className="mt-3 space-y-4 text-lg list-decimal pl-8 text-dark-raspberry">
                {recipe?.TranslatedInstructions.split('.').filter(instruction => instruction.trim() !== "").map((instruction, index) => (
                  <li key={index}>{instruction.trim()}.</li>
                ))}
              </ol>
            </article>

            {/* Nutrition Information */}
            <article className="bg-rose-white p-6 rounded-xl shadow-md">
              <h3 className="font-fancy text-3xl text-nutmeg">Nutrition Information</h3>
              <p className="mt-3 text-lg">{recipe?.NutritionDetails}</p>
            </article>
          </div>
        </div>
      </article>
    </section>
  );
};

export default FlaskRecipeDescription;
