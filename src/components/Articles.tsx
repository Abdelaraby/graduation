const ArticlesSection = () => {
    const articles = [
      {
        id: 1,
        title: "أفضل طرق صيانة سيارتك بشكل دوري",
        summary: "تعرف على أهم الخطوات للحفاظ على سيارتك في أفضل حال، بدءًا من تغيير الزيت وحتى فحص الإطارات.",
        image: "/Articles/صيانه دوريه.jpg",
      },
      {
        id: 2,
        title: "متى تحتاج لتغيير الكاوتش؟",
        summary: "في هذا المقال نوضح العلامات التي تدل على أن وقت تغيير الكاوتش قد حان.",
        image: "/Articles/الاطار.jpeg",
      },
      {
        id: 3,
        title: "كيف تختار البنزين المناسب لسيارتك؟",
        summary: "شرح مبسط لأنواع البنزين وكيفية اختيار النوع المناسب حسب نوع محرك سيارتك.",
        image: "/Articles/اختيار البنزين المناسب.jpeg",
      },
      {
        id: 4,
        title: "نصائح لحماية السيارة في الصيف",
        summary: "ارتفاع الحرارة يؤثر على أداء سيارتك. إليك طرق الحفاظ عليها خلال شهور الصيف الحارة.",
        image: "/Articles/حمايه السياره في الصيف.jpeg",
      },
      {
        id: 5,
        title: "أفضل زيوت المحركات وكيف تختار الأنسب",
        summary: "مقارنة بين أشهر أنواع الزيوت، وفهم تصنيفاتها وتأثيرها على عمر المحرك.",
        image: "/Articles/اختيار الزيت.jpeg",
      },
      {
        id: 6,
        title: "علامات تلف البطارية",
        summary: "اكتشف العلامات الشائعة التي تدل على أن بطارية سيارتك تحتاج إلى تغيير.",
        image: "/Articles/علامات تلف البطاريه.jpeg",
      },
      {
        id: 7,
        title: "كيفية التعامل مع الإطارات المفرغة من الهواء",
        summary: "دليل بسيط للتصرف الصحيح عند تفريغ إطار السيارة أثناء القيادة.",
        image: "/Articles/اطار مفرغ.jpeg",
      },
      {
        id: 8,
        title: "كيف تتعامل مع ارتفاع حرارة المحرك",
        summary: "خطوات سريعة للتصرف في حال ارتفاع حرارة محرك سيارتك بشكل مفاجئ.",
        image: "/Articles/حرارة المحرك.jpeg",
      },
      {
        id: 9,
        title: "فحص السيارة قبل السفر",
        summary: "ما الذي يجب التأكد منه قبل الانطلاق في رحلة طويلة؟",
        image: "/Articles/فحص قبل السفر.jpeg",
      },
      {
        id: 10,
        title: "أفضل ممارسات تنظيف السيارة",
        summary: "دليلك للحفاظ على نظافة السيارة من الداخل والخارج بطرق فعالة.",
        image: "/Articles/تنظيف.jpeg",
      },
      {
        id: 11,
        title: "إشارات الأعطال على لوحة القيادة",
        summary: "شرح لأهم الرموز التحذيرية على طبلون السيارة وما تعنيه.",
        image: "/Articles/الاشارات.jpeg",
      },
      {
        id: 12,
        title: "أهمية تغيير الفلاتر بشكل منتظم",
        summary: "لماذا يعتبر تغيير فلاتر الهواء والزيت أمرًا أساسيًا لصيانة المحرك؟",
        image: "/Articles/فلتر الزيت.jpeg",
      },
    ];
  
    return (
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
            مقالات تهمك
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.summary}</p>
                  <button className="text-red-600 font-semibold hover:underline">اقرأ المزيد</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ArticlesSection;
  