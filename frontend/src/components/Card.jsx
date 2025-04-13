import React from "react";
import ClockImg from "../assets/clock.svg";
import { Link } from "react-router-dom";

const Card = ({ item, showIngredientCount = false }) => {
  const categoryStyles = {
    Entrees: { backgroundColor: "#f0f5c4", color: "#59871f" },
    Breakfast: { backgroundColor: "#efedfa", color: "#3c3a8f" },
    Lunch: { backgroundColor: "#e5f7f3", color: "#1f8787" },
    Desserts: { backgroundColor: "#e8f5fa", color: "#397a9e" },
    Sides: { backgroundColor: "#feefc9", color: "#d16400" },
    Drinks: { backgroundColor: "#ffeae3", color: "#f0493e" },
    default: { backgroundColor: "#fff", color: "#000" },
  };

  const getCategoryStyle = (category) => {
    return categoryStyles[category] || categoryStyles.default;
  };

  const categoryStyle = getCategoryStyle(item?.category || item?.Cuisine);

  const getIngredientCount = () => {
    if (!item?.TranslatedIngredients) return "0 Ingredients";
    const count = item.TranslatedIngredients.split(",").filter(Boolean).length;
    return `${count} Ingredient${count > 1 ? "s" : ""}`;
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-lg hover:shadow-xl transition duration-500 rounded-lg flex flex-col h-[450px]">
        <img
          className="h-48 w-full object-cover rounded-t-lg"
          src={item?.image_url}
          alt={item?.TranslatedRecipeName}
        />
        <div className="py-4 px-5 flex flex-col justify-between flex-grow">
          <Link to={item._id ? `/items/${item._id}` : `/flask-recipe`} state={item._id ? null : { recipe: item }}>
            <h1 className="text-gray-700 font-bold text-xl mb-4 hover:text-gray-900 hover:cursor-pointer line-clamp-2">
              {item?.TranslatedRecipeName}
            </h1>
          </Link>

          <div className="flex justify-between items-center mt-auto">
            {showIngredientCount ? (
              <button className="py-2 px-4 font-medium rounded-lg shadow-md text-sm bg-gray-100 text-gray-700">
                {getIngredientCount()}
              </button>
            ) : (
              <button
                className="py-2 px-4 font-medium rounded-lg shadow-md text-sm"
                style={{
                  backgroundColor: categoryStyle.backgroundColor,
                  color: categoryStyle.color,
                }}
              >
                {item?.category || item?.Cuisine}
              </button>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <img src={ClockImg} loading="lazy" alt="" className="h-4 w-4 mr-1" />
              {item?.TotalTimeInMins} Minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
