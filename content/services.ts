import type { Copy, Service } from '@/lib/content/types';
const c = (en: string, ar: string): Copy => ({ en, ar });
export const services: Service[] = [
  {
    id: 'audit_assurance', legacyId: '64ae7d153a75882b4691e53c', slug: 'audit-assurance', number: '01',
    name: c('Audit & Assurance', 'المراجعة والتأكيد'),
    short: c('Confidence in the numbers.', 'ثقة في الأرقام.'),
    summary: c('A clearer view of your financial position, with the rigour that sound decisions demand.', 'رؤية أوضح لمركزك المالي، بالدقة التي تحتاجها القرارات السليمة.'),
    introduction: c('Reliable financial information helps boards, owners and investors make informed decisions. Our audit work brings financial reporting, internal controls and the wider business context into focus.', 'تساعد المعلومات المالية الموثوقة مجالس الإدارة والملاك والمستثمرين على اتخاذ قرارات مدروسة. تركز أعمال المراجعة على التقارير المالية والرقابة الداخلية وسياق أعمال المنشأة.'),
    offerings: [
      { name: c('Financial statement audit', 'مراجعة القوائم المالية'), description: c('Independent examination of financial statements and the supporting accounting records.', 'فحص مستقل للقوائم المالية والسجلات المحاسبية الداعمة لها.') },
      { name: c('Transaction due diligence', 'العناية المهنية للصفقات'), description: c('Financial investigation to inform acquisitions, mergers and other business transactions.', 'فحص مالي لدعم قرارات الاستحواذ والاندماج وغيرها من الصفقات.') },
      { name: c('Reporting and consolidation', 'التقارير والتوحيد'), description: c('Support with group reporting, consolidation processes and accounting policies.', 'دعم إعداد تقارير المجموعات وإجراءات توحيد القوائم والسياسات المحاسبية.') },
      { name: c('Control recommendations', 'توصيات الرقابة'), description: c('Practical observations to help management strengthen financial and accounting systems.', 'ملاحظات عملية تساعد الإدارة على تطوير الأنظمة المالية والمحاسبية.') },
    ],
  },
  {
    id: 'internal_audit_risk_compliance', legacyId: '64da619f8aa93ee30dc0ff9d', slug: 'internal-audit-risk-compliance', number: '02',
    name: c('Internal Audit, Risk & Compliance', 'المراجعة الداخلية والمخاطر والالتزام'),
    short: c('Understand risk. Strengthen control.', 'فهم المخاطر وتعزيز الرقابة.'),
    summary: c('An independent perspective on the processes, controls and risks that shape your organisation.', 'رؤية مستقلة للإجراءات والضوابط والمخاطر المؤثرة في منشأتك.'),
    introduction: c('Effective internal audit starts with a clear understanding of how your organisation works. We help businesses establish and develop internal audit functions, assess controls and give management a practical basis for improvement.', 'تبدأ المراجعة الداخلية الفعالة بفهم واضح لطبيعة عمل المنشأة. نساعد الشركات على تأسيس وظائف المراجعة الداخلية وتطويرها وتقييم الضوابط وتزويد الإدارة بأساس عملي للتحسين.'),
    offerings: [
      { name: c('Internal audit function', 'وظيفة المراجعة الداخلية'), description: c('Design and development of an internal audit function appropriate to your organisation.', 'تصميم وتطوير وظيفة مراجعة داخلية تتناسب مع احتياجات المنشأة.') },
      { name: c('Control assessment', 'تقييم الضوابط'), description: c('Review of operational and financial controls, with clear findings for management.', 'مراجعة الضوابط التشغيلية والمالية مع تقديم نتائج واضحة للإدارة.') },
      { name: c('Audit programmes', 'برامج المراجعة'), description: c('Preparation of audit programmes and support with their implementation.', 'إعداد برامج المراجعة ودعم تنفيذها.') },
      { name: c('Team development', 'تطوير الفريق'), description: c('Training and workshops to support the capabilities of internal audit teams.', 'تدريب وورش عمل لدعم قدرات فرق المراجعة الداخلية.') },
    ],
  },
  {
    id: 'tax_zakat', legacyId: '64ae85d2ce928849ed89c8b1', slug: 'tax-zakat', number: '03',
    name: c('Tax & Zakat', 'الضرائب والزكاة'),
    short: c('Clarity on your obligations.', 'وضوح في التزاماتك.'),
    summary: c('Practical support to understand obligations and consider tax in your business decisions.', 'دعم عملي لفهم الالتزامات ومراعاة الجوانب الضريبية في قرارات الأعمال.'),
    introduction: c('Tax considerations are connected to the way a business is structured, financed and operated. Start with a review of your circumstances so the scope of advice reflects your activities and the obligations that apply to you.', 'ترتبط الاعتبارات الضريبية بهيكل المنشأة وتمويلها وطريقة تشغيلها. تبدأ المشورة بمراجعة ظروفك لتحديد نطاق الدعم وفق أنشطتك والالتزامات التي تنطبق عليك.'),
    offerings: [
      { name: c('Compliance support', 'دعم الالتزام'), description: c('Assistance with tax computations, returns and the preparation of supporting records.', 'المساعدة في الحسابات والإقرارات الضريبية وإعداد السجلات الداعمة.') },
      { name: c('Tax planning', 'التخطيط الضريبي'), description: c('Consideration of the tax implications of business structures and transactions.', 'دراسة الآثار الضريبية لهياكل الأعمال والمعاملات.') },
      { name: c('Assessment support', 'دعم الربوط الضريبية'), description: c('Advice on tax assessments and correspondence with the relevant authorities.', 'المشورة بشأن الربوط الضريبية والمراسلات مع الجهات المختصة.') },
      { name: c('Cross-border considerations', 'اعتبارات الأعمال الدولية'), description: c('Identification of international tax questions requiring coordinated local and specialist advice.', 'تحديد المسائل الضريبية الدولية التي تتطلب تنسيق المشورة المحلية والمتخصصة.') },
    ],
  },
  {
    id: 'accounting_advisory', legacyId: '64ae85cace928849ed89c8ae', slug: 'accounting-advisory', number: '04',
    name: c('Accounting & Advisory', 'المحاسبة والاستشارات'),
    short: c('Make your information work harder.', 'معلومات تدعم قراراتك.'),
    summary: c('Useful financial information and practical support for the decisions you make every day.', 'معلومات مالية مفيدة ودعم عملي للقرارات التي تتخذها يومياً.'),
    introduction: c('Good accounting turns day-to-day activity into information you can use. We support financial reporting, accounting systems and management information so the financial picture is easier to understand and act on.', 'تحوّل المحاسبة الجيدة النشاط اليومي إلى معلومات قابلة للاستخدام. ندعم التقارير المالية والأنظمة المحاسبية ومعلومات الإدارة لتسهيل فهم الصورة المالية واتخاذ القرارات.'),
    offerings: [
      { name: c('Accounting systems', 'الأنظمة المحاسبية'), description: c('Design and review of accounting processes, policies and systems.', 'تصميم ومراجعة الإجراءات والسياسات والأنظمة المحاسبية.') },
      { name: c('Financial reporting', 'التقارير المالية'), description: c('Support with periodic financial statements and reporting requirements.', 'دعم إعداد القوائم المالية الدورية ومتطلبات التقارير.') },
      { name: c('Management information', 'معلومات الإدارة'), description: c('Budgets, reporting and cost analysis to support management decisions.', 'الموازنات والتقارير وتحليل التكاليف لدعم القرارات الإدارية.') },
      { name: c('Financial advice', 'المشورة المالية'), description: c('Practical analysis of profitability, funding requirements and business expansion.', 'تحليل عملي للربحية واحتياجات التمويل والتوسع في الأعمال.') },
    ],
  },
  {
    id: 'management_consulting', legacyId: '64ae85cdce928849ed89c8af', slug: 'management-consulting', number: '05',
    name: c('Management Consulting', 'الاستشارات الإدارية'),
    short: c('Turn ambition into a considered plan.', 'خطط مدروسة لطموحاتك.'),
    summary: c('A considered approach to strategy, financial planning and organisational priorities.', 'منهج مدروس للاستراتيجية والتخطيط المالي وأولويات المنشأة.'),
    introduction: c('A business plan needs to connect ambition with operational and financial realities. We work through your priorities, assess the available information and help you consider the choices ahead.', 'تحتاج خطة الأعمال إلى ربط الطموح بالواقع التشغيلي والمالي. ندرس أولوياتك ونقيّم المعلومات المتاحة ونساعدك على فهم الخيارات القادمة.'),
    offerings: [
      { name: c('Strategic review', 'المراجعة الاستراتيجية'), description: c('Review of business direction, operating strengths and management priorities.', 'مراجعة اتجاه الأعمال ونقاط القوة التشغيلية والأولويات الإدارية.') },
      { name: c('Policy development', 'تطوير السياسات'), description: c('Definition and review of policies that guide the organisation.', 'إعداد ومراجعة السياسات التي توجه عمل المنشأة.') },
      { name: c('Financial planning', 'التخطيط المالي'), description: c('Cash-flow scenarios and analysis of financial requirements.', 'دراسة سيناريوهات التدفقات النقدية وتحليل الاحتياجات المالية.') },
      { name: c('Opportunity assessment', 'تقييم الفرص'), description: c('Structured consideration of business and investment opportunities.', 'دراسة منظمة لفرص الأعمال والاستثمار.') },
    ],
  },
  {
    id: 'operations_technology', legacyId: '64ae85d5ce928849ed89c8b2', slug: 'operations-technology', number: '06',
    name: c('Operations & Technology', 'العمليات والتقنية'),
    short: c('Better systems. Clearer information.', 'أنظمة أفضل ومعلومات أوضح.'),
    summary: c('Connect the way your business operates with the systems and information it needs.', 'ربط طريقة تشغيل أعمالك بالأنظمة والمعلومات التي تحتاجها.'),
    introduction: c('Technology is most useful when it serves a clear operational purpose. We help examine processes and information needs, then consider the systems that support efficiency and management decisions.', 'تكون التقنية أكثر فائدة عندما تخدم هدفاً تشغيلياً واضحاً. نساعد في دراسة الإجراءات واحتياجات المعلومات ثم تحديد الأنظمة الداعمة للكفاءة والقرارات الإدارية.'),
    offerings: [
      { name: c('Operational review', 'المراجعة التشغيلية'), description: c('Analysis of how processes and responsibilities connect across the business.', 'تحليل ترابط الإجراءات والمسؤوليات داخل المنشأة.') },
      { name: c('Information requirements', 'متطلبات المعلومات'), description: c('Definition of the information management needs to monitor and direct operations.', 'تحديد المعلومات التي تحتاجها الإدارة لمتابعة العمليات وتوجيهها.') },
      { name: c('Systems planning', 'تخطيط الأنظمة'), description: c('Planning and design support for systems that fit business requirements.', 'دعم تخطيط وتصميم الأنظمة بما يتناسب مع متطلبات الأعمال.') },
      { name: c('Implementation support', 'دعم التنفيذ'), description: c('Support in putting agreed systems and processes into practice.', 'دعم تطبيق الأنظمة والإجراءات المتفق عليها.') },
    ],
  },
];

