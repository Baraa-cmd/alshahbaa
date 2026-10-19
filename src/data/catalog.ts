export type ProductCategory = 'all' | 'football-turf' | 'cafe-turf' | 'farm-turf' | 'field-supplies';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  unit: string;
  minOrder: number;
  pileHeightMm?: number;
  densityStitches?: number;
  dtex?: number;
  warrantyYears: number;
  origin: string;
  certification: string;
  image: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  recommendedInfill?: {
    sandKgPerSqm: number;
    rubberKgPerSqm: number;
    glueKgPerLinearMeter: number;
  };
}

export interface CaseStudyProject {
  id: string;
  index: string;
  title: string;
  location: string;
  sector: string;
  areaSqm: string;
  completionDuration: string;
  metricHighlight: string;
  turfTypeUsed: string;
  image: string;
  summary: string;
}

export const DEFAULT_WHATSAPP_NUMBER = '966500000000';

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'all': 'كافة المنتجات والتجهيزات',
  'football-turf': 'عشب ملاعب كرة القدم',
  'cafe-turf': 'عشب الكافتيريات والتراسات',
  'farm-turf': 'عشب المزارع والحدائق',
  'field-supplies': 'مستلزمات وتجهيزات الملاعب',
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'shahbaa-fifa-pro-50',
    code: 'SH-FB-50PRO',
    title: 'عشب ملاعب كرة قدم احترافي 50 ملم — FIFA Quality Pro',
    subtitle: 'شعيرات أحادية مقواة بعصب مركزي متين (Monofilament Spine) مصممة للملاعب الرسمية والأكاديميات',
    category: 'football-turf',
    categoryLabel: 'عشب ملاعب كرة القدم',
    unit: 'متر مربع',
    minOrder: 100,
    pileHeightMm: 50,
    densityStitches: 16800,
    dtex: 12500,
    warrantyYears: 8,
    origin: 'نخب أول — مطابق لمواصفات الاتحاد الدولي لكرة القدم',
    certification: 'FIFA Quality Pro / ISO 9001 / CE',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    description:
      'العشب الرياضي المعتمد لدى شركة الشهباء التجارية لتجهيز ملاعب كرة القدم القانونية والسباعية والأولمبية. يتميز بشعيرات بولي إيثيلين ذات ذاكرة ارتدادية فائقة تعود لوضعها العمودي فوراً بعد احتكاك أحذية اللاعبين، مع طبقة دعم ثلاثية مدعمة باللاتكس لمقاومة الاقتلاع والتصريف المائي السريع.',
    features: [
      'شعيرات ثنائية اللون (أخضر زمردي وزيتوني) بمظهر طبيعي غير لامع ومريح للعين',
      'مقاومة فائقة للأشعة فوق البنفسجية UV وثبات لوني حتى 8 سنوات',
      'تصريف مياه سريع بقدرة 60 لتر / الدقيقة للمتر المربع يمنع تشكل البرك',
      'تقليل حرارة السطح بنسبة 18% بفضل تكنولوجيا تبريد الشعيرات',
    ],
    specs: [
      { label: 'ارتفاع الشعيرة', value: '50 ملم' },
      { label: 'الكثافة النسيجية', value: '16,800 غرزة / م²' },
      { label: 'وزن الخيط (Dtex)', value: '12,500 Dtex Monofilament' },
      { label: 'المسافة بين الصفوف', value: '5/8 بوصة' },
      { label: 'طبقة الظهر (Backing)', value: 'PP مزدوج + شبكة + لاتكس SBR' },
      { label: 'عرض الرول القياسي', value: '4 أمتار × 25 متر' },
    ],
    recommendedInfill: {
      sandKgPerSqm: 25,
      rubberKgPerSqm: 12,
      glueKgPerLinearMeter: 0.45,
    },
  },
  {
    id: 'shahbaa-football-heavy-60',
    code: 'SH-FB-60MAX',
    title: 'عشب ملاعب كرة قدم مكثف 60 ملم — Diamond Spine Max',
    subtitle: 'أعلى سماكة وأقصى درجات امتصاص الصدمات للملاعب الخماسية والتجارية كثيفة التشغيل',
    category: 'football-turf',
    categoryLabel: 'عشب ملاعب كرة القدم',
    unit: 'متر مربع',
    minOrder: 100,
    pileHeightMm: 60,
    densityStitches: 18900,
    dtex: 13500,
    warrantyYears: 8,
    origin: 'نخب أول ممتاز — مقاوم للاستخدام الشاق المستمر',
    certification: 'FIFA Standard / EN 15330-1',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1200&q=80',
    description:
      'الخيار المثالي للملاعب الاستثمارية والتجارية التي تعمل لأكثر من 14 ساعة يومياً. يوفر ارتفاع الـ 60 ملم عمقاً إضافياً لاحتواء حبيبات المطاط ورمل السيليكا، مما يقلل تماماً من احتمالية إصابات الركب والمفاصل للاعبين.',
    features: [
      'شعيرات ماسية مقواة (Diamond Shape) تتحمل الركل والانزلاق العنيف',
      'كثافة استثنائية تحافظ على استقامة الحقل لسنوات طويلة',
      'مرونة عالية تحت الأقدام تقلل إجهاد عضلات اللاعبين',
      'عمر افتراضي تشغيلي يصل إلى 10 سنوات مع الصيانة الدورية',
    ],
    specs: [
      { label: 'ارتفاع الشعيرة', value: '60 ملم' },
      { label: 'الكثافة النسيجية', value: '18,900 غرزة / م²' },
      { label: 'وزن الخيط (Dtex)', value: '13,500 Dtex' },
      { label: 'الاستخدام الموصى به', value: 'ملاعب خماسية وسباعية تجارية' },
      { label: 'مقاومة الشد والخلع', value: 'أكثر من 55 نيوتن' },
      { label: 'الضمان المصنعي', value: '8 سنوات' },
    ],
    recommendedInfill: {
      sandKgPerSqm: 28,
      rubberKgPerSqm: 14,
      glueKgPerLinearMeter: 0.45,
    },
  },
  {
    id: 'shahbaa-cafe-luxe-40',
    code: 'SH-CF-40LUX',
    title: 'عشب كافتيريات ولاونجات فاخر 40 ملم — Velvet Cafe Soft',
    subtitle: 'عشب ديكوري رباعي الألوان فائق النعومة معالج ضد الاشتعال والانسكابات اليومية',
    category: 'cafe-turf',
    categoryLabel: 'عشب الكافتيريات والتراسات',
    unit: 'متر مربع',
    minOrder: 20,
    pileHeightMm: 40,
    densityStitches: 19500,
    dtex: 11500,
    warrantyYears: 7,
    origin: 'نخب أول — مخصص لقطاع المقاهي والضيافة',
    certification: 'EN 13501 Fire Retardant / Lead-Free',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    description:
      'ابتكار شركة الشهباء لتجهيز الكافتيريات، التراسات، اللاونجات، وأسطح المقاهي. يجمع بين المظهر الربيعي الطبيعي فائق الجاذبية وبين المقاومة العالية لضغط أرجل الطاولات والكراسي وحركة الزوار، مع معالجة خاصة تمنع انتشار الحريق وسهولة تامة في الغسيل والتعقيم اليومي بالماء.',
    features: [
      'معالجة مثبطة للاشتعال (Fire-Retardant) آمنة لجلسات المقاهي ومناطق الأراجيل',
      'شعيرات بشكل حرف C تقاوم الانضغاط تحت أوزان المقاعد والطاولات الثقيلة',
      'مسام تصريف مزدوجة تمنع ركود المياه وانبعاث أي روائح كريهة',
      'لا يحتاج إلى حشو رمل أو مطاط — جاهز للفرش المباشر على البلاط أو الخشب',
    ],
    specs: [
      { label: 'ارتفاع الشعيرة', value: '40 ملم' },
      { label: 'الكثافة النسيجية', value: '19,500 غرزة / م²' },
      { label: 'تدرج الألوان', value: '4 درجات (أخضر ربيعي + بيج سفلي)' },
      { label: 'مقاومة الحريق', value: 'معتمد فئة Cfl-s1' },
      { label: 'عرض الرول', value: '2 متر أو 4 أمتار' },
      { label: 'الضمان المصنعي', value: '7 سنوات' },
    ],
  },
  {
    id: 'shahbaa-cafe-patio-30',
    code: 'SH-CF-30PRO',
    title: 'عشب كافتيريات وممرات عملي 30 ملم — Dense Commercial',
    subtitle: 'سماكة عملية مريحة ومناسبة للممرات الداخلية والخارجية وعربات الخدمة',
    category: 'cafe-turf',
    categoryLabel: 'عشب الكافتيريات والتراسات',
    unit: 'متر مربع',
    minOrder: 20,
    pileHeightMm: 30,
    densityStitches: 16800,
    dtex: 9800,
    warrantyYears: 6,
    origin: 'نخب تجاري ممتاز — مقاوم للحرارة والرطوبة',
    certification: 'ISO 14001 Eco-Safe',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description:
      'الحل العملي السريع لكافتيريات الجامعات والمدارس والمطاعم الشعبية والتراسات الخارجية. يمنح المكان رونقاً طبيعياً مع سهولة فائقة في كنسه وتنظيفه اليومي وسرعة جفافه.',
    features: [
      'ارتفاع 30 ملم مثالي لحركة عجلات عربات الضيافة والكراسي المتحركة',
      'عزل حراري ممتاز يقلل من حرارة الأسطح والتراسات الإسمنتية',
      'خالٍ تماماً من المواد الضارة والروائح الكيميائية',
      'تركيب سهل وسريع باستخدام أشرطة اللصق المزدوجة',
    ],
    specs: [
      { label: 'ارتفاع الشعيرة', value: '30 ملم' },
      { label: 'الكثافة النسيجية', value: '16,800 غرزة / م²' },
      { label: 'وزن الخيط (Dtex)', value: '9,800 Dtex PE+PP' },
      { label: 'معدل التصريف', value: '60 لتر / م² / دقيقة' },
      { label: 'الضمان المصنعي', value: '6 سنوات' },
    ],
  },
  {
    id: 'shahbaa-farm-royal-45',
    code: 'SH-FM-45ROYAL',
    title: 'عشب مزارع وفلل ملكي 45 ملم — Royal Oasis Landscape',
    subtitle: 'كثافة فائقة وملمس حريري دائم الخضرة للمزارع الخاصة ومحيط المسابح والقصور',
    category: 'farm-turf',
    categoryLabel: 'عشب المزارع والحدائق',
    unit: 'متر مربع',
    minOrder: 30,
    pileHeightMm: 45,
    densityStitches: 22000,
    dtex: 13200,
    warrantyYears: 8,
    origin: 'نخب ملكي عالي الكثافة — مقاوم للكلور والشمس الحارقة',
    certification: 'UV Stabilized 8000 Hours / Chlorine Proof',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
    description:
      'مخصص للمزارع الريفية، الشاليهات، والفلل الراقية. يمنحك مساحات خضراء شاسعة نضرة طوال العام تحاكي أجمل المروج الطبيعية دون هدر قطرة ماء واحدة أو تحمل تكاليف القص والتسميد والرش.',
    features: [
      'أعلى كثافة لاندسكيب (22,000 غرزة/م²) تمنح شعوراً فاخراً تحت القدم الحافية',
      'مقاوم تماماً لمياه المسابح المكلورة وملوحة الآبار الارتوازية بالمزارع',
      'توفير 100% من فواتير مياه الري وتكاليف العمالة الزراعية',
      'طبقة سفلية قوية تمنع نمو الحشائش الضارة وتجمع الحشرات والديدان',
    ],
    specs: [
      { label: 'ارتفاع الشعيرة', value: '45 ملم' },
      { label: 'الكثافة النسيجية', value: '22,000 غرزة / م²' },
      { label: 'وزن الخيط', value: '13,200 Dtex Diamond Shape' },
      { label: 'تحمل الحرارة', value: 'يتحمل حتى 60 درجة مئوية تحت الشمس المباشرة' },
      { label: 'الضمان المصنعي', value: '8 سنوات شاملة' },
    ],
  },
  {
    id: 'shahbaa-stadium-supplies-kit',
    code: 'SH-FB-EQUIP',
    title: 'باقة مستلزمات ملاعب كرة القدم المتكاملة — Stadium Pro Supplies',
    subtitle: 'قوائم مرمى، شباك، حبيبات مطاط SBR، رمل سيليكا، غراء بولي يوريثان، وكشافات إنارة',
    category: 'field-supplies',
    categoryLabel: 'مستلزمات وتجهيزات الملاعب',
    unit: 'طقم تجهيز / بالكمية',
    minOrder: 1,
    warrantyYears: 5,
    origin: 'توريد مباشر وفوري من مستودعات شركة الشهباء المركزية',
    certification: 'FIFA Standard / EN 748 Safety Goalposts',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    description:
      'توفر شركة الشهباء التجارية كافة المستلزمات التكميلية الأساسية لإنشاء وصيانة ملاعب كرة القدم: مرامي ألمنيوم وحديد مجلفن، شباك مرمى وحماية محيطية مقاومة للشمس، حبيبات مطاط SBR أولي نقي بدون شوائب أو أسلاك، رمل سيليكا مغسول ومجفف، غراء بولي يوريثان ثنائي المركب، وأشرطة لحام جوت غير منسوجة.',
    features: [
      'مرامي كرة قدم قانونية وخماسية وسباعية بأعلى متانة وأمان للاعبين',
      'شباك محيطية وسقفية للملاعب بارتفاعات تصل إلى 12 متراً خيط 4 و 5 ملم',
      'حبيبات مطاط SBR مصنفة (1-3 ملم) نقية 99% لامتصاص الصدمات',
      'غراء ملاعب بولي يوريثان مقاوم للرطوبة والمطر وشريط لحام بعرض 30 سم',
      'كشافات إنارة الملاعب الرياضية LED بقدرات عالية مقاومة للعوامل الجوية IP66',
    ],
    specs: [
      { label: 'مرامي كرة القدم', value: 'مقاسات رسمية 11 ضد 11، 7 ضد 7، و 5 ضد 5' },
      { label: 'حبيبات المطاط', value: 'أكياس 25 كجم SBR نقي معالج' },
      { label: 'رمل السيليكا', value: 'مغسول ومجفف حبيبات دائرية 0.2 - 0.8 ملم' },
      { label: 'الغراء اللاصق', value: 'بولي يوريثان PU ثنائي المركب (A+B)' },
      { label: 'شباك الحماية', value: 'بولي بروبيلين عالي المتانة معالج ضد الـ UV' },
      { label: 'التوفر والشحن', value: 'تسليم فوري وشحن لكافة المدن' },
    ],
  },
];

