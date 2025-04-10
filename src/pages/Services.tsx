import React from 'react';
import '../index.css';

const Services: React.FC = () => {
    return (
        <section className="container pt-3 mb-3 services-section">
          <h2 className="h3 block-title text-center">
            خدمات ورشة السيارات
            <small>كل ما تحتاجه سيارتك في مكان واحد</small>
          </h2>
          <div className="row pt-5 mt-3">
            {/* خدمة 1: تصليح السيارات */}
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <a className="card" href="#">
                <div className="box-shadow bg-white rounded-circle mx-auto text-center icon-circle">
                  <i className="fa fa-tools fa-3x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">تصليح السيارات</h3>
                  <p className="card-text text-sm">
                    إصلاحات سريعة ودقيقة لجميع أعطال السيارات بأيدي فنيين محترفين.
                  </p>
                 
                </div>
              </a>
            </div>
      
            {/* خدمة 2: بيع قطع الغيار */}
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <a className="card" href="#">
                <div className="box-shadow bg-white rounded-circle mx-auto text-center icon-circle">
                  <i className="fa fa-cogs fa-3x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">بيع قطع الغيار</h3>
                  <p className="card-text text-sm">
                    قطع غيار أصلية بجودة عالية وبأسعار تناسب الجميع.
                  </p>
                 
                </div>
              </a>
            </div>
      
            {/* خدمة 3: شراء قطع غيار مستعملة */}
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <a className="card" href="#">
                <div className="box-shadow bg-white rounded-circle mx-auto text-center icon-circle">
                  <i className="fa fa-recycle fa-3x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">شراء قطع غيار مستعملة</h3>
                  <p className="card-text text-sm">
                    نشتري قطع الغيار المستعملة بحالة جيدة بأسعار عادلة.
                  </p>
                  
                </div>
              </a>
            </div>
      
            {/* خدمة 4: بيع إطارات وجنوط */}
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <a className="card" href="#">
                <div className="box-shadow bg-white rounded-circle mx-auto text-center icon-circle">
                  <i className="fa fa-circle-notch fa-3x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">بيع إطارات وجنوط</h3>
                  <p className="card-text text-sm">
                    إطارات وجنوط جديدة ومستعملة بأفضل الأسعار والجودة.
                  </p>
              
                </div>
              </a>
            </div>
      
            {/* خدمة 5: شراء سيارات مستعملة */}
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <a className="card" href="#">
                <div className="box-shadow bg-white rounded-circle mx-auto text-center icon-circle">
                  <i className="fa fa-car-side fa-3x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">شراء سيارات مستعملة</h3>
                  <p className="card-text text-sm">
                    نشتري سيارتك المستعملة بأسعار تنافسية وعملية سريعة.
                  </p>
                
                </div>
              </a>
            </div>
      
            {/* خدمة 6: بيع زيوت ومواد تشحيم */}
            <div className="col-lg-4 col-sm-6 mb-30 pb-5">
              <a className="card" href="#">
                <div className="box-shadow bg-white rounded-circle mx-auto text-center icon-circle">
                  <i className="fa fa-oil-can fa-3x head-icon"></i>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title pt-1">بيع زيوت ومواد تشحيم</h3>
                  <p className="card-text text-sm">
                    زيوت محركات ومواد تشحيم عالية الجودة لأداء مثالي.
                  </p>
               
                </div>
              </a>
            </div>
          </div>
        </section>
      );
};

export default Services;