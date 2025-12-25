
export const healthQuestions = [
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
    id: 'q2_policy_intent',
    category: 'health_intro',
    text: 'Great! Are you looking for a new health insurance plan for yourself, wanting to upgrade your current coverage, or trying to understand if what you have is enough?',
    type: 'single_choice',
    options: [
      { value: 'buy_new_plan', label: 'I want to buy a new health insurance plan' },
      { value: 'upgrade_existing', label: 'I want to increase or upgrade my existing cover' },
      { value: 'understand_current_policy', label: 'I want to understand my current policy better' },
      { value: 'check_if_enough', label: 'I want to know if my current cover is enough' },
      { value: 'specific_question', label: 'I have a specific question or problem (claims, hospital, etc.)' }
    ],
    mapTo: 'q2_policy_intent'
  },

  {
    id: 'q3_location',
    category: 'location',
    text: 'Which city do you currently live in? This helps us understand local hospital costs and coverage options.',
    type: 'group',
    fields: [
      {
        id: 'q3_city',
        label: 'City',
        type: 'text',
        mapTo: 'q3_city'
      },
      {
        id: 'q3_state',
        label: 'State',
        type: 'text',
        mapTo: 'q3_state'
      },
      {
        id: 'q3_country',
        label: 'Country',
        type: 'text',
        mapTo: 'q3_country'
      }
    ]
  },

  {
    id: 'q4_coverage_for',
    category: 'family',
    text: 'Is this health insurance coverage just for yourself, or are you looking to include your family members like your spouse, children, or parents under the same plan?',
    type: 'single_choice',
    options: [
      { value: 'just_me', label: 'Just for me' },
      { value: 'me_spouse', label: 'For me and my spouse/partner' },
      { value: 'me_children', label: 'For me and my children' },
      { value: 'me_parents', label: 'For me and my parents' },
      { value: 'entire_family', label: 'For my entire family (spouse, children, parents)' },
      { value: 'other', label: 'Other (please specify)' }
    ],
    mapTo: 'q4_coverage_for'
  },

  {
    id: 'q4_dependents_detail',
    category: 'family',
    text: 'If you are including family, how many children and parents would be covered?',
    type: 'group',
    fields: [
      {
        id: 'q4_number_of_children',
        label: 'Number of children to be covered',
        type: 'number',
        mapTo: 'q4_number_of_children'
      },
      {
        id: 'q4_number_of_parents',
        label: 'Number of parents to be covered',
        type: 'number',
        mapTo: 'q4_number_of_parents'
      }
    ]
  },

  {
    id: 'q5_age',
    category: 'profile',
    text: 'What is your current age?',
    type: 'number',
    mapTo: 'q5_age'
  },

  {
    id: 'q6_health_conditions',
    category: 'health',
    text: "Do you have any existing medical conditions that might need coverage for treatment or hospitalization? Share only what you're comfortable with.",
    type: 'single_choice',
    options: [
      { value: 'no_conditions', label: 'No pre-existing medical conditions' },
      { value: 'minor_conditions', label: 'Minor conditions (allergies, controlled BP, mild asthma)' },
      { value: 'chronic_conditions', label: 'Chronic conditions (diabetes, hypertension, thyroid)' },
      { value: 'serious_conditions', label: 'Serious conditions (heart disease, cancer history, stroke)' },
      { value: 'other', label: 'Other (please specify)' },
      { value: 'not_disclosed', label: 'Prefer not to disclose' }
    ],
    mapTo: 'q6_health_conditions'
  },

  {
    id: 'q7_existing_coverage',
    category: 'coverage',
    text: 'Do you currently have any health insurance—through your employer, a personal policy, or a government scheme?',
    type: 'single_choice',
    options: [
      { value: 'none', label: "No, I don't have any health insurance" },
      { value: 'employer_coverage', label: 'Yes, through my employer (Coverage amount: [ ])' },
      { value: 'personal_policy', label: 'Yes, a personal health policy (Coverage amount: [ ])' },
      { value: 'both_employer_personal', label: 'Yes, both employer and personal coverage' },
      { value: 'government_scheme', label: 'Government/social scheme coverage' },
      { value: 'not_sure', label: "I'm not sure what I have" }
    ],
    mapTo: 'q7_existing_coverage'
  },

  {
    id: 'q7_employer_coverage_amount',
    category: 'coverage',
    text: 'If you have employer coverage, what is the approximate coverage amount? (₹)',
    type: 'number',
    mapTo: 'q7_employer_coverage_amount'
  },

  {
    id: 'q7_personal_coverage_amount',
    category: 'coverage',
    text: 'If you have a personal policy, what is the approximate coverage amount? (₹)',
    type: 'number',
    mapTo: 'q7_personal_coverage_amount'
  },

  {
    id: 'q8_hospital_preference',
    category: 'preferences',
    text: 'What kind of hospitals would you prefer to use if you need treatment—top private hospitals, a mix of private and public, or mostly budget-friendly options?',
    type: 'single_choice',
    options: [
      { value: 'top_private_only', label: 'Top private hospitals only (premium care)' },
      { value: 'good_private_hospitals', label: 'Good private hospitals (cost-conscious)' },
      { value: 'mix_private_public', label: 'Mix of private and public hospitals is fine' },
      { value: 'mostly_public', label: 'Mostly public/government hospitals' },
      { value: 'no_preference', label: 'No strong preference, just want emergencies covered' }
    ],
    mapTo: 'q8_hospital_preference'
  },

  {
    id: 'q9_coverage_amount',
    category: 'coverage_need',
    text: 'Roughly how much health coverage do you think you need? If you are not sure, we can help calculate the right amount based on typical medical costs in your city.',
    type: 'single_choice',
    options: [
      { value: 'not_sure', label: "I'm not sure, help me calculate" },
      { value: '3_5_lakh', label: '₹3-5 lakhs (basic coverage)' },
      { value: '5_10_lakh', label: '₹5-10 lakhs (standard coverage)' },
      { value: '10_25_lakh', label: '₹10-25 lakhs (comprehensive coverage)' },
      { value: '25_50_lakh', label: '₹25-50 lakhs (premium coverage)' },
      { value: 'above_50_lakh', label: 'Above ₹50 lakhs (super premium)' }
    ],
    mapTo: 'q9_coverage_amount'
  },

  {
    id: 'q10_premium_budget',
    category: 'budget',
    text: 'What kind of monthly or annual premium feels comfortable for your budget without putting too much financial strain?',
    type: 'single_choice',
    options: [
      { value: 'under_500', label: 'Under ₹500/month (₹6,000/year)' },
      { value: '500_1000', label: '₹500-₹1,000/month (₹6k-12k/year)' },
      { value: '1000_2000', label: '₹1,000-₹2,000/month (₹12k-24k/year)' },
      { value: '2000_5000', label: '₹2,000-₹5,000/month (₹24k-60k/year)' },
      { value: 'over_5000', label: 'Over ₹5,000/month (₹60k+/year)' },
      { value: 'flexible', label: 'Flexible, depends on coverage quality' }
    ],
    mapTo: 'q10_premium_budget'
  },

  {
    id: 'q11_priority',
    category: 'preferences',
    text: "When choosing health insurance, what's most important to you—keeping premiums low, getting a high coverage amount, minimizing out-of-pocket costs, or having extra benefits like check-ups?",
    type: 'single_choice',
    options: [
      { value: 'lowest_premium', label: 'Lowest premium possible (basic coverage okay)' },
      { value: 'balanced_approach', label: 'Balanced approach (reasonable cost + decent coverage)' },
      { value: 'high_coverage', label: 'High coverage amount (willing to pay more premium)' },
      { value: 'low_out_of_pocket', label: 'Low out-of-pocket expenses during hospitalization' },
      { value: 'extra_benefits', label: 'Extra benefits (wellness, check-ups, maternity)' },
      { value: 'not_sure', label: 'Not sure, help me decide' }
    ],
    mapTo: 'q11_priority'
  },

  {
    id: 'q12_lifestyle',
    category: 'lifestyle',
    text: 'Could you share a bit about your lifestyle and health habits? This helps us understand your long-term health risks better.',
    type: 'single_choice',
    options: [
      { value: 'very_active', label: 'Very active lifestyle (regular exercise, healthy diet)' },
      { value: 'moderately_active', label: 'Moderately active (exercise occasionally, balanced diet)' },
      { value: 'sedentary', label: 'Sedentary lifestyle (desk job, limited physical activity)' },
      { value: 'high_stress', label: 'High-stress job or lifestyle' },
      { value: 'smoker_drinker', label: 'Smoker or regular alcohol consumption' },
      { value: 'not_shared', label: 'Prefer not to share' }
    ],
    mapTo: 'q12_lifestyle'
  },

  {
    id: 'q13_timeline',
    category: 'timeline',
    text: 'When are you hoping to have the right health coverage in place?',
    type: 'single_choice',
    options: [
      { value: 'within_week', label: 'Immediately (within 1 week)' },
      { value: 'within_month', label: 'Within this month' },
      { value: '2_3_months', label: 'Within 2-3 months' },
      { value: 'exploring_no_timeline', label: 'Just exploring, no fixed timeline' }
    ],
    mapTo: 'q13_timeline'
  },

  {
    id: 'q14_summary_confirmation',
    category: 'confirmation',
    text: "Here's what I've understood: You're [age] years old in [city], looking for [₹X coverage] for [yourself/family], with [health conditions if any], and a budget of [₹Y/month]. Does this look accurate, or would you like to adjust anything before I analyze your health risks and suggest the right coverage?",
    type: 'single_choice',
    options: [
      { value: 'confirmed', label: "Yes, that's accurate—proceed" },
      { value: 'needs_changes', label: "I'd like to correct some details" }
    ],
    mapTo: 'q14_summary_confirmation'
  }
];
