import React from "react";
import featuredImg from "../../assets/featured.webp";

const FeaturedSection = () => {
  return (
    <div className="overflow-hidden flex flex-col md:flex-row justify-between items-center sm:my-20 my-10 md:gap-20 gap-12 px-5 xl:px-10">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2">
        <div className="absolute top-4 left-4 bg-white text-secondary px-4 py-1 text-sm font-semibold rounded-md uppercase shadow-md tracking-wider">
          Featured Recipe
        </div>
        <img
          src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Shaheen_Ali/CHETTINAD_STYLE_PRAWN_BIRYANI.jpg"
          alt="Featured Recipe"
          className="w-full h-auto rounded-2xl shadow-xl object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="text-start w-full md:w-1/2">
        <h2 className="text-4xl sm:text-5xl font-bold text-secondary leading-snug mb-4">
        Chettinad Style Prawn Biryani
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
        Just dive into the taste of Asian recipes. This traditional South Indian biryani features juicy prawns and a vibrant, homemade spice blend. Get Cooking!
        </p>
      </div>
    </div>
  );
};

export default FeaturedSection;
