export default function convertLife(responses) {
  return {
    user_profile: {
      age: responses.q6_age,
      location: {
        city: responses.q9_city || null,
        country: responses.q9_country || null
      }
    },
    
    travel_data: null,
    health_data: null,
    
    life_data: {
      policy_stage: responses.q2_policy_stage,
      dependents: {
        type: responses.q3_dependents,
        number_of_children: responses.q3_number_of_children || 0
      },
      main_goal: responses.q4_main_goal,
      financial_obligations: {
        types: responses.q5_financial_obligations,
        home_loan_outstanding: responses.q5_home_loan_outstanding || null,
        other_loans: responses.q5_other_loan_outstanding || null
      },
      health_status: responses.q6_health_status,
      coverage_amount: responses.q7_coverage_amount,
      policy_type: responses.q8_policy_type,
      premium_budget: responses.q9_premium_budget,
      employment: {
        type: responses.q10_employment,
        annual_income: responses.q10_annual_income
      },
      existing_coverage: {
        type: responses.q11_existing_coverage,
        amount: responses.q11_employer_coverage_amount || 
                responses.q11_personal_coverage_amount || null
      },
      timeline: responses.q12_timeline,
      coverage_approach: responses.q13_coverage_approach
    }
  };
}
