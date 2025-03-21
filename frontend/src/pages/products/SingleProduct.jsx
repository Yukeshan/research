import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleProduct = () => {
    const item =  useLoaderData();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    console.log(item)

    
  return (
    <section className="min-h-dvh md:flex justify-center items-center md:bg-eggshell">
    <article>
      <div
        className="bg-[#fff] md:my-[5rem] md:py-8 pb-8 md:rounded-xl"
      >
        <picture>
          <img
            src={item?.image_url}
            alt="Photo of an omelette with vegetables on a plate"
            className="md:max-w-[90%] w-full md:h-[570px] md:mx-auto md:rounded-xl"
          />
        </picture>
        <div className="px-8 font-outfit text-wenge-brown">
          <h1 className="font-fancy text-4xl mt-12 text-dark-charcoal">
            {item?.TranslatedRecipeName}
          </h1>
          <article className="bg-rose-white mt-6 p-5 rounded-xl">
          <h3 className="font-fancy text-3xl text-nutmeg">Who Should Avoid</h3>
            <ul className="list-disc mt-3 ml-8 text-lg marker:text-dark-raspberry">
              <li className="pl-3">
                <p>
                  <span className="font-semibold"></span> <span>{item?.WhoShouldAvoid}</span>
                </p>
              </li>

            </ul>
          </article>
          <article className="bg-rose-white mt-6 p-5 rounded-xl">
          <h3 className="font-fancy text-3xl text-nutmeg">Cooking Time</h3>
            <ul className="list-disc mt-3 ml-8 text-lg marker:text-dark-raspberry">
              <li className="pl-3">
                <p>
                  <span className="font-semibold">Total: </span> <span>{item?.TotalTimeInMins}</span> minutes
                </p>
              </li>

            </ul>
          </article>
          <article className="bg-rose-white mt-6 p-5 rounded-xl">
          <h3 className="font-fancy text-3xl text-nutmeg">Ingredients</h3>
            <ul className="list-disc mt-3 ml-8 text-lg marker:text-dark-raspberry">
              <li className="pl-3">
                <p>
                  <span className="font-semibold"></span> Number of ingredients : <span>{item?.Ingredient_count}</span>
                </p>
              </li>
              <li className="pl-3">
                <p>
                  <span className="font-semibold"></span> all Ingredients : <span>{item?.TranslatedIngredients}</span>
                </p>
              </li>

            </ul>
          </article>
          <div className="w-full h-px bg-light-gray mx-auto mt-8"></div>
          <article className="bg-rose-white mt-6 p-5 rounded-xl">
          <h3 className="font-fancy text-3xl text-nutmeg">Instructions</h3>
            <ul className="list-disc mt-3 ml-8 text-lg marker:text-dark-raspberry">
              <li className="pl-3">
                <p>
                  <span className="font-semibold"></span> <span>{item?.TranslatedInstructions}</span>
                </p>
              </li>

            </ul>
          </article>
          <div className="w-full h-px bg-light-gray mx-auto mt-8"></div>
          <article className="bg-rose-white mt-6 p-5 rounded-xl">
          <h3 className="font-fancy text-3xl text-nutmeg">Nutrition Information</h3>
            <ul className="list-disc mt-3 ml-8 text-lg marker:text-dark-raspberry">
              <li className="pl-3">
                <p>
                  <span className="font-semibold"></span> <span>{item?.NutritionDetails}</span>
                </p>
              </li>

            </ul>
          </article>
        </div>
      </div>
    </article>
  </section>
  )
}

export default SingleProduct