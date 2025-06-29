const Banner = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* الفيديو */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/home-bg-02.mp4" type="video/mp4" />
        المتصفح لا يدعم تشغيل الفيديو
      </video>

      {/* الطبقة السوداء */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* المحتوى */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Fix & Fuel – كل اللي عربيتك محتاجاه
        </h1>
        <p className="text-white text-lg md:text-xl mb-6 max-w-2xl drop-shadow-sm">
          صيانة، قطع غيار، بنزين، كاوتش – كل ده في مكان واحد! اكتشف خدماتنا وتمتع بتجربة قيادة آمنة وسلسة.
        </p>
        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300">
             طوارئ  
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300">
          طلب سياره لشحن سيارتي الكهربائيه 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
