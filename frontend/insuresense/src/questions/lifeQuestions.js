
export const lifeQuestions = [
  {
    id: 'q1_reason',
    category: 'entry',
    text: 'What brings you to InsureSense today?',
    type: 'single_choice',
    options: [
      { value: 'travel', label: "I'm planning a trip and want travel advice or insurance" },
      { value: 'health', label: 'I need help with health insurance or medical coverage' },
      { value: 'car', label: 'Looking into car insurance or vehicle protection' },
      { value: 'home', label: 'Want to protect my home or renters insurance' },
      { value: 'life', label: 'Exploring life insurance or family protection plans' },
      { value: 'general', label: 'Other (policy renewal, claims, general questions)' }
    ],
    mapTo: 'pipeline'
  },

  {
    id: 'q2_policy_stage',
    category: 'life_intro',
    text: "Great! Are you looking for your first policy, wanting to add more coverage, or reviewing options for a specific need like your child's future or loan protection?",
    type: 'single_choice',
    options: [
      { value: 'first_policy', label: 'Looking for my first life insurance policy' },
      { value: 'increase_coverage', label: 'Want to increase my existing coverage' },
      { value: 'reviewing_comparing', label: 'Reviewing/comparing different plans' },
      { value: 'specific_need', label: "Specific need (child's future, loan protection, retirement)" },
      { value: 'other', label: 'Other' }
    ],
    mapTo: 'q2_policy_stage'
  },

  {
    id: 'q3_dependents',
    category: 'dependents',
    text: 'Who currently depends on your income for their day-to-day needs and future security?',
    type: 'single_choice',
    options: [
      { value: 'spouse_only', label: 'My spouse or partner only' },
      { value: 'spouse_and_children', label: 'Spouse and children (How many children? ___)' },
      { value: 'parents', label: 'My parents or elderly family members' },
      { value: 'extended_family', label: 'Extended family members' },
      { value: 'no_dependents', label: "I don't have financial dependents right now" },
      { value: 'multiple_groups', label: 'Multiple groups (please specify)' }
    ],
    mapTo: 'q3_dependents'
  },

  {
    id: 'q3_number_of_children',
    category: 'dependents',
    text: 'If you have children, how many children currently depend on you?',
    type: 'number',
    mapTo: 'q3_number_of_children'
  },

  {
    id: 'q4_main_goal',
    category: 'goals',
    text: "What's the main goal you'd like this life insurance to achieve for you and your family?",
    type: 'single_choice',
    options: [
      { value: 'replace_income', label: 'Replace my income so my family can maintain their lifestyle' },
      { value: 'pay_off_debts', label: 'Pay off loans, mortgage, or other debts' },
      { value: 'children_education', label: "Secure my children's education expenses" },
      { value: 'retirement_corpus', label: 'Build a retirement corpus or financial cushion' },
      { value: 'estate_planning', label: 'Estate planning or wealth transfer to next generation' },
      { value: 'other', label: 'Other (please specify)' }
    ],
    mapTo: 'q4_main_goal'
  },

  {
    id: 'q5_financial_obligations',
    category: 'obligations',
    text: 'Do you have any major financial obligations or loans that your family would need to handle if something happened to you?',
    type: 'multi_choice',
    options: [
      { value: 'home_loan', label: 'Home loan (How much is outstanding? ___)' },
      { value: 'personal_loans', label: 'Personal loans, car loans, or other debts (Outstanding amount? ___)' },
      { value: 'education_expenses', label: "Children's education expenses coming up" },
      { value: 'parent_care', label: 'Ongoing care or support for dependent parents' },
      { value: 'none', label: 'No major financial obligations currently' },
      { value: 'other', label: 'Other financial commitments (please specify)' }
    ],
    mapTo: 'q5_financial_obligations'
  },

  {
    id: 'q5_home_loan_outstanding',
    category: 'obligations',
    text: 'If you have a home loan, roughly how much is outstanding? (₹)',
    type: 'number',
    mapTo: 'q5_home_loan_outstanding'
  },

  {
    id: 'q5_other_loan_outstanding',
    category: 'obligations',
    text: 'If you have other loans, what is the total outstanding amount? (₹)',
    type: 'number',
    mapTo: 'q5_other_loan_outstanding'
  },

  {
    id: 'q6_age_health',
    category: 'profile',
    text: 'Could you share your current age, and do you have any pre-existing health conditions we should consider for coverage planning?',
    type: 'group',
    fields: [
      {
        id: 'q6_age',
        label: 'Your age (years)',
        type: 'number',
        mapTo: 'q6_age'
      },
      {
        id: 'q6_health_status',
        label: 'Health status',
        type: 'single_choice',
        options: [
          { value: 'no_conditions', label: 'No pre-existing conditions' },
          { value: 'minor_conditions', label: 'Minor conditions (allergies, controlled BP, mild asthma)' },
          { value: 'chronic_conditions', label: 'Chronic conditions (diabetes, hypertension, thyroid)' },
          { value: 'serious_conditions', label: 'Serious conditions (heart disease, cancer history, stroke)' },
          { value: 'other', label: 'Other (please specify)' },
          { value: 'not_disclosed', label: 'Prefer not to disclose' }
        ],
        mapTo: 'q6_health_status'
      }
    ]
  },

  {
    id: 'q7_coverage_amount',
    category: 'coverage_need',
    text: "Roughly how much financial protection do you think your family would need to be secure if you weren't around?",
    type: 'single_choice',
    options: [
      { value: 'not_sure', label: "I'm not sure, help me calculate the right amount" },
      { value: '10_25_lakh', label: '₹10-25 lakhs' },
      { value: '25_50_lakh', label: '₹25-50 lakhs' },
      { value: '50_lakh_1_crore', label: '₹50 lakhs - ₹1 crore' },
      { value: '1_2_crore', label: '₹1-2 crores' },
      { value: 'over_2_crore', label: 'Over ₹2 crores' }
    ],
    mapTo: 'q7_coverage_amount'
  },

  {
    id: 'q8_policy_type',
    category: 'policy_preferences',
    text: 'What type of life insurance policy sounds more aligned with what you’re looking for?',
    type: 'single_choice',
    options: [
      { value: 'term_insurance', label: 'Term insurance (pure protection at the most affordable cost)' },
      { value: 'whole_life', label: 'Whole life insurance (coverage for your entire lifetime)' },
      { value: 'endowment', label: 'Endowment plan (combines savings and insurance)' },
      { value: 'ulip', label: 'ULIP (investment-linked insurance with market growth potential)' },
      { value: 'not_sure', label: "I'm not sure which is best, help me choose" }
    ],
    mapTo: 'q8_policy_type'
  },

  {
    id: 'q9_premium_budget',
    category: 'budget',
    text: 'What kind of monthly or annual premium feels comfortable and sustainable for your budget?',
    type: 'single_choice',
    options: [
      { value: 'under_500', label: 'Under ₹500 per month' },
      { value: '500_1000', label: '₹500-₹1,000 per month' },
      { value: '1000_2500', label: '₹1,000-₹2,500 per month' },
      { value: '2500_5000', label: '₹2,500-₹5,000 per month' },
      { value: 'over_5000', label: 'Over ₹5,000 per month' },
      { value: 'flexible', label: "I'm flexible based on what coverage I need" }
    ],
    mapTo: 'q9_premium_budget'
  },

  {
    id: 'q10_employment_income',
    category: 'profile',
    text: "What's your current employment situation, and roughly what's your annual income? This helps us match policies that fit your profile.",
    type: 'group',
    fields: [
      {
        id: 'q10_employment',
        label: 'Employment type',
        type: 'single_choice',
        options: [
          { value: 'salaried', label: 'Salaried employee' },
          { value: 'self_employed', label: 'Self-employed or business owner' },
          { value: 'freelancer', label: 'Freelancer or consultant' },
          { value: 'other', label: 'Other employment type (please specify)' }
        ],
        mapTo: 'q10_employment'
      },
      {
        id: 'q10_annual_income',
        label: 'Approximate annual income (₹)',
        type: 'number',
        mapTo: 'q10_annual_income'
      }
    ]
  },

  {
    id: 'q11_existing_coverage',
    category: 'coverage',
    text: 'Do you already have any life insurance coverage in place, either through your employer or a personal policy?',
    type: 'single_choice',
    options: [
      { value: 'none', label: "No, I don't have any life insurance yet" },
      { value: 'employer_coverage', label: 'Yes, through my employer (Coverage amount: ___)' },
      { value: 'personal_term', label: 'Yes, a personal term insurance policy (Coverage amount: ___)' },
      { value: 'traditional_endowment', label: 'Yes, a traditional or endowment policy (Coverage amount: ___)' },
      { value: 'not_sure', label: "I'm not sure what coverage I have" }
    ],
    mapTo: 'q11_existing_coverage'
  },

  {
    id: 'q11_employer_coverage_amount',
    category: 'coverage',
    text: 'If you have employer coverage, what is the approximate coverage amount? (₹)',
    type: 'number',
    mapTo: 'q11_employer_coverage_amount'
  },

  {
    id: 'q11_personal_coverage_amount',
    category: 'coverage',
    text: 'If you have personal policies, what is the total personal coverage amount? (₹)',
    type: 'number',
    mapTo: 'q11_personal_coverage_amount'
  },

  {
    id: 'q12_timeline',
    category: 'timeline',
    text: 'When are you hoping to have life insurance coverage in place?',
    type: 'single_choice',
    options: [
      { value: 'within_week', label: 'As soon as possible, ideally within a week' },
      { value: 'within_month', label: 'Soon, within the next month' },
      { value: '2_3_months', label: 'Planning ahead for the next 2-3 months' },
      { value: 'exploring_no_rush', label: 'Just exploring options for now, no rush' }
    ],
    mapTo: 'q12_timeline'
  },

  {
    id: 'q13_coverage_approach',
    category: 'preference',
    text: 'When it comes to balancing coverage and cost, which approach feels right for you?',
    type: 'single_choice',
    options: [
      { value: 'maximum_coverage_lowest_cost', label: 'Maximum coverage at the lowest cost (pure term insurance)' },
      { value: 'balanced_savings_benefit', label: 'Balanced approach with some savings or maturity benefit' },
      { value: 'wealth_building_returns', label: 'Premium protection that also builds wealth or returns (investment component)' },
      { value: 'custom_recommendation', label: "I'd like a custom recommendation based on my situation" }
    ],
    mapTo: 'q13_coverage_approach'
  },

  {
    id: 'q14_summary_confirmation',
    category: 'confirmation',
    text: "Here's what I've understood about your situation: You're [age] years old with [number] dependents, looking for around [₹X] in coverage for [main purpose], with a budget of roughly [₹Y/month]. Does this summary look accurate, or would you like to adjust anything before I calculate your exact needs and suggest the best-fit plans?",
    type: 'single_choice',
    options: [
      { value: 'confirmed', label: "Yes, that's accurate—please proceed" },
      { value: 'needs_changes', label: "I'd like to correct or add some details" }
    ],
    mapTo: 'q14_summary_confirmation'
  }
];
