import React from "react";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa6";

const SocialMediaFooter = () => {
  const handleIconClick = (platform: string) => {
    const socialMediaLinks: { [key: string]: string } = {
      Envelope: "https://mail.google.com/mail/?view=cm&to=fatmahussein822003@gmail.com",
      FaWhatsapp: "https://wa.me/201126490568?text=مرحبا%20نحن%20هنا%20لمساعدتك",
      phone: "tel:+201126490568"
    };

    window.open(socialMediaLinks[platform], "_blank");
  };

  return (
    <div className="mx-auto max-w-screen-2xl mt-10">
      <div className="bg-black text-white flex justify-center items-center flex-col gap-3 max-[400px]:mx-3">
        {/* Follow Us Text */}
        <p className="text-base text-white max-sm:text-sm pt-3 font-bold">Follow us on</p>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-white">
          {/* Envelope */}
          <FaEnvelope
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-blue-500"
            onClick={() => handleIconClick("Envelope")}
          />

          {/* Whatsapp */}
          <FaWhatsapp
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-green-500"
            onClick={() => handleIconClick("FaWhatsapp")}
          />

          {/* Phone */}
          <FaPhone
            className="w-4 h-5 cursor-pointer transition-all duration-300 hover:text-yellow-500"
            onClick={() => handleIconClick("phone")}
          />
        </div>

        {/* Copyright */}
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
