import React from "react";
import "../index.css";

const Services: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto mt-20 px-5 min-h-screen bg-white">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] mb-10">
        خدمات ورشة السيارات
      </h1>
      <p className="text-center text-gray-700 text-lg mb-10">
        كل ما تحتاجه سيارتك في مكان واحد
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Card 1: تصليح السيارات */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-full p-4 w-fit">
              <i className="fa fa-tools fa-2x text-white"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900">
            تصليح السيارات
          </h3>
          <p className="text-sm text-center text-gray-700">
            إصلاحات سريعة ودقيقة لجميع أعطال السيارات بأيدي فنيين محترفين.
          </p>
        </div>

        {/* Service Card 2: بيع قطع الغيار */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-full p-4 w-fit">
              <i className="fa fa-cogs fa-2x text-white"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900">
            بيع قطع الغيار
          </h3>
          <p className="text-sm text-center text-gray-700">
            قطع غيار أصلية بجودة عالية وبأسعار تناسب الجميع.
          </p>
        </div>

        {/* Service Card 3: شراء قطع غيار مستعملة */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-full p-4 w-fit">
              <i className="fa fa-recycle fa-2x text-white"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900">
            شراء قطع غيار مستعملة
          </h3>
          <p className="text-sm text-center text-gray-700">
            نشتري قطع الغيار المستعملة بحالة جيدة بأسعار عادلة.
          </p>
        </div>

        {/* Service Card 4: بيع إطارات وجنوط */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-full p-4 w-fit">
              <i className="fa fa-circle-notch fa-2x text-white"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900">
            بيع إطارات وجنوط
          </h3>
          <p className="text-sm text-center text-gray-700">
            إطارات وجنوط جديدة ومستعملة بأفضل الأسعار والجودة.
          </p>
        </div>

        {/* Service Card 5: شراء سيارات مستعملة */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-full p-4 w-fit">
              <i className="fa fa-car-side fa-2x text-white"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900">
            شراء سيارات مستعملة
          </h3>
          <p className="text-sm text-center text-gray-700">
            نشتري سيارتك المستعملة بأسعار تنافسية وعملية سريعة.
          </p>
        </div>

        {/* Service Card 6: بيع زيوت ومواد تشحيم */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B0000] to-[#FF4500] rounded-full p-4 w-fit">
              <i className="fa fa-oil-can fa-2x text-white"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-900">
            بيع زيوت ومواد تشحيم
          </h3>
          <p className="text-sm text-center text-gray-700">
            زيوت محركات ومواد تشحيم عالية الجودة لأداء مثالي.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;