import type { Copy, Insight } from '@/lib/content/types';
const c = (en: string, ar: string): Copy => ({ en, ar });
export const insights: Insight[] = [
  {
    slug: 'doing-business-in-saudi-arabia', category: 'business', image: '/images/riyadh.jpg',
    title: c('Doing business in Saudi Arabia starts with understanding it.', 'فهم السوق هو البداية لممارسة الأعمال في السعودية.'),
    summary: c('The questions worth asking before your next step in the Kingdom.', 'الأسئلة التي تستحق طرحها قبل خطوتك القادمة في المملكة.'),
    sections: [
      { title: c('Start with your business model', 'ابدأ بنموذج أعمالك'), body: c('Before considering a new market or a new entity, define what the business will do, who its customers will be and how it will operate. These decisions shape the questions you need to take to your legal, tax and accounting advisers.', 'قبل دخول سوق جديدة أو تأسيس كيان جديد، حدد أنشطة المنشأة وعملاءها وطريقة تشغيلها. تحدد هذه القرارات الأسئلة التي ينبغي مناقشتها مع مستشاريك القانونيين والضريبيين والمحاسبيين.') },
      { title: c('Connect finance with operations', 'اربط الشؤون المالية بالعمليات'), body: c('Consider how contracts, invoicing, staffing and reporting fit together. A clear operating model makes it easier to identify record-keeping needs and to plan for the information owners and managers will require.', 'ادرس ترابط العقود والفوترة والتوظيف والتقارير. يسهّل نموذج التشغيل الواضح تحديد متطلبات حفظ السجلات والتخطيط للمعلومات التي يحتاجها الملاك والمديرون.') },
      { title: c('Ask for advice specific to your circumstances', 'اطلب مشورة تراعي ظروفك'), body: c('A general overview is a starting point. The next conversation should address your activities, ownership structure and plans. Bring those details to your advisers so the scope of work can be defined around your business.', 'تشكّل النظرة العامة نقطة بداية. يجب أن تتناول المناقشة التالية أنشطتك وهيكل الملكية وخططك. شارك هذه التفاصيل مع مستشاريك لتحديد نطاق العمل وفق احتياجات منشأتك.') },
    ],
  },
  {
    slug: 'preparing-for-a-financial-audit', category: 'audit', image: '/images/saudi-business.jpg',
    title: c('A better audit starts before the audit.', 'تبدأ المراجعة الأفضل قبل بدء أعمالها.'),
    summary: c('How clear records and early conversations support a more useful audit process.', 'كيف تدعم السجلات الواضحة والمناقشات المبكرة عملية المراجعة.'),
    sections: [
      { title: c('Agree the scope early', 'اتفق على النطاق مبكراً'), body: c('Discuss the reporting period, the financial statements involved and the people responsible for providing information. An early planning conversation helps the audit team and management identify key dependencies.', 'ناقش الفترة المالية والقوائم المعنية والأشخاص المسؤولين عن توفير المعلومات. تساعد مناقشات التخطيط المبكرة فريق المراجعة والإدارة على تحديد المتطلبات الرئيسية.') },
      { title: c('Make the evidence easy to follow', 'سهّل تتبع الأدلة'), body: c('Organised supporting records, reconciliations and explanations help connect the financial statements with the underlying activity. Identify gaps early and agree how outstanding information will be provided.', 'تساعد السجلات الداعمة المنظمة والتسويات والإيضاحات على ربط القوائم المالية بالنشاط الفعلي. حدد النواقص مبكراً واتفق على آلية تقديم المعلومات المتبقية.') },
      { title: c('Use the conversation', 'استفد من المناقشة'), body: c('The audit process can give management an opportunity to discuss accounting systems and internal controls. Keep a record of observations and agreed follow-up actions so useful recommendations receive attention.', 'تتيح عملية المراجعة للإدارة فرصة مناقشة الأنظمة المحاسبية والرقابة الداخلية. احتفظ بسجل للملاحظات وإجراءات المتابعة المتفق عليها لضمان الاهتمام بالتوصيات المفيدة.') },
    ],
  },
  {
    slug: 'financial-information-for-better-decisions', category: 'advisory', image: '/images/riyadh.jpg',
    title: c('What are your numbers really telling you?', 'ما الذي تخبرك به أرقامك فعلاً؟'),
    summary: c('Moving from financial reporting to information you can act on.', 'من التقارير المالية إلى معلومات تدعم اتخاذ القرار.'),
    sections: [
      { title: c('Begin with the decision', 'ابدأ بالقرار'), body: c('Useful management information starts with a question. Whether you are reviewing costs, considering expansion or planning cash flow, decide what you need to understand before adding another report.', 'تبدأ المعلومات الإدارية المفيدة بسؤال واضح. سواء كنت تراجع التكاليف أو تفكر في التوسع أو تخطط للتدفقات النقدية، حدد ما تحتاج إلى فهمه قبل إضافة تقرير آخر.') },
      { title: c('Look at the relationships', 'انظر إلى العلاقات'), body: c('Profitability, cash flow and investment needs are connected, but they describe different aspects of the business. Review them together and understand the assumptions behind forecasts and budgets.', 'ترتبط الربحية والتدفقات النقدية والاحتياجات الاستثمارية ببعضها، لكنها تصف جوانب مختلفة من الأعمال. راجعها معاً وافهم الافتراضات التي تستند إليها التوقعات والموازنات.') },
      { title: c('Build a repeatable review', 'ضع آلية مراجعة منتظمة'), body: c('Agree who prepares the information, who reviews it and what action follows. Consistent definitions and a regular review cycle help management make comparisons that mean something.', 'اتفق على مسؤوليات إعداد المعلومات ومراجعتها والإجراءات التي تلي ذلك. تساعد التعريفات المتسقة ودورة المراجعة المنتظمة الإدارة على إجراء مقارنات مفيدة.') },
    ],
  },
];

