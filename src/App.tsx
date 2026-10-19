import React, { useState, useMemo, useEffect } from 'react';
import {
  MessageCircle,
  ArrowLeft,
  Check,
  Search,
  Calculator,
  PhoneCall,
  Clock,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
  X,
  Eye,
  Menu,
  Home,
  Grid,
} from 'lucide-react';
import {
  PRODUCTS,
  CATEGORY_LABELS,
  ProductCategory,
  ProductItem,
  CASE_STUDIES,
  DEFAULT_WHATSAPP_NUMBER,
} from './data/catalog';
import { ResilientImage } from './components/ResilientImage';
import { ProductDetailModal } from './components/ProductDetailModal';

interface HeroSlide {
  id: number;
  tabLabel: string;
  tag: string;
  title: string;
  subtitle: string;
  specs: string[];
  image: string;
  categoryTarget: ProductCategory;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<ProductItem | null>(null);

  // Image Carousel State
  const [activeImageSlide, setActiveImageSlide] = useState(0);
  const imageCarouselSlides = [
    {
      id: 1,
      tag: 'معتمد FIFA',
      title: 'عشب ملاعب كرة القدم',
      subtitle: 'سماكات 50 و 60 ملم معتمدة دولياً للأكاديميات والملاعب',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80',
      category: 'football-turf'
    },
    {
      id: 2,
      tag: 'دائم الخضرة',
      title: 'عشب الحدائق والفلل',
      subtitle: 'مظهر ملكي نضر مقاوم لحرارة الصيف وموفر للمياه',
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=80',
      category: 'farm-turf'
    },
    {
      id: 3,
      tag: 'ضد الاشتعال',
      title: 'عشب التراسات والكافتيريات',
      subtitle: 'أناقة ناعمة ومقاومة لانسكاب السوائل والحركة المكثفة',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
      category: 'cafe-turf'
    },
    {
      id: 4,
      tag: 'توريد فوري',
      title: 'مستلزمات وتجهيزات الملاعب',
      subtitle: 'مرامي، شبكات حماية، حبيبات مطاط ورمل سيليكا مغسول',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80',
      category: 'field-supplies'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageSlide((prev) => (prev + 1) % imageCarouselSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [imageCarouselSlides.length]);

  // Hero Slider State (Professional Store Showcase)
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      tabLabel: '⚽ ملاعب كرة القدم',
      tag: 'معتمد دولياً | FIFA Quality Pro',
      title: 'عشب ملاعب كرة القدم والمستلزمات الرياضية',
      subtitle: 'سماكات 50 و 60 ملم متينة للأكاديميات وملاعب الاستثمار الرياضي، مع رمل السيليكا وحبيبات المطاط وقوائم المرمى.',
      specs: ['سماكة 50 و 60 ملم', 'مقاوم للشمس UV', 'ضمان رسمي 8 سنوات'],
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
      categoryTarget: 'football-turf',
    },
    {
      id: 2,
      tabLabel: '☕ كافتيريات وتراسات',
      tag: 'مقاوم للاشتعال والانسكاب',
      title: 'عشب الكافتيريات والمطاعم والتراسات الخارجية',
      subtitle: 'مظهر ربيعي فائق النعومة، سهل الغسيل السريع بالماء ومصمم لتحمل حركة المقاعد اليومية بدون حشو رمل.',
      specs: ['معتمد ضد الاشتعال', 'غسيل سريع بالماء', 'ملمس ناعم وطبيعي'],
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      categoryTarget: 'cafe-turf',
    },
    {
      id: 3,
      tabLabel: '🌿 مزارع وفلل',
      tag: 'مروج ملكية دائمة الخضرة',
      title: 'عشب المزارع الفاخرة والحدائق ومحيط المسابح',
      subtitle: 'عشب ملكي عالي الكثافة يقاوم كلور المسابح وحرارة الصيف ويوفر 100% من فواتير مياه الري، آمن للأسرة والأطفال.',
      specs: ['مقاوم لكلور المسابح', 'توفير كامل للري', 'كثافة نسيجية عالية'],
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
      categoryTarget: 'farm-turf',
    },
    {
      id: 4,
      tabLabel: '🥅 مستلزمات الملاعب',
      tag: 'من المستودع مباشرة',
      title: 'كافة مستلزمات وتجهيزات ملاعب كرة القدم',
      subtitle: 'مرامي قانونية رسمية وشباك حماية، رمل سيليكا مغسول، مطاط SBR نقي 99%، وغراء بولي يوريثان ثنائي المركب.',
      specs: ['مرامي ألمنيوم رسمية', 'مطاط SBR نقي 99%', 'شحن وتوريد فوري'],
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      categoryTarget: 'field-supplies',
    },
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  // Estimator / Calculator state
  const [calcSector, setCalcSector] = useState<'football' | 'cafe' | 'farm'>('football');
  const [calcLength, setCalcLength] = useState<number>(45);
  const [calcWidth, setCalcWidth] = useState<number>(25);
  const [surfaceType, setSurfaceType] = useState<'concrete' | 'subbase'>('subbase');
  const [includeSupplies, setIncludeSupplies] = useState<boolean>(true);

  // Quick Lead Form
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState('');
  const [leadSector, setLeadSector] = useState('ملعب كرة قدم');
  const [leadArea, setLeadArea] = useState('');
  const [requestSamples, setRequestSamples] = useState(true);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Calculations for Estimator
  const totalAreaSqm = Math.max(1, Math.round(calcLength * calcWidth));
  const rollsCount4m = Math.ceil(totalAreaSqm / 100);
  const seamTapeMeters = Math.round(totalAreaSqm * 0.28);
  const glueKg = Math.round(seamTapeMeters * 0.45);
  const silicaSandTons = calcSector === 'football' ? Number(((totalAreaSqm * 25) / 1000).toFixed(1)) : 0;
  const rubberGranulesTons = calcSector === 'football' ? Number(((totalAreaSqm * 12) / 1000).toFixed(1)) : 0;

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // WhatsApp Helper
  const whatsappNumber = DEFAULT_WHATSAPP_NUMBER;
  const openWhatsApp = (customMessage: string) => {
    const encoded = encodeURIComponent(customMessage);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.location.href = url;
  };

  const handleCalculatorWhatsApp = () => {
    const sectorLabels = {
      football: 'ملعب كرة قدم (رياضي معتمد)',
      cafe: 'كافتيريا / لاونج / تراس ضيافة',
      farm: 'مزرعة خاصة / حديقة فيلا ومحيط مسبح',
    };
    const surfaceLabels = {
      concrete: 'أرضية خرسانية / بلاط جاهز',
      subbase: 'تربة مدكوكة وحصى (Sub-base)',
    };

    const text = [
      `السلام عليكم شركة الشهباء التجارية،`,
      `أرغب بالاستفسار عن مقايسة وتوريد لمشروعي بحسب حاسبة الكميات:`,
      `• نوع المشروع: ${sectorLabels[calcSector]}`,
      `• الأبعاد: الطول ${calcLength}م × العرض ${calcWidth}م`,
      `• المساحة الإجمالية الصافية: ${totalAreaSqm} م²`,
      `• طبيعة الأرضية الحالية: ${surfaceLabels[surfaceType]}`,
      `• تفاصيل الكميات المقترحة:`,
      `  - عدد الرولات القياسية (عرض 4م): ${rollsCount4m} رول`,
      `  - شريط اللحام للجوت: ${seamTapeMeters} متر طولي`,
      `  - غراء بولي يوريثان ثنائي المركب: ${glueKg} كجم تقريباً`,
      calcSector === 'football' ? `  - رمل السيليكا المطلوب: ${silicaSandTons} طن` : '',
      calcSector === 'football' ? `  - مطاط SBR لامتصاص الصدمات: ${rubberGranulesTons} طن` : '',
      includeSupplies ? `• شامل مستلزمات التركيب والتجهيز كاملة` : `• عشب فقط بدون مستلزمات`,
      `يرجى التكرم بتزويدي بالتفاصيل والتوريد لموقعي.`,
    ]
      .filter(Boolean)
      .join('\n');

    openWhatsApp(text);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) return;

    const text = [
      `السلام عليكم شركة الشهباء التجارية،`,
      `طلب استشارة فنية وتوريد مستلزمات:`,
      `• الاسم / المنشأة: ${leadName}`,
      `• رقم الجوال: ${leadPhone || 'عبر واتساب'}`,
      `• المدينة / الموقع: ${leadCity || 'غير محدد'}`,
      `• نوع المشروع: ${leadSector}`,
      `• المساحة التقريبية: ${leadArea ? `${leadArea} م²` : 'تحتاج معاينة'}`,
      `• طلب عينات مجانية: ${requestSamples ? 'نعم، أرغب بمعاينة عينات العشب' : 'لا'}`,
      `يرجى التكرم بالتواصل وتزويدي بكافة التفاصيل.`,
    ]
      .filter(Boolean)
      .join('\n');

    setLeadSubmitted(true);
    openWhatsApp(text);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F4] text-slate-800 font-sans selection:bg-emerald-600 selection:text-white pb-20 lg:pb-0" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* =====================================================================
          1. MAIN HEADER (Clean, at the absolute top with NO elements above it)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Brand Identity with Slogan */}
            <a href="#" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shadow-emerald-700/30 border border-emerald-400 group-hover:scale-105 transition-transform">
                ش
              </div>
              <div>
                <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 block leading-tight">
                  شركة الشهباء التجارية
                </span>
                <span className="text-xs sm:text-sm text-emerald-700 font-bold tracking-wide block mt-0.5">
                  لكافة مستلزمات الملاعب
                </span>
              </div>
            </a>

            {/* Central Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-2">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن عشب ملاعب 50 ملم، كافتيريات، مزارع، مطاط، غراء..."
                  className="w-full pr-10 pl-10 py-2.5 bg-[#EBF5EB] border border-emerald-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-500 focus:bg-white focus:border-emerald-600 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Action: RTL Side Menu Trigger (Clean RTL Drawer) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsSideMenuOpen(true)}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#EAF5EA] hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
                aria-label="القائمة الجانبية"
              >
                <Menu className="w-5 h-5 text-emerald-700" />
                <span className="text-xs sm:text-sm font-bold">القائمة</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="mt-2.5 md:hidden">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن نوع العشب، السماكة، أو الكود..."
                className="w-full pr-10 pl-10 py-2 bg-[#EBF5EB] border border-emerald-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-500 focus:bg-white focus:border-emerald-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

      </header>

      {/* =====================================================================
          RTL SIDE DRAWER MENU (قائمة جانبية RTL بألوان عشبية أنيقة)
         ===================================================================== */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsSideMenuOpen(false)}
          />

          {/* Drawer Panel - Slides in from the RIGHT (RTL) */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm sm:max-w-md bg-white border-l border-emerald-200 h-full flex flex-col justify-between p-6 shadow-2xl text-slate-800 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 text-white flex items-center justify-center font-black text-lg border border-emerald-400">
                    ش
                  </div>
                  <div>
                    <span className="text-base font-black text-slate-900 block leading-tight">
                      شركة الشهباء التجارية
                    </span>
                    <span className="text-xs text-emerald-700 font-bold tracking-wide block mt-0.5">
                      لكافة مستلزمات الملاعب
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSideMenuOpen(false)}
                  className="p-2 rounded-xl bg-[#EAF5EA] border border-emerald-200 text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Sections */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block px-1">
                  أقسام المتجر والمنتجات
                </span>

                <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsSideMenuOpen(false);
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-right text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>كافة المنتجات والتجهيزات</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('football-turf');
                      setIsSideMenuOpen(false);
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-right text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span>⚽</span>
                      <span>عشب ملاعب كرة القدم (FIFA Pro)</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('cafe-turf');
                      setIsSideMenuOpen(false);
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-right text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span>☕</span>
                      <span>عشب الكافتيريات والتراسات</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('farm-turf');
                      setIsSideMenuOpen(false);
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-right text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span>🌿</span>
                      <span>عشب المزارع والفلل الملكي</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('field-supplies');
                      setIsSideMenuOpen(false);
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-right text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span>🥅</span>
                      <span>مستلزمات وتجهيزات الملاعب</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Service Tools */}
              <div className="space-y-2 border-t border-emerald-100 pt-4">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block px-1">
                  الخدمات والمشاريع
                </span>

                <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm font-bold">
                  <a
                    href="#calculator"
                    onClick={() => setIsSideMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Calculator className="w-4 h-4 text-emerald-600" />
                      <span>حاسبة المساحات والكميات</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </a>

                  <a
                    href="#projects"
                    onClick={() => setIsSideMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F0F8F0] text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>شواهد المشاريع المنفذة</span>
                    </span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setIsSideMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 mt-2 transition-colors font-bold"
                  >
                    <span>طلب استشارة وعينات مجانية</span>
                    <ArrowLeft className="w-4 h-4 text-emerald-700" />
                  </a>
                </div>
              </div>
            </div>

            {/* Side Drawer Footer */}
            <div className="pt-6 border-t border-emerald-100 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsSideMenuOpen(false);
                  openWhatsApp('السلام عليكم شركة الشهباء التجارية، أرغب بالاستفسار عن عشب ومستلزمات الملاعب لمشروعي.');
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-700/30 active:scale-98 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>محادثة واتساب مبيعات الشهباء</span>
              </button>

              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                خدمة العملاء واستقبال الطلبات يومياً (السبت – الخميس)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. DEDICATED IMAGE CAROUSEL (كاروسيل صور احترافي متحرك للرئيسية)
         ===================================================================== */}
      <section className="bg-[#EBF5EB] border-b border-emerald-200 py-3 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl shadow-emerald-950/15 border border-emerald-200 h-[240px] sm:h-[320px] md:h-[380px] bg-emerald-950">
            {/* Carousel Slides */}
            {imageCarouselSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeImageSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <ResilientImage
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/50 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 max-w-3xl space-y-1.5 sm:space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[11px] sm:text-sm font-bold w-fit shadow-md border border-emerald-400/40">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 shrink-0" />
                    <span>{slide.tag}</span>
                  </div>

                  <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug sm:leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 font-medium max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none drop-shadow">
                    {slide.subtitle}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      <main>
        {/* =====================================================================
            2. STORE FEATURES STRIP (ألوان عشبية نضرة ومريحة للعين)
           ===================================================================== */}
        <section className="bg-white border-y border-emerald-100 py-4 sm:py-5 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-[#F0F8F0] border border-emerald-200/80">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">توريد وشحن سريع</span>
                  <span className="text-[11px] text-emerald-800 block">شحن مباشر لكافة المدن</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-[#F0F8F0] border border-emerald-200/80">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">ضمان معتمد 8 سنوات</span>
                  <span className="text-[11px] text-emerald-800 block">مطابق لمواصفات FIFA</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-[#F0F8F0] border border-emerald-200/80">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">استفسار فوري عبر واتساب</span>
                  <span className="text-[11px] text-emerald-800 block">تواصل مباشر مع المبيعات</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-[#F0F8F0] border border-emerald-200/80">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">مقايسة واستشارة مجانية</span>
                  <span className="text-[11px] text-emerald-800 block">حساب كميات الرولات فوراً</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. PROFESSIONAL STORE SHOWCASE (واجهة استعراض متجر احترافية بالكامل)
           ===================================================================== */}
        <section className="pt-4 sm:pt-6 pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-white via-[#F7FAF7] to-emerald-50/80 border border-emerald-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-xs relative overflow-hidden">
              {/* Main Split Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Text & Content Column (RTL Right side, 7 cols) */}
                <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                  {/* Tag and Counter */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{heroSlides[currentSlide].tag}</span>
                    </span>

                    {/* Step counter */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-num font-bold">
                      <span className="text-emerald-700">0{currentSlide + 1}</span>
                      <span>/</span>
                      <span>0{heroSlides.length}</span>
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                    {heroSlides[currentSlide].title}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
                    {heroSlides[currentSlide].subtitle}
                  </p>

                  {/* Highlights pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    {heroSlides[currentSlide].specs.map((sp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-bold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{sp}</span>
                      </span>
                    ))}
                  </div>

                  {/* Single Clean Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(heroSlides[currentSlide].categoryTarget);
                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl inline-flex items-center gap-2 shadow-sm shadow-emerald-700/20 cursor-pointer active:scale-95 transition-all"
                    >
                      <span>استعراض أصناف هذا القسم</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Visual Image Showcase (Left side, 5 cols) */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden bg-emerald-100 border border-emerald-200 shadow-md relative group">
                    <ResilientImage
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Quality watermark badge */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-emerald-900 px-3 py-1 rounded-xl text-xs font-bold border border-emerald-200 shadow-sm flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>شركة الشهباء التجارية</span>
                    </div>

                    {/* Lateral Arrow Controls on the visual */}
                    <div className="absolute top-3 left-3 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-slate-700 border border-emerald-200 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                        aria-label="السابق"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-slate-700 border border-emerald-200 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                        aria-label="التالي"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Category Tabs (التحكم الاحترافي بالأقسام) */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-emerald-200/80">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {heroSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`p-2.5 sm:p-3 rounded-xl text-right transition-all cursor-pointer border flex flex-col justify-between ${
                        idx === currentSlide
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white hover:bg-emerald-50 text-slate-700 border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{slide.tabLabel}</span>
                        {idx === currentSlide && (
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                        )}
                      </div>
                      <span className={`text-[10px] mt-1 block truncate ${
                        idx === currentSlide ? 'text-emerald-100' : 'text-slate-500'
                      }`}>
                        {slide.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. PRODUCT CATALOG (NO CART & NO PRICES - خلفيات عشبية مشرقة)
           ===================================================================== */}
        <section id="catalog" className="py-10 sm:py-14 bg-[#F4F9F4] border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-emerald-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    منتجات ومستلزمات شركة الشهباء التجارية
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  اختر الصنف المطلوب واضغط على "طلب استفسار عبر واتساب" للتواصل المباشر مع المهندسين
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs self-start md:self-auto">
                <span>المعروض: </span>
                <span className="text-emerald-700 font-num font-black text-sm">{filteredProducts.length}</span>
                <span>صنف متوفر</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {(Object.keys(CATEGORY_LABELS) as ProductCategory[]).map((cat) => {
                const count = cat === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 sm:px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-2 ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                        : 'bg-white text-slate-700 hover:text-emerald-900 hover:bg-emerald-50 border border-emerald-200'
                    }`}
                  >
                    <span>{CATEGORY_LABELS[cat]}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-num ${
                      selectedCategory === cat ? 'bg-black/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Empty Search State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-emerald-200 p-8 space-y-4 shadow-xs">
                <Search className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">لم يتم العثور على نتائج للبحث</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  جرب البحث بكلمات أخرى أو اختر أحد الأقسام من الأزرار أعلاه.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  عرض كافة المنتجات
                </button>
              </div>
            )}

            {/* Product Cards Grid (Zero Cart & Zero Prices - Clean White & Emerald) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-emerald-100 hover:border-emerald-400 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div>
                    {/* Product Image */}
                    <div className="aspect-16/10 bg-emerald-50 overflow-hidden relative">
                      <ResilientImage
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Tag */}
                      <div className="absolute bottom-3 right-3 bg-emerald-900/90 text-white px-2.5 py-1 rounded-md text-[11px] font-bold border border-emerald-500/40 backdrop-blur-xs">
                        {product.categoryLabel}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-num text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{product.code}</span>
                        <span className="text-emerald-700 font-bold text-[11px]">ضمان {product.warrantyYears} سنوات</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {product.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>

                      {/* Specs Chips */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-100 text-xs">
                        {product.specs.slice(0, 4).map((sp, idx) => (
                          <div key={idx} className="bg-[#F4F9F4] p-2 rounded-lg border border-emerald-100 space-y-0.5">
                            <span className="text-[10px] text-slate-500 block">{sp.label}</span>
                            <span className="font-num font-bold text-slate-800 block text-xs truncate">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (NO CART, NO PRICES) */}
                  <div className="p-5 sm:p-6 pt-0 space-y-2">
                    {/* Primary: Direct WhatsApp Inquiry */}
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp(
                          `السلام عليكم شركة الشهباء التجارية، أرغب بالاستفسار عن تفاصيل وتوريد الصنف التالي:\n• الصنف: ${product.title}\n• الكود: ${product.code}\n• القسم: ${product.categoryLabel}\nيرجى تزويدي بكافة التفاصيل والتوريد لموقعي.`
                        )
                      }
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs shadow-emerald-700/20 active:scale-98"
                    >
                      <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                      <span>طلب استفسار عبر واتساب</span>
                    </button>

                    {/* Secondary: Technical Specifications */}
                    <button
                      type="button"
                      onClick={() => setActiveProductModal(product)}
                      className="w-full py-2.5 px-3 text-xs font-bold rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>المواصفات الفنية الكاملة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. PROJECT SIZE & MATERIALS CALCULATOR (ألوان عشبية نضرة)
           ===================================================================== */}
        <section id="calculator" className="py-12 sm:py-16 bg-[#EBF5EB] border-b border-emerald-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-emerald-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>حاسبة مقايسة المساحات والكميات</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  احسب كميات العشب والرولات والمستلزمات لمشروعك فوراً
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  حدد نوع مشروعك وأبعاده بالمتر لمعرفة المساحة وعدد الرولات وكمية الغراء ورمل السيليكا ومطاط SBR.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-5">
                  {/* Sector Picker */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">01. نوع المشروع:</label>
                    <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#F4F9F4] rounded-xl border border-emerald-200">
                      <button
                        type="button"
                        onClick={() => setCalcSector('football')}
                        className={`py-2.5 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all text-center truncate ${
                          calcSector === 'football' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        ملعب كرة قدم
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcSector('cafe')}
                        className={`py-2.5 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all text-center truncate ${
                          calcSector === 'cafe' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        كافتيريا وتراس
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcSector('farm')}
                        className={`py-2.5 px-2 rounded-lg text-xs font-bold cursor-pointer transition-all text-center truncate ${
                          calcSector === 'farm' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        مزرعة وفيلا
                      </button>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#F4F9F4] border border-emerald-200 rounded-xl space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                        <span>طول المساحة بالمتر:</span>
                        <span className="font-num text-emerald-700 text-base font-black">{calcLength} م</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={110}
                        value={calcLength}
                        onChange={(e) => setCalcLength(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500 font-num">
                        <span>4 م</span>
                        <span>110 م</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F4F9F4] border border-emerald-200 rounded-xl space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                        <span>عرض المساحة بالمتر:</span>
                        <span className="font-num text-emerald-700 text-base font-black">{calcWidth} م</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={75}
                        value={calcWidth}
                        onChange={(e) => setCalcWidth(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-slate-500 font-num">
                        <span>4 م</span>
                        <span>75 م</span>
                      </div>
                    </div>
                  </div>

                  {/* Floor Surface */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">طبيعة الأرضية:</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSurfaceType('concrete')}
                          className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer text-center truncate ${
                            surfaceType === 'concrete' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-emerald-200'
                          }`}
                        >
                          خرسانة / بلاط
                        </button>
                        <button
                          type="button"
                          onClick={() => setSurfaceType('subbase')}
                          className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-colors cursor-pointer text-center truncate ${
                            surfaceType === 'subbase' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-emerald-200'
                          }`}
                        >
                          تربة مدكوكة
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">مستلزمات التركيب:</label>
                      <button
                        type="button"
                        onClick={() => setIncludeSupplies(!includeSupplies)}
                        className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                          includeSupplies ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-white text-slate-600 border-emerald-200'
                        }`}
                      >
                        <span className="truncate">شامل الغراء والأشرطة</span>
                        <span className="underline shrink-0 text-emerald-700">{includeSupplies ? 'مفعّل' : 'عشب فقط'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Output Card - Rich Turf Green with High Contrast */}
                <div className="lg:col-span-5 bg-[#0D3822] text-white border border-emerald-600/50 p-6 sm:p-7 rounded-2xl space-y-5 shadow-xl">
                  <div className="border-b border-emerald-700/60 pb-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-amber-300 font-bold block">المساحة الإجمالية الصافية</span>
                      <span className="text-[11px] text-emerald-200">حسب الأبعاد المدخلة</span>
                    </div>
                    <span className="font-num text-3xl font-black text-emerald-300">{totalAreaSqm.toLocaleString('en-US')} م²</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-emerald-700/50">
                      <span className="text-emerald-100">عدد الرولات القياسية (عرض 4م):</span>
                      <span className="font-num font-bold text-white">{rollsCount4m} رول</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-emerald-700/50">
                      <span className="text-emerald-100">أشرطة لحام الجوت:</span>
                      <span className="font-num font-bold text-white">{seamTapeMeters} متر طولي</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-emerald-700/50">
                      <span className="text-emerald-100">غراء بولي يوريثان:</span>
                      <span className="font-num font-bold text-white">{glueKg} كجم ({Math.ceil(glueKg / 15)} عبوة)</span>
                    </div>
                    {calcSector === 'football' && (
                      <>
                        <div className="flex justify-between py-1.5 border-b border-emerald-700/50">
                          <span className="text-emerald-100">رمل سيليكا مغسول:</span>
                          <span className="font-num font-bold text-amber-300">{silicaSandTons} طن</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-emerald-700/50">
                          <span className="text-emerald-100">مطاط SBR لامتصاص الصدمات:</span>
                          <span className="font-num font-bold text-amber-300">{rubberGranulesTons} طن</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCalculatorWhatsApp}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/40 text-center active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>إرسال المقايسة الفنية عبر واتساب</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            6. PAST PROJECTS SHOWCASE (ألوان عشبية)
           ===================================================================== */}
        <section id="projects" className="py-12 sm:py-16 bg-[#F4F9F4] border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                  <Award className="w-3.5 h-3.5" />
                  <span>شواهد المشاريع المنفذة</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  مشاريع ميدانية نفذتها وتوردها شركة الشهباء التجارية
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md">
                نماذج واقعية من توريد وتجهيز ملاعب كرة القدم ومقاهي التراسات والمزارع الريفية بأعلى معايير الدقة والالتزام.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  className="bg-white border border-emerald-100 hover:border-emerald-400 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
                >
                  <div>
                    <div className="aspect-16/10 bg-emerald-50 overflow-hidden relative">
                      <ResilientImage src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-emerald-900/90 text-white px-3 py-1 rounded-lg text-xs font-num font-bold border border-emerald-500/40">
                        {study.areaSqm}
                      </div>
                    </div>
                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-bold text-emerald-700">{study.sector}</span>
                        <span>·</span>
                        <span>{study.location}</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 leading-snug">{study.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{study.summary}</p>
                      <div className="p-2.5 bg-[#F0F8F0] rounded-xl border border-emerald-200 text-xs text-emerald-800 font-bold leading-relaxed">
                        {study.metricHighlight}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 pt-0 text-xs text-slate-500 border-t border-emerald-100 mt-2">
                    <strong className="text-slate-800">النوع المورّد:</strong> {study.turfTypeUsed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            7. SAMPLE & CONSULTATION FORM (خلفية عشبية فاتحة)
           ===================================================================== */}
        <section id="contact" className="py-12 sm:py-16 bg-[#EBF5EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Info Column */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>طلب استشارة وعينات مجانية</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    هل تخطط لتجهيز ملعب كرة قدم، كافتيريا، أو مزرعة خاصة؟
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    تواصل مباشرة مع مهندسي شركة الشهباء التجارية عبر واتساب للحصول على استشارة فنية مجانية، أو طلب معاينة وإرسال حقيبة عينات العشب لموقعك.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3.5 text-xs sm:text-sm text-slate-700 p-3.5 rounded-xl bg-[#F4F9F4] border border-emerald-200">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">رقم واتساب المبيعات المباشر:</span>
                      <span className="font-num text-emerald-700 text-base font-black">{whatsappNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-xs sm:text-sm text-slate-700 p-3.5 rounded-xl bg-[#F4F9F4] border border-emerald-200">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">ساعات العمل واستقبال الطلبات:</span>
                      <span className="text-xs text-slate-600">السبت – الخميس: 8:30 ص إلى 9:00 م (الواتساب متاح دائماً)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-6 bg-[#F4F9F4] text-slate-800 p-6 sm:p-7 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">نموذج طلب الاستشارة والعينات الفوري</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">أدخل معلوماتك وسنقوم بتحويلك مباشرة إلى محادثة واتساب مع كافة التفاصيل.</p>
                </div>

                {leadSubmitted && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-bold border border-emerald-300 leading-relaxed">
                    تم تجهيز طلبك وتحويلك بنجاح إلى واتساب شركة الشهباء التجارية.
                  </div>
                )}

                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل أو اسم المنشأة / الملعب *</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="مثال: مجمع الأكاديمية الرياضية"
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رقم الجوال للتواصل</label>
                      <input
                        type="tel"
                        dir="ltr"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="+966..."
                        className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs sm:text-sm text-right font-num text-slate-800 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">المدينة / الموقع</label>
                      <input
                        type="text"
                        value={leadCity}
                        onChange={(e) => setLeadCity(e.target.value)}
                        placeholder="اسم المدينة أو المنطقة"
                        className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">نوع المشروع</label>
                      <select
                        value={leadSector}
                        onChange={(e) => setLeadSector(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
                      >
                        <option value="ملعب كرة قدم">ملعب كرة قدم (قانوني أو خماسي)</option>
                        <option value="كافتيريا أو تراس">كافتيريا / مطعم / تراس ضيافة</option>
                        <option value="مزرعة خاصة أو فيلا">مزرعة خاصة / حديقة فيلا ومسبح</option>
                        <option value="مستلزمات ملاعب وتجهيزات">مستلزمات وتجهيزات ملاعب كرة قدم</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">المساحة التقريبية (م²)</label>
                      <input
                        type="number"
                        value={leadArea}
                        onChange={(e) => setLeadArea(e.target.value)}
                        placeholder="مثال: 1200"
                        className="w-full px-3.5 py-2.5 bg-white border border-emerald-200 rounded-xl text-xs font-num text-slate-800 focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={requestSamples}
                      onChange={(e) => setRequestSamples(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                    <span>أرغب بالحصول على حقيبة عينات مجانية لكثافات وسماكات العشب</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-700/20 transition-all text-center active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                    <span>إرسال الطلب فوراً عبر واتساب</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          8. FOOTER WITH SLOGAN (ألوان خضراء عشبية وقورة - NO CART, NO PRICES)
         ===================================================================== */}
      <footer className="bg-[#0B2A18] text-emerald-100/90 py-10 sm:py-14 border-t-4 border-emerald-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-800/80">
            <div className="space-y-1 text-center md:text-right">
              <span className="text-lg sm:text-xl font-black text-white block">شركة الشهباء التجارية</span>
              <span className="text-amber-300 font-bold block text-xs">لكافة مستلزمات الملاعب</span>
              <p className="text-emerald-200/80 text-xs leading-relaxed max-w-lg mt-1 font-normal">
                المتخصصون في تجارة مستلزمات الملاعب وكافة أنواع عشب ملاعب كرة القدم، الكافتيريات، والمزارع وفق أعلى المواصفات الدولية.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-emerald-100 font-bold text-xs">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('football-turf');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors"
              >
                عشب ملاعب كرة القدم
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('cafe-turf');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors"
              >
                عشب الكافتيريات
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('farm-turf');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors"
              >
                عشب المزارع
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('field-supplies');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-300 transition-colors"
              >
                مستلزمات الملاعب
              </button>
              <a href="#calculator" className="hover:text-amber-300 transition-colors">حاسبة المساحات</a>
              <a href="#contact" className="hover:text-amber-300 transition-colors">تواصل واتساب</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-emerald-300/70 text-xs text-center sm:text-right font-normal">
            <div>جميع الحقوق محفوظة لشركة الشهباء التجارية © 2026 — لكافة مستلزمات الملاعب</div>
            <div>توريد وشحن مباشر لكافة المدن والمحافظات</div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          9. MOBILE BOTTOM NAVIGATION BAR (NO CART - ألوان عشبية مشرقة)
         ===================================================================== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-200 px-3 py-2 flex items-center justify-around text-center shadow-lg">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-600 hover:text-emerald-700 py-1 px-3 cursor-pointer"
        >
          <Home className="w-5 h-5 text-emerald-700" />
          <span className="text-[10px] font-bold text-slate-800">الرئيسية</span>
        </button>

        <button
          type="button"
          onClick={() => {
            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-600 hover:text-emerald-700 py-1 px-3 cursor-pointer"
        >
          <Grid className="w-5 h-5 text-emerald-700" />
          <span className="text-[10px] font-bold text-slate-800">المنتجات</span>
        </button>

        <button
          type="button"
          onClick={() => {
            document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-slate-600 hover:text-emerald-700 py-1 px-3 cursor-pointer"
        >
          <Calculator className="w-5 h-5 text-emerald-700" />
          <span className="text-[10px] font-bold text-slate-800">الحاسبة</span>
        </button>

        <button
          type="button"
          onClick={() =>
            openWhatsApp(
              'السلام عليكم شركة الشهباء التجارية، أرغب بالاستفسار عن تجهيز عشب ومستلزمات الملاعب.'
            )
          }
          className="flex flex-col items-center gap-1 text-emerald-600 hover:text-emerald-700 py-1 px-3 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-[10px] font-bold text-emerald-700">واتساب</span>
        </button>
      </div>

      {/* =====================================================================
          10. FLOATING WHATSAPP BUTTON (Desktop)
         ===================================================================== */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-40 items-center gap-3">
        <button
          type="button"
          onClick={() =>
            openWhatsApp(
              'السلام عليكم شركة الشهباء التجارية، أرغب بالاستفسار عن عشب ومستلزمات الملاعب.'
            )
          }
          className="group relative flex items-center gap-3 px-4.5 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-xl shadow-emerald-900/30 font-bold text-xs sm:text-sm cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-current shrink-0" />
          <span className="font-bold">مبيعات الشهباء | واتساب</span>
        </button>
      </div>

      {/* =====================================================================
          11. PRODUCT DETAIL QUICK-VIEW MODAL (NO CART & NO PRICES)
         ===================================================================== */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onOpenWhatsApp={openWhatsApp}
      />
    </div>
  );
}
