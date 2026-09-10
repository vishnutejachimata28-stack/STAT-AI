import { MCQQuestion, CumulativeAssessment } from '../types';

export const MCQ_QUESTIONS_BANK: MCQQuestion[] = [
  // ==========================================
  // TOPIC 1: Indian Official Statistical System (IOSS)
  // ==========================================
  // EASY
  {
    id: 'ioss-easy-1',
    lectureId: 'ioss-stat-system',
    partNumber: 1,
    difficulty: 'easy',
    question: 'Under which Schedule of the Constitution of India is the subject of "Inquiries and Statistics" allocated between the Union and State governments?',
    options: [
      'Seventh Schedule (Concurrent List Entry 45)',
      'Eighth Schedule (Official Languages)',
      'Third Schedule (Oaths and Affirmations)',
      'Eleventh Schedule (Panchayati Raj)'
    ],
    correctIndex: 0,
    explanation: 'Entry 45 of the Concurrent List in the Seventh Schedule allocates "Inquiries and Statistics" concurrently to both Union and State governments.',
    hint: 'Think about the Schedule that divides powers between Union, State, and Concurrent Lists.',
    statConceptRef: 'Constitution of India, Seventh Schedule, Entry 45 of List III'
  },
  {
    id: 'ioss-easy-2',
    lectureId: 'ioss-stat-system',
    partNumber: 2,
    difficulty: 'easy',
    question: 'Who is recognized as the father of modern Indian statistics and the founder of the Indian Statistical Institute (ISI)?',
    options: [
      'Prof. P.C. Mahalanobis',
      'Dr. C.R. Rao',
      'Dr. Manmohan Singh',
      'Dr. Amartya Sen'
    ],
    correctIndex: 0,
    explanation: 'Prof. Prasanta Chandra Mahalanobis founded ISI in 1931 and pioneered large-scale sample surveys and the Mahalanobis Distance.',
    hint: 'India celebrates National Statistics Day on June 29 marking his birth anniversary.',
    statConceptRef: 'National Statistics Day Presidential Declaration'
  },

  // MODERATE (Default starting tier)
  {
    id: 'ioss-mod-1',
    lectureId: 'ioss-stat-system',
    partNumber: 1,
    difficulty: 'moderate',
    question: 'Which commission recommended the establishment of the National Statistical Commission (NSC) as an independent apex policy body for Indian statistics?',
    options: [
      'National Statistical Commission Review under Dr. C. Rangarajan (2001)',
      'Kothari Education Commission (1964)',
      'Kelkar Committee on Tax Reforms',
      'Sarkaria Commission on Centre-State Relations'
    ],
    correctIndex: 0,
    explanation: 'The Rangarajan Commission (2001) reviewed the statistical system and recommended establishing the NSC to insulate statistical activities from executive influence.',
    hint: 'He was a former Governor of the Reserve Bank of India and renowned economist.',
    statConceptRef: 'Report of the National Statistical Commission (Rangarajan Committee, 2001)'
  },
  {
    id: 'ioss-mod-2',
    lectureId: 'ioss-stat-system',
    partNumber: 2,
    difficulty: 'moderate',
    question: 'Under Section 11 of the Collection of Statistics Act, 2008, what is the legal safeguard regarding data collected from informants?',
    options: [
      'It cannot be admitted as evidence against the informant in any prosecution or tax assessment',
      'It must be published openly on government portals within 24 hours without redaction',
      'It can be directly seized by commercial competitors through standard RTI applications',
      'It is shared without informant consent with foreign rating agencies'
    ],
    correctIndex: 0,
    explanation: 'Section 11 strictly bars the disclosure and admissibility of individual statistical returns as evidence against informants in taxation or criminal proceedings.',
    hint: 'Trust in official statistics requires absolute legal confidentiality escrow.',
    statConceptRef: 'Collection of Statistics Act, 2008, Section 11 & Section 13'
  },

  // HARD
  {
    id: 'ioss-hard-1',
    lectureId: 'ioss-stat-system',
    partNumber: 2,
    difficulty: 'hard',
    question: 'The Collection of Statistics (Amendment) Act, 2017 introduced an extraterritorial provision primarily to resolve which jurisdictional challenge?',
    options: [
      'Allowing the Central Government to collect statistics from Indian citizens and enterprises residing in or operating across the former State of Jammu & Kashmir and outside territorial waters',
      'Allowing local municipal councils to tax multinational corporations directly',
      'Abolishing the State Directorates of Economics and Statistics (DES)',
      'Transferring the Office of the Registrar General of India to the Ministry of Finance'
    ],
    correctIndex: 0,
    explanation: 'The 2017 Amendment Act extended the central mandate of statistics collection to matters falling under the Union List in Jammu and Kashmir (pre-2019 status) and offshore economic zones.',
    hint: 'Consider the special legislative status and offshore economic exploration zones addressed in 2017.',
    statConceptRef: 'Collection of Statistics (Amendment) Act, 2017 (Act No. 21 of 2017)'
  },
  {
    id: 'ioss-hard-2',
    lectureId: 'ioss-stat-system',
    partNumber: 3,
    difficulty: 'hard',
    question: 'Under the Indian National Quality Assurance Framework (India-NQAF), which metric is mandated to measure sample estimate reliability before official release?',
    options: [
      'Relative Standard Error (RSE) - with estimates having RSE > 20% flagged with caution',
      'Simple arithmetic mean difference between two random field enumerators',
      'Number of media citations received in the initial 48 hours',
      'Correlation with parallel private sector sentiment polls'
    ],
    correctIndex: 0,
    explanation: 'India-NQAF standards stipulate that sampling reliability must be reported using Relative Standard Error (RSE), and estimates with RSE exceeding 20% must be flagged for low reliability.',
    hint: 'A standard statistical metric expressing standard error as a percentage of the estimate.',
    statConceptRef: 'India-NQAF Technical Manual, MoSPI Chapter 4 (Accuracy & Reliability)'
  },

  // EXPERT
  {
    id: 'ioss-exp-1',
    lectureId: 'ioss-stat-system',
    partNumber: 3,
    difficulty: 'expert',
    question: 'When reconciling divergent estimates between the Annual Survey of Industries (ASI) and MCA-21 corporate database for manufacturing GVA, which methodological adjustment is applied?',
    options: [
      'Differentiating between the Establishment approach (factory gate physical boundary in ASI) and the Enterprise approach (consolidated balance sheet with off-site R&D in MCA-21), applying the blowing-up factor for non-filing shell corporations',
      'Discarding all ASI returns and substituting them purely with GST E-way bills',
      'Averaging both estimates with equal 50:50 weights regardless of enterprise turnover',
      'Applying the wholesale deflator inversely to nominal wages in unorganized MSMEs'
    ],
    correctIndex: 0,
    explanation: 'ASI measures factory-level output (establishment approach), whereas MCA-21 aggregates enterprise-wide financials including headquarters, design, and auxiliary services. Expert reconciliation accounts for blowing-up active vs non-reporting companies.',
    hint: 'Consider the distinction between establishment level vs enterprise consolidated level.',
    statConceptRef: 'Advisory Committee on National Accounts (ACNA) White Paper on Corporate GVA Estimation'
  },

  // ==========================================
  // TOPIC 2: Consumer Price Index (CPI) & Inflation
  // ==========================================
  // EASY
  {
    id: 'cpi-easy-1',
    lectureId: 'cpi-inflation-compilation',
    partNumber: 1,
    difficulty: 'easy',
    question: 'What is the current base year for the Consumer Price Index (CPI Combined) compiled by MoSPI?',
    options: [
      '2012 = 100',
      '2004-05 = 100',
      '1993-94 = 100',
      '2020 = 100'
    ],
    correctIndex: 0,
    explanation: 'The current headline Consumer Price Index (CPI - Rural, Urban, Combined) in India has a base year of 2012 = 100.',
    hint: 'It was introduced in early 2015 replacing the older 2010 preliminary series.',
    statConceptRef: 'MoSPI CSO Press Release on CPI Revision (2012=100)'
  },
  {
    id: 'cpi-easy-2',
    lectureId: 'cpi-inflation-compilation',
    partNumber: 1,
    difficulty: 'easy',
    question: 'Which group holds the largest weight (over 45%) in India’s CPI Combined basket?',
    options: [
      'Food and Beverages',
      'Housing',
      'Fuel and Light',
      'Clothing and Footwear'
    ],
    correctIndex: 0,
    explanation: 'Food and Beverages constitutes 45.86% of the CPI Combined basket, making Indian headline inflation heavily susceptible to food price shocks.',
    hint: 'Reflects the Engel curve pattern in developing economies where essential dietary consumption dominates budgets.',
    statConceptRef: 'CPI Weighting Diagram, Central Statistics Office'
  },

  // MODERATE
  {
    id: 'cpi-mod-1',
    lectureId: 'cpi-inflation-compilation',
    partNumber: 1,
    difficulty: 'moderate',
    question: 'Why does the "Housing" category have a 0% weight in the Rural CPI basket in India?',
    options: [
      'Rural housing is predominantly owner-occupied and the market for commercial rental dwelling in villages is statistically negligible',
      'Rural families do not spend any income on home maintenance',
      'Housing is subsidized 100% by the central government',
      'The data collection software cannot record rural village addresses'
    ],
    correctIndex: 0,
    explanation: 'In rural India, commercial cash rental markets are extremely rare. Because standard CPI tracks market rental outlays rather than imputed rent, housing has zero weight in Rural CPI.',
    hint: 'Look at the nature of tenancy and rental transactions in rural habitations.',
    statConceptRef: 'MoSPI Technical Guidelines on Urban vs Rural CPI Compilation'
  },
  {
    id: 'cpi-mod-2',
    lectureId: 'cpi-inflation-compilation',
    partNumber: 2,
    difficulty: 'moderate',
    question: 'Which index formula is employed at the elementary quotation level to aggregate price observations across multiple markets within a district?',
    options: [
      'Jevons Index (Geometric Mean of Price Relatives)',
      'Simple Arithmetic Range difference',
      'Fisher Ideal Double Superlative Index',
      'Carli Arithmetic Average without base revision'
    ],
    correctIndex: 0,
    explanation: 'MoSPI uses the Jevons Index (geometric mean of price ratios) for elementary aggregates because it satisfies the time reversal test and mitigates upward bias.',
    hint: 'Formula involving the n-th root of the product of price ratios.',
    statConceptRef: 'ILO CPI Manual: Theory and Practice & MoSPI Methodology'
  },

  // HARD
  {
    id: 'cpi-hard-1',
    lectureId: 'cpi-inflation-compilation',
    partNumber: 2,
    difficulty: 'hard',
    question: 'In CPI compilation, when an exact item specification becomes permanently unavailable in a designated market, which imputation method is officially mandated?',
    options: [
      'Matched replacement with quality adjustment (Overlap pricing or Class-mean imputation)',
      'Setting the missing item price to zero immediately',
      'Carrying forward the baseline 2012 price unchanged permanently',
      'Deleting the entire state index from national tally'
    ],
    correctIndex: 0,
    explanation: 'When an item disappears, the standard statistical practice is matched replacement with quality adjustment (overlap method or class-mean imputation) to isolate true price change from quality upgrade.',
    hint: 'Ensures pure price inflation is isolated from product quality improvements.',
    statConceptRef: 'Manual on Consumer Price Index (NSO, India Chapter 8: Missing Prices & Quality Adjustments)'
  },

  // EXPERT
  {
    id: 'cpi-exp-1',
    lectureId: 'cpi-inflation-compilation',
    partNumber: 2,
    difficulty: 'expert',
    question: 'Under the Flexible Inflation Targeting (FIT) framework under Section 45ZA of the RBI Act, what constitutes a failure to maintain the inflation target?',
    options: [
      'When the average headline CPI inflation remains higher than 6% or lower than 2% for any three consecutive quarters',
      'When month-on-month CPI rises by more than 0.5% in two consecutive months',
      'When food inflation exceeds wholesale manufacturing inflation for six weeks',
      'When the Indian rupee depreciates against the US dollar by more than 5%'
    ],
    correctIndex: 0,
    explanation: 'Under the amended RBI Act (2016) and Monetary Policy Framework Agreement, failure is defined as headline CPI inflation breaching the 2% to 6% band (4% +/- 2%) for three consecutive quarters.',
    hint: 'Focus on the statutory three consecutive quarters rule and the 4 +/- 2% band.',
    statConceptRef: 'Reserve Bank of India Act, 1934, Section 45ZA & Section 45ZN'
  },

  // ==========================================
  // TOPIC 3: National Accounts Statistics (GDP/GVA)
  // ==========================================
  // MODERATE
  {
    id: 'nas-mod-1',
    lectureId: 'national-accounts-gdp',
    partNumber: 1,
    difficulty: 'moderate',
    question: 'What is the exact accounting equation connecting GVA at Basic Prices to GDP at Market Prices in the Indian National Accounts?',
    options: [
      'GDP at Market Prices = GVA at Basic Prices + (Product Taxes - Product Subsidies)',
      'GDP at Market Prices = GVA at Basic Prices - (Production Taxes + Product Taxes)',
      'GDP at Market Prices = GVA at Factor Cost / Exchange Rate',
      'GDP at Market Prices = GVA at Basic Prices + Wholesale Price Index'
    ],
    correctIndex: 0,
    explanation: 'Under SNA 2008 adopted in 2015, GDP at Market Prices equals the sum of GVA at Basic Prices across all economic sectors plus Net Product Taxes (Product Taxes minus Product Subsidies).',
    hint: 'Recall that product taxes (like GST) are added, and subsidies are subtracted.',
    statConceptRef: 'System of National Accounts (SNA 2008) & CSO National Accounts Series'
  },
  // HARD
  {
    id: 'nas-hard-1',
    lectureId: 'national-accounts-gdp',
    partNumber: 1,
    difficulty: 'hard',
    question: 'Which of the following is categorized as a "Production Tax" (volume-independent) rather than a "Product Tax" in Indian National Accounts?',
    options: [
      'Land Revenue, Stamp Duty and Registration Fees, and Municipal Professional Tax',
      'Goods and Services Tax (GST) on finished consumer products',
      'Customs Import Duty levied per container of electronics',
      'Central Excise Duty levied per litre of petroleum products'
    ],
    correctIndex: 0,
    explanation: 'Production taxes are paid in respect of production activities independent of the volume or value of actual output (e.g. land revenue, stamp duties, professional taxes).',
    hint: 'Taxes paid merely to maintain the enterprise or land, regardless of how many units are manufactured.',
    statConceptRef: 'SNA 2008 Paragraph 6.89: Taxes on Production vs Taxes on Products'
  },
  // EXPERT
  {
    id: 'nas-exp-1',
    lectureId: 'national-accounts-gdp',
    partNumber: 2,
    difficulty: 'expert',
    question: 'When estimating real GVA in the service sector where direct volume indicators are absent, the "Double Deflation" vs "Single Deflation" dilemma manifests because:',
    options: [
      'Single deflation deflates nominal gross output using a single output price index while implicitly assuming intermediate consumption prices change at the exact same rate, which severely distorts real value added during commodity price volatility',
      'Double deflation doubles the tax incidence on corporate balance sheets',
      'Single deflation is exclusively reserved for agricultural food crops',
      'Double deflation requires three independent census rounds per fiscal year'
    ],
    correctIndex: 0,
    explanation: 'Double deflation deflates gross output with output indices and intermediate inputs with input indices independently. Single deflation distorts real value added when input costs fluctuate disproportionately.',
    hint: 'Examine the assumption made about input prices when only output is deflated.',
    statConceptRef: 'Report of the Working Group on Real GVA Estimation and Deflators (MoSPI)'
  }
];

export const CUMULATIVE_ASSESSMENTS: CumulativeAssessment[] = [
  {
    id: 'cum-ioss-all-india',
    title: 'All-India National Statistical Service (IOSS) Comprehensive Cadre Examination',
    domain: 'Official Statistical Systems & Macroeconomic Governance',
    description: 'A 15-question adaptive assessment spanning Constitutional statistics, Collection of Statistics Act, CPI methodology, and National Accounts.',
    totalQuestions: 15,
    timeLimitMinutes: 20,
    topicsCovered: ['IOSS Architecture', 'Collection of Statistics Act', 'CPI & Inflation', 'National Accounts (SNA 2008)']
  },
  {
    id: 'cum-cpi-price-stat',
    title: 'Price Statistics & Inflation Indexation Advanced Certification',
    domain: 'Macroeconomics & Monetary Policy Operations',
    description: 'Rigorous assessment on Jevons aggregation, Engel basket expenditure weights, hedonic imputation, and RBI Flexible Inflation Targeting.',
    totalQuestions: 10,
    timeLimitMinutes: 15,
    topicsCovered: ['CPI Rural/Urban', 'Jevons Formula', 'Imputation & Matched Replacement', 'Monetary Policy Framework']
  }
];
