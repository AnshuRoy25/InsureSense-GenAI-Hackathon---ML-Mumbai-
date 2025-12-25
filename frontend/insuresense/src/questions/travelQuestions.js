
export const travelQuestions = [
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
    id: 'q2_help_type',
    category: 'travel_intro',
    text: 'Nice! Are you looking for help with travel planning, checking risks for your trip, or exploring travel insurance options?',
    type: 'single_choice',
    options: [
      { value: 'risk_assessment', label: 'Understanding travel risks for my trip' },
      { value: 'insurance_decision', label: 'Deciding whether I need travel insurance' },
      { value: 'insurance_options', label: 'Exploring travel insurance options' },
      { value: 'combination', label: 'A combination of these' }
    ],
    mapTo: 'q2_help_type'
  },

  {
    id: 'q3_origin_destination',
    category: 'trip_overview',
    text: 'To begin, where will you be travelling from, and what is your main destination?',
    type: 'group',
    fields: [
      {
        id: 'q3_origin_city',
        label: 'Starting city / country – where your trip will begin',
        type: 'text',
        mapTo: 'trip.origin.city'
      },
      {
        id: 'q3_destination_city',
        label: 'Destination city / country – where you’re planning to go',
        type: 'text',
        mapTo: 'trip.destination.city'
      }
    ]
  },

  {
    id: 'q4_dates_duration',
    category: 'trip_overview',
    text: 'When do you plan to start your trip, and when do you expect to arrive at your destination? How long will you be staying there?',
    type: 'group',
    fields: [
      {
        id: 'q4_start_date',
        label: 'Trip start date (departure from starting city)',
        type: 'date',
        mapTo: 'trip.start_date'
      },
      {
        id: 'q4_arrival_date',
        label: 'Expected arrival date at destination',
        type: 'date',
        mapTo: 'trip.arrival_date'
      },
      {
        id: 'q4_length_of_stay_days',
        label: 'Length of stay (or return date / number of days)',
        type: 'number',
        mapTo: 'trip.length_of_stay_days'
      }
    ]
  },

  {
    id: 'q5_travellers',
    category: 'profile',
    text: 'Who will be travelling on this trip? Are you going alone, with family, with friends, or as part of a group?',
    type: 'single_choice',
    options: [
      { value: 'solo', label: 'Just me, travelling solo' },
      { value: 'family', label: 'With family (spouse/partner + kids)' },
      { value: 'friends', label: 'With friends' },
      { value: 'group_tour', label: 'With work colleagues or as part of a group tour' },
      { value: 'other', label: 'Other (please specify)' }
    ],
    mapTo: 'q5_travellers'
  },

  {
    id: 'q6_trip_purpose',
    category: 'profile',
    text: 'What’s the main purpose of this trip?',
    type: 'single_choice',
    options: [
      { value: 'holiday', label: 'Holiday/vacation' },
      { value: 'business', label: 'Work/business' },
      { value: 'education', label: 'Study/education' },
      { value: 'visiting_family', label: 'Visiting family/friends' },
      { value: 'adventure', label: 'Adventure/trekking' },
      { value: 'other', label: 'Other (please specify)' }
    ],
    mapTo: 'q6_trip_purpose'
  },

  {
    id: 'q7_activities',
    category: 'risk_profile',
    text: 'What activities do you plan to do there?',
    type: 'multi_choice',
    options: [
      { value: 'sightseeing', label: 'Mostly sightseeing/relaxed' },
      { value: 'beach_water_sports', label: 'Beach/water sports (swimming, snorkeling)' },
      { value: 'adventure', label: 'Adventure (trekking, skiing, scuba)' },
      { value: 'driving_vehicle', label: 'Driving/renting a vehicle/motorbike' },
      { value: 'cultural_events', label: 'Cultural events/festivals' },
      { value: 'other_high_risk', label: 'Other high-risk activities' }
    ],
    mapTo: 'q7_activities'
  },

  {
    id: 'q8_health_conditions',
    category: 'health',
    text: "Do you have any pre-existing medical conditions that might need coverage during this trip? Share only what you're comfortable with.",
    type: 'single_choice',
    options: [
      { value: 'none', label: 'No pre-existing conditions' },
      { value: 'minor', label: 'Yes, minor (e.g., allergies, mild asthma)' },
      { value: 'chronic', label: 'Yes, chronic (e.g., diabetes, hypertension)' },
      { value: 'serious', label: 'Yes, serious (e.g., heart issues, recent surgery)' },
      { value: 'other', label: 'Other (please specify)' },
      { value: 'not_disclosed', label: 'Prefer not to disclose' }
    ],
    mapTo: 'q8_health_conditions'
  },

  {
    id: 'q9_bookings_status',
    category: 'planning_status',
    text: 'Have you already booked anything for this trip, or are you still planning?',
    type: 'single_choice',
    options: [
      { value: 'none', label: 'Nothing booked yet (early planning)' },
      { value: 'transport_only', label: 'Transport only (flights/trains/bus/car)' },
      { value: 'transport_accommodation', label: 'Transport + accommodation' },
      { value: 'most_booked', label: 'Most things booked (transport, stay, activities)' },
      { value: 'fully_booked', label: 'Everything fully booked' }
    ],
    mapTo: 'q9_bookings_status'
  },

  {
    id: 'q10_budget_range',
    category: 'money',
    text: 'Roughly what’s the total expected cost for this trip (transport, stay, activities)? A range is fine.',
    type: 'single_choice',
    options: [
      { value: 'under_1000', label: 'Under $1,000 / ₹80,000' },
      { value: '1000_2500', label: '$1,000 - $2,500 / ₹80,000 - ₹2,00,000' },
      { value: '2500_5000', label: '$2,500 - $5,000 / ₹2,00,000 - ₹4,00,000' },
      { value: '5000_10000', label: '$5,000 - $10,000 / ₹4,00,000 - ₹8,00,000' },
      { value: 'over_10000', label: 'Over $10,000 / ₹8,00,000' },
      { value: 'not_sure', label: 'Not sure yet' }
    ],
    mapTo: 'q10_budget_range'
  },

  {
    id: 'q11_existing_coverage',
    category: 'coverage',
    text: 'Do you already have any travel-related coverage, like from a credit card, employer, or existing policy, or would this be your primary protection?',
    type: 'single_choice',
    options: [
      { value: 'none', label: 'No existing coverage' },
      { value: 'credit_card', label: 'Credit card benefits' },
      { value: 'employer', label: 'Employer-provided' },
      { value: 'existing_policy', label: 'Existing travel policy' },
      { value: 'other', label: 'Other (specify)' }
    ],
    mapTo: 'q11_existing_coverage'
  },

  {
    id: 'q12_protection_level',
    category: 'preference',
    text: 'What level of protection feels right for you?',
    type: 'single_choice',
    options: [
      { value: 'basic', label: 'Basic (only if high risk)' },
      { value: 'balanced', label: 'Balanced (risk-based coverage)' },
      { value: 'comprehensive', label: 'Comprehensive (maximum peace of mind)' },
      { value: 'custom', label: 'Custom (tell me more)' }
    ],
    mapTo: 'q12_protection_level'
  },

  {
    id: 'q13_summary_confirmation',
    category: 'confirmation',
    text: "Here’s how I’ve understood your situation: [short trip summary]. Does this summary look accurate, or would you like to correct anything before I analyse the risks and suggest whether insurance makes sense for you?",
    type: 'single_choice',
    options: [
      { value: 'confirmed', label: 'Yes, that’s accurate—go ahead' },
      { value: 'needs_changes', label: 'I’d like to change some details' }
    ],
    mapTo: 'q13_summary_confirmation'
  }
];
