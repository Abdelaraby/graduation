import React from "react";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

const SocialMediaFooter = () => {
  // Function to handle icon clicks
  const handleIconClick = (platform: string) => {
    // Replace these URLs with the actual links to your social media profiles
    const socialMediaLinks: { [key: string]: string } = {
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      tiktok: "https://www.tiktok.com",
      linkedin: "https://www.linkedin.com",
      pinterest: "https://www.pinterest.com",
      youtube: "https://www.youtube.com",
    };

    // Open the link in a new tab
    window.open(socialMediaLinks[platform], "_blank");
  };

  return (
    <div className="mx-auto max-w-screen-2xl mt-10">
      <div className="bg-black text-white flex justify-center items-center flex-col gap-3 max-[400px]:mx-3">
        {/* Follow Us Text */}
        <p className="text-base text-white max-sm:text-sm pt-3 font-bold">Follow us on</p>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-white">
          {/* Facebook */}
          <FaFacebookF
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-blue-500"
            onClick={() => handleIconClick("facebook")}
          />
          {/* Instagram */}
          <FaInstagram
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-pink-500"
            onClick={() => handleIconClick("instagram")}
          />
          {/* TikTok */}
          <FaTiktok
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-black"
            onClick={() => handleIconClick("tiktok")}
          />
          {/* LinkedIn */}
          <FaLinkedinIn
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-blue-700"
            onClick={() => handleIconClick("linkedin")}
          />
          {/* Pinterest */}
          <FaPinterestP
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-red-600"
            onClick={() => handleIconClick("pinterest")}
          />
          {/* YouTube */}
          <FaYoutube
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-red-700"
            onClick={() => handleIconClick("youtube")}
          />
        </div>

        {/* Spacer and Copyright Text */}
        <div className="mt-5">
          <p className="text-base text-center max-sm:text-sm text-white">
            All rights reserved ©2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaFooter;