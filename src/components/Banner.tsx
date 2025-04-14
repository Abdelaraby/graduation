import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Required CSS
import "slick-carousel/slick/slick-theme.css"; // Required CSS

// Import images directly
import banner1 from "../assets/banner1.jpg"; // Adjust the path based on your folder structure
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const bannerData = [
  {
    title: "Discover the Best Fashion Collection",
    middleText: "Limited Time Offer",
    subtitle: "The High-Quality Collection",
    background: banner1, // Use imported image
  },
  {
    title: "Explore New Trends This Season",
    middleText: "Shop the Latest Styles",
    subtitle: "Exclusive Offers Await",
    background: banner2,
  },
  {
    title: "Upgrade Your Wardrobe Now",
    middleText: "New Arrivals Daily",
    subtitle: "Latest Styles Just for You",
    background: banner3,
  },
];

const Banner = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };

   
  return (
    <Slider ref={sliderRef} {...settings} key={bannerData.length}>
      {bannerData.map((banner, index) => (
         <div
         key={index}
         className={`w-full flex flex-col justify-end items-center max-sm:h-[550px] max-sm:gap-2 ${
           index == 0 ? "banner-1" : index == 1 ? "banner-2" : "banner-3"
         }`}
         style={{
           height: "700px",
           maxHeight: "100vh",
         }}
       >
          {/* <div className="flex flex-col items-center text-center pt-80 pb-8 max-w-[1200px] mx-auto px-10">
            <h2 className="text-white text-5xl font-bold tracking-[1.5px] leading-[50px] max-sm:text-3xl max-[400px]:text-2xl">
              {banner.title}
            </h2>
            <p className="text-white text-xl font-medium tracking-[0.6px] mt-3 max-sm:text-base max-[400px]:text-sm">
              {banner.middleText}
            </p>
            <h3 className="text-white text-2xl font-normal tracking-[0.9px] mt-3 max-sm:text-lg max-[400px]:text-base">
              {banner.subtitle}
            </h3>
            <div className="flex justify-center items-center gap-4 mt-5 max-[400px]:flex-col max-[400px]:gap-2 w-[400px] max-sm:w-[320px] max-[400px]:w-[240px]">
              <Link
                to="/shop"
                className="bg-white text-black text-center text-lg border border-[rgba(0, 0, 0, 0.40)] font-normal tracking-[0.6px] w-full h-10 flex items-center justify-center max-[400px]:text-sm"
              >
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="text-white border-white border-2 text-center text-lg font-normal tracking-[0.6px] w-full h-10 flex items-center justify-center max-[400px]:text-sm"
              >
                See Collection
              </Link>
            </div>
          </div> */}
        </div>
      ))}
    </Slider>
  );
};

export default Banner;