export const CASE_STUDIES: CaseStudyProject[] = [
  {
    id: 'project-stadium-1',
    index: '01',
    title: 'تجهيز مجمع الملاعب الرياضية — ملعبين كرة قدم سباعية بمواصفات الفيفا',
    location: 'المنطقة الصناعية الرياضية',
    sector: 'ملاعب كرة قدم تجارية',
    areaSqm: '4,600 م²',
    completionDuration: '14 يوم عمل',
    metricHighlight: 'توريد كامل للعشب 50 ملم مع حشو السيليكا والمطاط والمرامي والشباك المحيطية',
    turfTypeUsed: 'عشب الشهباء 50 ملم FIFA Quality Pro + طقم مستلزمات الملاعب المتكامل',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    summary: 'تم توريد وفرش العشب مع ضبط خطوط الملعب البيضاء وحشو رمل السيليكا وحبيبات المطاط بنسب دقيقة وفرت امتصاص صدمات فائق للاعبين.',
  },
  {
    id: 'project-cafe-1',
    index: '02',
    title: 'تأثيث وتكسية تراس كافتيريا ولاونج الإطلالة الخضراء',
    location: 'الواجهة البحرية',
    sector: 'كافتيريات وضيافة',
    areaSqm: '920 م²',
    completionDuration: '3 أيام عمل',
    metricHighlight: 'مقاومة كاملة لضغط أرجل الكراسي وسهولة التنظيف اليومي مع مقاومة الحريق',
    turfTypeUsed: 'عشب كافتيريات فاخر 40 ملم Velvet Soft',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    summary: 'تحويل المساحة الخارجية الإسمنتية إلى حديقة ربيعية دافئة رفعت من إقبال الزوار وساعات بقائهم في الكافتيريا بشكل ملحوظ.',
  },
  {
    id: 'project-farm-1',
    index: '03',
    title: 'تنسيق مسطحات مزرعة النخيل واستراحة الواحة الخاصة ومحيط المسبح',
    location: 'ضواحي المدينة',
    sector: 'مزارع خاصة وشاليهات',
    areaSqm: '2,800 م²',
    completionDuration: '6 أيام عمل',
    metricHighlight: 'توفير 100% من مياه الري مع مقاومة كلور المسبح والشمس الحارقة',
    turfTypeUsed: 'عشب مزارع وفلل ملكي 45 ملم Royal Oasis',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1200&q=80',
    summary: 'استبدال المسطحات الترابية بمروج خضراء كثيفة وآمنة تماماً للأطفال والأنشطة العائلية حول المسبح.',
  },
];
