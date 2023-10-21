import React from "react";
import jadedPrints from "../images/jadedprints.png";
import flowerShop from "../images/flowershop.png";
import coffeeShop from "../images/coffeeshop.png";

const BarCarousel = () => {
  return (
    <div className="w-full bg-primary pt-8 pb-16">
      <h2 className="text-center text-white text-2xl font-bold">Trusted by</h2>
      <div className="flex justify-center gap-12 mt-6 flex-col md:flex-row">
        <img
          src={jadedPrints}
          className="mx-auto md:mx-0 w-64 md:w-auto md:h-24 cursor-pointer md:hover:h-28 duration-200 rounded-lg"
          alt=""
        />
        <img
          src={flowerShop}
          className="mx-auto md:mx-0 w-64 md:w-auto md:h-24 cursor-pointer md:hover:h-28 duration-200 rounded-lg"
          alt=""
        />
        <img
          src={coffeeShop}
          className="mx-auto md:mx-0 w-64 md:w-auto md:h-24 cursor-pointer md:hover:h-28 duration-200 rounded-lg"
          alt=""
        />
      </div>
    </div>
  );
};

export default BarCarousel;
