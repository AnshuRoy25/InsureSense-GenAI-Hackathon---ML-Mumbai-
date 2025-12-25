export default function convertHealth(responses) {
  return {
    user_profile: {
      age: responses.q5_age,
      location: {
        city: responses.q3_city,
        state: responses.q3_state,
        country: responses.q3_country
      }
    },
    
    travel_data: null,  // Not applicable
    
    health_data: {
      coverage_for: responses.q4_coverage_for,  // "just_me", "family"
      number_of_members: calculateMembers(responses),
      health_conditions: responses.q6_health_conditions,
      existing_coverage: {
        type: responses.q7_existing_coverage,
        amount: responses.q7_employer_coverage_amount || 
                responses.q7_personal_coverage_amount || null
      },
      hospital_preference: responses.q8_hospital_preference,
      coverage_amount: responses.q9_coverage_amount,
      premium_budget: responses.q10_premium_budget,
      priority: responses.q11_priority,
      lifestyle: responses.q12_lifestyle
    },
    
    life_data: null
  };
}

// Helper function to calculate total members
function calculateMembers(responses) {
  let count = 1; // User themselves
  
  if (responses.q4_coverage_for.includes('spouse')) count++;
  if (responses.q4_coverage_for.includes('children')) {
    count += responses.q4_number_of_children || 0;
  }
  if (responses.q4_coverage_for.includes('parents')) {
    count += responses.q4_number_of_parents || 2;
  }
  
  return count;
}
