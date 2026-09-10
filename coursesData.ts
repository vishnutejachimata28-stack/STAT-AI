import { CourseLecture } from '../types';

export const COURSES_DATA: CourseLecture[] = [
  {
    id: 'ioss-stat-system',
    title: 'Indian Official Statistical System (IOSS): Architecture & Legal Mandate',
    domain: 'Official Statistics & Governance',
    aim: 'Master the institutional framework, constitutional provisions, and legal acts governing national data collection in India',
    targetSkill: 'Statutory Data Auditing & NQAF Implementation',
    author: 'Dr. T.C.A. Anant (Former Chief Statistician of India)',
    authorDesignation: 'Honorary Faculty, National Statistical Systems Training Academy (NSSTA)',
    ministryDepartment: 'Ministry of Statistics and Programme Implementation (MoSPI)',
    recommendedLevel: 'moderate',
    tags: ['IOSS', 'NSC', 'Collection of Statistics Act', 'MoSPI', 'NQAF'],
    parts: [
      {
        partNumber: 1,
        title: 'Part 1: Constitutional Mandate & Mahalanobis Institutional Evolution',
        estimatedMinutes: 18,
        summary: 'Examines the federal allocation of statistics under the 7th Schedule, the pivotal reforms led by Prof. P.C. Mahalanobis, and the genesis of Central Statistics Office (CSO) and NSSO.',
        content: {
          overview: 'The Indian Official Statistical System (IOSS) is fundamentally decentralized both laterally among central ministries and vertically between the Union Government and the States. Understanding this division is critical for ensuring non-duplication of administrative records and sample data.',
          sections: [
            {
              heading: '1. Federal Division: 7th Schedule Provisions',
              body: [
                'Under the Constitution of India, statistics is a subject distributed across the Union, State, and Concurrent Lists.',
                'Entry 69 of the Union List mandates the Union Government to conduct the Census of Population. Entry 94 of the Union List empowers the Centre to collect inquiries and statistics on matters under Union jurisdiction.',
                'Significantly, Entry 45 of the Concurrent List ("Inquiries and Statistics for the purpose of any of the matters in this List") enables both Union and State legislatures to pass statutory data collection measures.',
              ],
              keyTakeaway: 'Data collection is a Concurrent power in India; coordination between MoSPI and State Directorates of Economics and Statistics (DES) is paramount.',
              circularRef: 'Seventh Schedule, Constitution of India & MoSPI Inter-State Coordination Directive 2021',
            },
            {
              heading: '2. The Mahalanobis Paradigm and NSS Creation (1950)',
              body: [
                'In 1949, Prof. P.C. Mahalanobis was appointed Honorary Statistical Adviser to the Union Cabinet. Recognizing that post-independence India lacked reliable socioeconomic data for central planning, he formulated the National Sample Survey (NSS) in 1950.',
                'The Indian Statistical Institute (ISI) in Kolkata initially handled survey design and tabulation, while the Government of India managed field operations. This dual structure merged into the National Sample Survey Organisation (NSSO) in 1970.',
                'The historic Rangrajan Commission (2001) later recommended unified governance under the National Statistical Commission (NSC) to insulate statistical activities from political interference.',
              ],
              keyTakeaway: 'The apex institutional anchor is the National Statistical Commission (NSC), established following the Rangarajan Commission recommendations.',
            }
          ],
          diagram: {
            type: 'hierarchy',
            title: 'Apex Structure of the Indian Official Statistical System',
            caption: 'Inter-relationship between National Statistical Commission (NSC), MoSPI, NSO Divisions, and State DES',
            nodes: [
              { id: 'nsc', label: 'National Statistical Commission (NSC)', subtext: 'Apex Policy & Oversight Body', type: 'highlight' },
              { id: 'mospi', label: 'MoSPI (Ministry of Stats & PI)', subtext: 'Executive Ministry under CSI', type: 'process' },
              { id: 'nso', label: 'National Statistical Office (NSO)', subtext: 'Unified Operating Cadre (CSO + NSSO)', type: 'process' },
              { id: 'fod', label: 'Field Operations Division (FOD)', subtext: 'Primary Survey Data Collection', type: 'input' },
              { id: 'nad', label: 'National Accounts Division (NAD)', subtext: 'GDP, GVA & Macro Aggregates', type: 'output' },
              { id: 'state_des', label: 'State DES (Directorates of Econ & Stats)', subtext: 'State Level Statistical Coordination', type: 'input' }
            ],
            connections: [
              { from: 'nsc', to: 'mospi', label: 'Advises & Audits' },
              { from: 'mospi', to: 'nso', label: 'Administer' },
              { from: 'nso', to: 'fod', label: 'Supervises' },
              { from: 'nso', to: 'nad', label: 'Compiles' },
              { from: 'mospi', to: 'state_des', label: 'Inter-State Forum' }
            ]
          },
          video: {
            title: 'Constitutional Architecture of Indian Statistics by Dr. T.C.A. Anant',
            duration: '14m 30s',
            instructor: 'Dr. T.C.A. Anant, Former CSI',
            videoUrl: 'https://example.gov.in/embed/ioss-video-part1',
            transcriptSnippet: 'When we analyze Entry 45 of the Concurrent List, the primary friction point historically has been standardizing definitions across state boundaries. If Bihar and Maharashtra measure unorganized manufacturing differently, national aggregation fails...'
          }
        }
      },
      {
        partNumber: 2,
        title: 'Part 2: Collection of Statistics Act 2008 & Statutory Authorities',
        estimatedMinutes: 22,
        summary: 'In-depth study of the statutory powers granted under the Collection of Statistics Act 2008 and Amendment Act 2017, covering penalty clauses, data confidentiality, and statistical officers.',
        content: {
          overview: 'The Collection of Statistics Act, 2008 replaced the outdated 1953 Act to broaden data collection across economic, demographic, social, and environmental spheres while guaranteeing data privacy to informants.',
          sections: [
            {
              heading: '1. Appointment and Mandate of Statistics Officers (Section 4)',
              body: [
                'The appropriate government may appoint Statistics Officers for any geographical area or administrative unit to supervise data gathering.',
                'The Statistics Officer holds powers to serve statutory notices, inspect premises, and demand accounting books relevant to the designated statistical inquiry.',
              ],
              keyTakeaway: 'Refusal to furnish information or deliberately providing false data under the Act attracts penalties and summary judicial procedures.',
              circularRef: 'The Collection of Statistics Act, 2008 (No. 7 of 2009)'
            },
            {
              heading: '2. Ironclad Confidentiality Guarantees (Section 9 - 14)',
              body: [
                'Information obtained under the Act cannot be used as evidence for taxation, criminal prosecution, or regulatory penalties against the respondent.',
                'Individual responses are exempted from the Right to Information (RTI) Act to safeguard personal and commercial secrecy.',
                'Breaching confidentiality by any government official or contracted data agency incurs severe criminal liability (imprisonment up to 6 months and substantial fines).',
              ],
              keyTakeaway: 'The trust of informants rests on Section 11: Statistical data collected under statutory notice is inadmissible as evidence against the informant in tax courts.',
            }
          ],
          diagram: {
            type: 'flow',
            title: 'Statutory Notice & Compliance Pipeline under Section 6',
            caption: 'Step-by-step statutory enforcement workflow from notice generation to confidentiality escrow',
            nodes: [
              { id: 'step1', label: 'Statutory Notification', subtext: 'Gazette order under Sec 3', type: 'input' },
              { id: 'step2', label: 'Notice to Informant', subtext: 'Form Served with 30-day window', type: 'process' },
              { id: 'step3', label: 'Field Verification', subtext: 'Inspections & Data Validation', type: 'process' },
              { id: 'step4', label: 'Data Encryption / Escrow', subtext: 'Anonymization & Sec 11 Secrecy', type: 'output' },
            ],
            connections: [
              { from: 'step1', to: 'step2', label: 'Issued by Officer' },
              { from: 'step2', to: 'step3', label: 'Response Received' },
              { from: 'step3', to: 'step4', label: 'Confidential Compilation' }
            ]
          }
        }
      },
      {
        partNumber: 3,
        title: 'Part 3: National Quality Assurance Framework (NQAF) & Data Auditing',
        estimatedMinutes: 20,
        summary: 'Operationalizing the UN and Indian NQAF principles: relevance, accuracy, timeliness, accessibility, interpretability, and coherence in government administrative datasets.',
        content: {
          overview: 'The Indian NQAF guarantees that whether data originates from sample surveys (like PLFS or NSS) or administrative registries (like GSTN or MCA21), it complies with stringent international quality metrics.',
          sections: [
            {
              heading: '1. The 6 Pillars of Statistical Quality in India',
              body: [
                'Relevance: Alignment with user requirements and macro policy planning.',
                'Accuracy & Reliability: Rigorous calculation of Relative Standard Errors (RSE) and sample variance.',
                'Timeliness & Punctuality: Strict adherence to pre-announced Advance Release Calendars (ARC).',
                'Coherence & Comparability: Harmonization with international standards (SNA 2008, ISIC Rev 4).',
              ],
              keyTakeaway: 'All official statistics released by MoSPI must declare metadata and sample confidence intervals in accordance with NQAF guidelines.',
              circularRef: 'MoSPI National Quality Assurance Framework for Official Statistics (India-NQAF 2023)'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cpi-inflation-compilation',
    title: 'Consumer Price Index (CPI) & Inflation Dynamics in India',
    domain: 'Macroeconomics & Price Statistics',
    aim: 'Master the formulation, item basket weighting, geometric mean aggregation, and base year revisions for CPI (Rural, Urban, Combined)',
    targetSkill: 'Retail Price Index Computation & Hedonic Imputation',
    author: 'Price Statistics Division (PSD)',
    authorDesignation: 'Senior Faculty, Central Statistics Office (CSO)',
    ministryDepartment: 'Ministry of Statistics and Programme Implementation (MoSPI) & RBI MPC',
    recommendedLevel: 'moderate',
    tags: ['CPI', 'Inflation', 'Laspeyres', 'Base Year 2012', 'Monetary Policy'],
    parts: [
      {
        partNumber: 1,
        title: 'Part 1: Basket Structure & Consumer Expenditure Survey Weighting',
        estimatedMinutes: 16,
        summary: 'Deconstructs the CPI consumption basket derived from the Household Consumption Expenditure Survey (HCES), weighting breakdown between Food & Beverages, Housing, and Fuel.',
        content: {
          overview: 'CPI (Combined) is the anchor metric for India’s Flexible Inflation Targeting (FIT) framework under the Reserve Bank of India Act, with a statutory target of 4% (+/- 2%). Understanding how item weights are fixed is essential for monetary and fiscal coordination.',
          sections: [
            {
              heading: '1. Group-wise Weighting Architecture (Base 2012=100)',
              body: [
                'Food and Beverages holds the heaviest weight: 45.86% in CPI Combined (54.18% in Rural, 36.29% in Urban).',
                'Pan, tobacco, and intoxicants: 2.38%.',
                'Clothing and footwear: 6.53%.',
                'Housing (Urban only): 10.07% in CPI Combined (zero weight in Rural CPI).',
                'Fuel and light: 6.84%.',
                'Miscellaneous (Healthcare, Education, Transport, Communication): 28.32%.',
              ],
              keyTakeaway: 'Due to the 45.86% weight of Food & Beverages, Indian headline inflation is uniquely sensitive to seasonal monsoon variations and agricultural supply shocks.',
              circularRef: 'MoSPI Brochure on Consumer Price Index (Base 2012=100) & HCES Survey Guidelines'
            }
          ],
          diagram: {
            type: 'matrix',
            title: 'CPI Combined Group Weights Breakdown',
            caption: 'Relative weight distributions influencing Indian Headline Inflation',
            nodes: [
              { id: 'food', label: 'Food & Beverages', subtext: '45.86% Weight', type: 'highlight' },
              { id: 'misc', label: 'Miscellaneous Services', subtext: '28.32% Weight', type: 'process' },
              { id: 'housing', label: 'Housing (Urban)', subtext: '10.07% Weight', type: 'input' },
              { id: 'fuel', label: 'Fuel and Light', subtext: '6.84% Weight', type: 'input' },
              { id: 'cloth', label: 'Clothing & Footwear', subtext: '6.53% Weight', type: 'input' }
            ],
            connections: [
              { from: 'food', to: 'misc', label: '74.18% Core + Food Combined' },
              { from: 'housing', to: 'food', label: 'Index Aggregation' }
            ]
          },
          video: {
            title: 'Deconstructing the CPI Basket & Base Year Dynamics',
            duration: '12m 15s',
            instructor: 'Adviser, Price Statistics Division, MoSPI',
            videoUrl: 'https://example.gov.in/embed/cpi-basket-lecture',
            transcriptSnippet: 'Why does housing have zero weight in Rural CPI? Because in rural habitations, rental market liquidity is statistically negligible; ancestral and owned dwellings predominate...'
          }
        }
      },
      {
        partNumber: 2,
        title: 'Part 2: Modified Laspeyres Formulation & Geometric Mean Indexation',
        estimatedMinutes: 24,
        summary: 'Mathematical deep-dive into the Elementary Price Index (Jevons Formula) and Higher-Level Aggregation using the modified Laspeyres method.',
        content: {
          overview: 'MoSPI utilizes a two-tier aggregation process: the Jevons Geometric Mean for elementary item-level quotations, and the modified Laspeyres formula with base-period expenditure weights for state and all-India indices.',
          sections: [
            {
              heading: '1. Elementary Price Relatives: The Jevons Index',
              body: [
                'For an item sampled across multiple retail markets within a district, price relative is calculated using Geometric Mean (Jevons Index):',
                'R_i = \\prod_{k=1}^m \\left( \\frac{P_{i,k}^t}{P_{i,k}^0} \\right)^{\\frac{1}{m}}',
                'The Jevons index satisfies the Time Reversal Test and is less vulnerable to outlier price shocks compared to simple arithmetic means (Dutot index).',
              ],
              keyTakeaway: 'Geometric averaging at the lowest quotation level prevents price spikes in isolated markets from disproportionately skewing district indices.',
              circularRef: 'Technical Manual on CPI Compilation Methodology, NSO (CSO)'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'national-accounts-gdp',
    title: 'National Accounts Statistics: GDP & GVA Estimation Framework',
    domain: 'Economic Accounts & Macro Aggregates',
    aim: 'Analyze the System of National Accounts (SNA 2008), GVA at Basic Prices, and MCA-21 database corporate extrapolations',
    targetSkill: 'GVA at Basic Prices Calculation & Deflator Analysis',
    author: 'Prof. P.C. Mahalanobis Fellow / National Accounts Division (NAD)',
    authorDesignation: 'Senior Director, Central Statistics Office',
    ministryDepartment: 'Ministry of Statistics and Programme Implementation (MoSPI)',
    recommendedLevel: 'expert',
    tags: ['GDP', 'GVA', 'SNA 2008', 'MCA-21', 'Base Year 2011-12'],
    parts: [
      {
        partNumber: 1,
        title: 'Part 1: Transition to SNA 2008 & Basic Price Valuation',
        estimatedMinutes: 25,
        summary: 'Examines the fundamental shift in the 2015 base revision: moving from Factor Cost to Basic Prices for GVA, and from GDP at factor cost to GDP at Market Prices as the headline growth indicator.',
        content: {
          overview: 'The 2015 revision of National Accounts aligned India with the international System of National Accounts (SNA 2008). Understanding the distinction between Production Taxes and Product Taxes is vital for interpreting GDP vs GVA divergences.',
          sections: [
            {
              heading: '1. The Core Accounting Identity',
              body: [
                'GVA at Basic Prices = GVA at Factor Cost + (Production Taxes - Production Subsidies)',
                'GDP at Market Prices = \\sum (\\text{GVA at Basic Prices}) + (\\text{Product Taxes} - \\text{Product Subsidies})',
                'Production taxes (e.g., Land revenues, Stamp duty, Professional tax) are payable regardless of the volume of production.',
                'Product taxes (e.g., GST, Excise duty, Customs duties) depend directly on the volume of goods sold.',
              ],
              keyTakeaway: 'GDP represents consumer and market perspective, while GVA represents producer activity and value addition.',
              circularRef: 'CSO Press Note: Changes in Methodology and New Series of National Accounts (Base 2011-12)'
            }
          ],
          diagram: {
            type: 'flow',
            title: 'From Factor Cost to GDP at Market Prices',
            caption: 'Bridging equations connecting factor cost, basic prices, and market prices',
            nodes: [
              { id: 'n1', label: 'GVA at Factor Cost', subtext: 'Compensation of Employees + Operating Surplus', type: 'input' },
              { id: 'n2', label: 'Production Taxes - Subsidies', subtext: 'Land revenue, Stamp duty (volume-independent)', type: 'process' },
              { id: 'n3', label: 'GVA at Basic Prices', subtext: 'Official Sectoral Growth Benchmark', type: 'highlight' },
              { id: 'n4', label: 'Product Taxes - Subsidies', subtext: 'GST, Customs, Food/Fuel Subsidies', type: 'process' },
              { id: 'n5', label: 'GDP at Market Prices', subtext: 'Headline National Growth Figure', type: 'output' }
            ],
            connections: [
              { from: 'n1', to: 'n2', label: 'Add Net' },
              { from: 'n2', to: 'n3', label: 'Yields' },
              { from: 'n3', to: 'n4', label: 'Add Net Product Taxes' },
              { from: 'n4', to: 'n5', label: 'Yields Headline' }
            ]
          }
        }
      },
      {
        partNumber: 2,
        title: 'Part 2: Corporate Sector Estimation via MCA-21 Integration',
        estimatedMinutes: 20,
        summary: 'How e-governance financial returns from over 500,000 active enterprises d under MCA-21 transformed private corporate sector value addition compared to the older RBI sample approach.',
        content: {
          overview: 'Prior to 2015, private corporate sector GVA was extrapolated from a small sample of 2,500 companies surveyed by the Reserve Bank of India. The MCA-21 database enabled census-level enterprise balance sheet aggregation.',
          sections: [
            {
              heading: '1. Enterprise Approach vs Establishment Approach',
              body: [
                'Under the establishment approach (ASI), plants and factories were surveyed irrespective of the corporate headquarters.',
                'Under the enterprise approach (MCA-21), company-level financials include headquarter services, design, logistics, and digital services, preventing value underestimation.',
              ],
              keyTakeaway: 'The shift to enterprise-based accounts captures the modern service-oriented corporate value chain.',
            }
          ]
        }
      }
    ]
  },
  {
    id: 'nsso-sampling-design',
    title: 'Stratified Multi-Stage Sampling Design (NSSO Methodology)',
    domain: 'Survey Methodology & Statistical Inference',
    aim: 'Formulate primary sampling units, sub-round balancing, and inverse probability weights for nationwide socioeconomic surveys',
    targetSkill: 'Multi-stage Stratification & Inverse Probability Weighting',
    author: 'Survey Design and Research Division (SDRD), Kolkata',
    authorDesignation: 'Chief Director General, NSSO',
    ministryDepartment: 'National Statistical Office (NSO), MoSPI',
    recommendedLevel: 'expert',
    tags: ['NSSO', 'Sampling Design', 'Stratification', 'PSU', 'Multiplier'],
    parts: [
      {
        partNumber: 1,
        title: 'Part 1: Two-Stage Stratified Sampling Frame in India',
        estimatedMinutes: 20,
        summary: 'Detailed examination of Rural Census Villages and Urban Frame Survey (UFS) blocks as First Stage Units (FSUs), and households as Ultimate Stage Units (USUs).',
        content: {
          overview: 'The National Sample Survey relies on a stratified two-stage design with probability proportional to size with replacement (PPSWR) or systematic sampling, ensuring equal representation across agrarian agro-climatic zones and metropolitan wards.',
          sections: [
            {
              heading: '1. First Stage Units (FSUs) Allocation',
              body: [
                'In rural strata, the FSU is the 2011 Census village.',
                'In urban strata, the FSU is an Urban Frame Survey (UFS) block containing approximately 100 to 150 households.',
                'Allocation of sample FSUs between Rural and Urban sectors across states is proportional to population as per the latest decennial Census.',
              ],
              keyTakeaway: 'The Urban Frame Survey (UFS) maps all town wards into identifiable blocks with boundary descriptions updated every 5 years.',
              circularRef: 'NSSO SDRD Guidelines: Instructions to Field Staff on Stratification and Allocation'
            }
          ],
          diagram: {
            type: 'hierarchy',
            title: 'NSSO Multi-Stage Sampling Hierarchy',
            caption: 'From State/UT strata down to Ultimate Stage Units (Households)',
            nodes: [
              { id: 's1', label: 'All-India Universe', subtext: 'All States and Union Territories', type: 'input' },
              { id: 's2', label: 'District Strata', subtext: 'Rural & Urban Split within District', type: 'process' },
              { id: 's3', label: 'First Stage Units (FSUs)', subtext: 'Villages / UFS Blocks (PPS Sampling)', type: 'highlight' },
              { id: 's4', label: 'Hamlet Groups / Sub-Blocks', subtext: 'Created if population exceeds 1200', type: 'process' },
              { id: 's5', label: 'Ultimate Stage Units (USUs)', subtext: 'Sample Households (Circular Systematic)', type: 'output' }
            ],
            connections: [
              { from: 's1', to: 's2', label: 'Stratified by State' },
              { from: 's2', to: 's3', label: 'FSU Selection' },
              { from: 's3', to: 's4', label: 'Segmentation if dense' },
              { from: 's4', to: 's5', label: 'USU Listing & Selection' }
            ]
          }
        }
      }
    ]
  }
];
