import requests
from google.adk.agents.llm_agent import Agent

NEWS_API_KEY = '2bbe952fbc2f446f9877997f7fa7f4b1'
NEWS_API_BASE = 'https://newsapi.org/v2/everything'


# ====================
# Tool Functions
# ====================

def get_flight_news(travel_json: dict) -> dict:
    """
    Fetches real-time flight and airport news for the destination city.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Flight news results
    """
    try:
        dest_city = travel_json["travel_data"]["destination"]["city"]
        
        params = {
            'q': f'{dest_city} flight OR airport',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'flight_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'flight_news'}


def get_train_news(travel_json: dict) -> dict:
    """
    Fetches real-time train and railway news for the destination.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Train news results
    """
    try:
        dest_city = travel_json["travel_data"]["destination"]["city"]
        
        params = {
            'q': f'{dest_city} train OR railway',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'train_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'train_news'}


def get_road_news(travel_json: dict) -> dict:
    """
    Fetches real-time road and traffic news for the destination.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Road news results
    """
    try:
        dest_city = travel_json["travel_data"]["destination"]["city"]
        
        params = {
            'q': f'{dest_city} traffic OR road',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'road_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'road_news'}


def get_weather_news(travel_json: dict) -> dict:
    """
    Fetches real-time weather alerts and forecasts for the destination.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Weather news results
    """
    try:
        dest_city = travel_json["travel_data"]["destination"]["city"]
        
        params = {
            'q': f'{dest_city} weather OR storm OR flood',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'weather_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'weather_news'}


def get_safety_news(travel_json: dict) -> dict:
    """
    Fetches real-time safety and security news for the destination.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Safety news results
    """
    try:
        dest_city = travel_json["travel_data"]["destination"]["city"]
        
        params = {
            'q': f'{dest_city} safety OR protest OR security',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'safety_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'safety_news'}


def get_health_news(travel_json: dict) -> dict:
    """
    Fetches real-time health alerts and disease outbreaks.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Health news results
    """
    try:
        dest_country = travel_json["travel_data"]["destination"]["country"]
        
        params = {
            'q': f'{dest_country} health OR outbreak OR disease',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'health_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'health_news'}


def get_events_news(travel_json: dict) -> dict:
    """
    Fetches real-time events and festivals happening at the destination.
    
    Args:
        travel_json: Standard travel JSON with destination info
    
    Returns:
        dict: Events news results
    """
    try:
        dest_city = travel_json["travel_data"]["destination"]["city"]
        
        params = {
            'q': f'{dest_city} festival OR event OR concert',
            'apiKey': NEWS_API_KEY
        }
        
        response = requests.get(NEWS_API_BASE, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        return {
            'success': True,
            'category': 'events_news',
            'total_results': data.get('totalResults', 0),
            'articles': data.get('articles', [])[:5]
        }
    except Exception as e:
        return {'success': False, 'error': str(e), 'category': 'events_news'}


# ====================
# Agent Configuration
# ====================

root_agent = Agent(
    model='gemini-2.5-flash',
    name='news_agent',
    description='An intelligent agent that fetches relevant real-time news for travelers based on their trip details.',
    instruction="""You are a travel news intelligence agent. Your job is to fetch 5 types of news for the traveler.

CALL ALL 2 TOOLS:
1. flight_news - Flight delays, cancellations, airport disruptions
2. weather_news - Weather alerts, storms, extreme conditions

You will receive a JSON in this format:

{
    "metadata": {
        "timestamp": "2025-01-15T10:30:00Z",
        "pipeline": "travel"
    },
    "user_profile": {
        "age": 32,
        "location": {
            "city": "Delhi",
            "country": "India"
        }
    },
    "travel_data": {
        "destination": {
            "city": "Mumbai",
            "country": "India"
        },
        "dates": {
            "start": "2025-02-10T00:00:00Z",
            "duration_days": 10
        },
        "travelers": "family",
        "purpose": "holiday",
        "activities": ["sightseeing", "water_sports"],
        "budget_range": "mid"
    },
    "health_data": null,
    "life_data": null
}

Analyze the travel JSON and call all 5 tools. Return a comprehensive summary highlighting any critical alerts or disruptions.""",
    tools=[
        get_flight_news,
        get_weather_news,
       
    ]
)
