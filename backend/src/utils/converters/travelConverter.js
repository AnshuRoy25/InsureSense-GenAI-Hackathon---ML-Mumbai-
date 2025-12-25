export default function convertTravel(responses) {
  return {
    user_profile: {
      age: responses.q5_age || null,
      location: {
        city: responses.q3_origin_city,
        country: responses.q3_origin_country
      }
    },
    
    travel_data: {
      destination: {
        city: responses.q3_destination_city,
        country: responses.q3_destination_country
      },
      dates: {
        start: responses.q4_start_date,
        duration_days: responses.q4_length_of_stay_days
      },
      travelers: responses.q5_travellers,  // "solo", "family", etc.
      purpose: responses.q6_trip_purpose,   // "holiday", "business"
      activities: responses.q7_activities,  // ["scuba_diving", "sightseeing"]
      budget_range: responses.q10_budget_range
    },
    
    health_data: null,  // Not applicable for travel
    life_data: null     // Not applicable for travel
  };
}
