import axios from 'axios';


const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

// Map date types to Google Places types
// const DATE_TYPE_MAPPING = {
//   'Dinner': ['restaurant', 'cafe'],
//   'Adventure': ['amusement_park', 'zoo', 'aquarium', 'park', 'tourist_attraction'],
//   'Relaxing': ['spa', 'park', 'cafe', 'museum', 'massage_spa', 'beauty_salon', 'health_spa'],
//   'Romantic': ['restaurant', 'movie_theater', 'park', 'art_gallery'],
//   'Cultural': ['museum', 'art_gallery', 'library', 'theater'],
//   'Sporty': ['bowling_alley', 'gym', 'stadium'],
//   'Fun': ['amusement_park', 'bowling_alley', 'movie_theater', 'arcade'],
// };

const DATE_TYPE_MAPPING = {
  'Dinner': [
    'theater',
    'restaurant', 
    'park'
  ],
  "Adventure": [
    "park",
    "amusement_park",
    "zoo",
    "cafe",
    "aquarium",
    "restaurant"
  ],
  "Relaxing": [
    "spa",
    "cafe",
    "museum",
    "park",
    "beauty_salon",
    "restaurant"
  ],
  "Romantic": [
    "restaurant",
    "art_gallery",
    "park",
    "movie_theater",
    "restaurant"
  ],
  "Cultural": [
    "library",
    "theater",
    "museum",
    "cafe",
    "art_gallery",
    "restaurant"
  ],
  "Sporty": [
    "bowling_alley",
    "arcade",
    "gym",
    "amusement_park",
    "restaurant"
  ],
  "Cozy": [
    "cafe",
    "library",
    "museum",
    "art_gallery",
    "restaurant"
  ],
  "Chill": [
    "park",
    "library",
    "cafe",
    "museum",
    "park"
  ],
  "Fun": [
    "amusement_park",
    "arcade",
    "bowling_alley",
    "arena",
    "restaurant"
  ]
}

// Map budget to Google Places price levels (0-4)
const BUDGET_MAPPING = {
  '$': [0, 1],      // Free and inexpensive
  '$$': [0, 2],     // Inexpensive to moderate
  '$$$': [0, 3],    // Moderate to expensive
  '$$$$': [0, 4],   // Expensive to very expensive
};

export const GooglePlacesService = {
  /**
   * Search for nearby places based on location and type
   */
  searchNearbyPlaces: async (location, type, radius = 50000, options = {}) => {
    const params = {
      location: `${location.latitude},${location.longitude}`,
      radius: radius,
      type: type,
      key: GOOGLE_API_KEY,
      opennow: options.openNow || false
    }

    if (type == "Dinner") {
      params.minprice = options.minPrice || 0;
      params.maxprice = options.maxPrice;
    }
    
    try {
      const response = await axios.get(`${PLACES_BASE_URL}/nearbysearch/json`, {
        params: params,
      });

      if (response.data.status === 'OK') {
        return {
          success: true,
          places: response.data.results,
          nextPageToken: response.data.next_page_token,
        };
      } else if (response.data.status === 'ZERO_RESULTS') {
        return { success: true, places: [] };
      } else {
        console.error('Places API error:', response.data.status);
        return { success: false, error: response.data.status };
      }
    } catch (error) {
      console.error('Error searching places:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get detailed information about a specific place
   */
  getPlaceDetails: async (placeId) => {
    try {
      const response = await axios.get(`${PLACES_BASE_URL}/details/json`, {
        params: {
          place_id: placeId,
          fields: 'name,rating,formatted_address,formatted_phone_number,opening_hours,price_level,photos,website,reviews,types,geometry',
          key: GOOGLE_API_KEY,
        },
      });

      if (response.data.status === 'OK') {
        return {
          success: true,
          place: response.data.result,
        };
      } else {
        return { success: false, error: response.data.status };
      }
    } catch (error) {
      console.error('Error getting place details:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get photo URL from photo reference
   */
  getPhotoUrl: (photoReference, maxWidth = 400) => {
    return `${PLACES_BASE_URL}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;
  },

  /**
   * Search for places by text query
   */
  textSearch: async (query, location, radius) => {
    try {
      const response = await axios.get(`${PLACES_BASE_URL}/textsearch/json`, {
        params: {
          query: query,
          location: location ? `${location.latitude},${location.longitude}` : undefined,
          radius: location ? radius : undefined,
          key: GOOGLE_API_KEY,
        },
      });

      if (response.data.status === 'OK') {
        return {
          success: true,
          places: response.data.results,
        };
      } else {
        return { success: false, error: response.data.status };
      }
    } catch (error) {
      console.error('Error in text search:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Find places for a specific date type and budget
   */
  findPlacesForDate: async (dateType, budget, location, radius = 50000) => {
    try {
      const placeTypes = DATE_TYPE_MAPPING[dateType];
      if (!placeTypes) {
        return { success: false, error: "Invalid dateType" };
      }

      const schedulePlaces = [];
      const usedPlaceIds = new Set(); // To track places already in the schedule

      const [minPrice, maxPrice] = BUDGET_MAPPING[budget] || [0, 4];

      for (const type of placeTypes) {
        
        // Only apply price filters for types that support it
        let priceOptions = {};
        if (type === 'restaurant' || type === 'cafe') {
           priceOptions = { minPrice, maxPrice };
        }

        // Search for places for the current type
        const result = await GooglePlacesService.searchNearbyPlaces(
          location,
          type,
          radius,
          priceOptions // Pass conditional price options
        );

        if (result.success && result.places && result.places.length > 0) {
          
          // Shuffle the results for type
          const shuffledPlaces = [...result.places]; // Create a copy to shuffle
          for (let i = shuffledPlaces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledPlaces[i], shuffledPlaces[j]] = [shuffledPlaces[j], shuffledPlaces[i]];
          }

          // Find the first random place haven't used yet
          const chosenPlace = shuffledPlaces.find(
            place => !usedPlaceIds.has(place.place_id)
          );

          // If found a new place, add it to schedule
          if (chosenPlace) {
            schedulePlaces.push(chosenPlace);
            usedPlaceIds.add(chosenPlace.place_id);
          } else {
            console.log(`No new place found for type: ${type}`);
          }
        }
      }

      return {
        success: true,
        places: schedulePlaces, 
      };

    } catch (error) {
      console.error('Error creating schedule:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Calculate estimated cost based on price level
   */
  estimateCost: (priceLevel, numberOfPeople = 2) => {
    const costPerPerson = {
      0: 0,      // Free
      1: 15,     // Inexpensive ($)
      2: 30,     // Moderate ($$)
      3: 60,     // Expensive ($$$)
      4: 100,    // Very Expensive ($$$$)
    };

    const total = (costPerPerson[priceLevel] || 30) * numberOfPeople;
    return total;
  },

  /**
   * Format price level as dollar signs
   */
  formatPriceLevel: (priceLevel) => {
    if (priceLevel === undefined || priceLevel === null) return 'Price not available';
    if (priceLevel === 0) return 'Free';
    return '$'.repeat(priceLevel);
  },
};