import { GooglePlacesService } from './googlePlacesService';

export const DateGenerator = {
  /**
   * Generate a complete date itinerary
   */
  generateDatePlan: async (preferences, location) => {
    try {

      const {
        dateType,
        budget,
        startTime, 
        duration, 
        transportType,
      } = preferences;

      console.log('Generating date plan with preferences:', preferences);

      let searchRadius;

      switch (preferences.transportType) {
        case "driving":
            searchRadius = 20000;
        case "walking":
            searchRadius = 5000;
        case "biking":
            searchRadius = 10000;
        default:
            searchRadius = 10000;
      }

      // Find places based on date type and budget
      const placesResult = await GooglePlacesService.findPlacesForDate(
        dateType,
        budget,
        location,
        searchRadius
      );

      if (!placesResult.success || placesResult.places.length === 0) {
        return {
          success: false,
          error: 'No suitable venues found nearby. Try adjusting your preferences.',
        };
      }

      // Select the best venues for the itinerary
      const selectedVenues = DateGenerator.selectVenues(
        placesResult.places,
        dateType,
        5
      );

      // Create time-based itinerary
      const itinerary = DateGenerator.createItinerary(
        selectedVenues,
        startTime,
        duration
      );

      // Calculate total cost
      const totalCost = DateGenerator.calculateTotalCost(itinerary);

      // Generate date plan object
      const datePlan = {
        id: `date_${Date.now()}`,
        title: DateGenerator.generateDateTitle(dateType),
        dateType: dateType,
        date: new Date().toISOString().split('T')[0], // Today's date
        dateTime: DateGenerator.parseStartTime(startTime),
        budget: budget,
        itinerary: itinerary,
        totalCost: totalCost,
        transportType: transportType,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        createdAt: new Date().toISOString(),
      };

      return {
        success: true,
        datePlan: datePlan,
      };
    } catch (error) {
      console.error('Error generating date plan:', error);
      return {
        success: false,
        error: 'Failed to generate date plan. Please try again.',
      };
    }
  },

  /**
   * Select the best venues for the itinerary
   */
  selectVenues: (places, dateType, count) => {
    // Filter places with good ratings
    const qualityPlaces = places.filter(place => 
      (place.rating || 0) >= 3.5 && place.user_ratings_total >= 10
    );

    // Diversify venue types
    const diversePlaces = DateGenerator.diversifyVenues(
      qualityPlaces.length > 0 ? qualityPlaces : places
    );

    // Return top venues
    return diversePlaces.slice(0, count);
  },

  /**
   * Ensure venue diversity (don't pick 3 restaurants)
   */
  diversifyVenues: (places) => {
    const selected = [];
    const usedTypes = new Set();

    for (const place of places) {
      const primaryType = place.types?.[0];
      
      // Try to avoid duplicate types
      if (!usedTypes.has(primaryType)) {
        selected.push(place);
        if (primaryType) usedTypes.add(primaryType);
      }

      if (selected.length >= 5) break;
    }

    return selected;
  },

  /**
   * Create time-based itinerary from venues
   */
  createItinerary: (venues, startTime, totalDuration) => {
    const itinerary = [];
    let currentTime = DateGenerator.parseTime(startTime);
    const durationPerActivity = Math.floor((totalDuration * 60) / venues.length); // minutes

    venues.forEach((venue, index) => {
      const timeString = DateGenerator.formatTime(currentTime);
      const estimatedCost = GooglePlacesService.estimateCost(venue.price_level);

      itinerary.push({
        time: timeString,
        title: venue.name,
        description: DateGenerator.generateDescription(venue),
        location: venue.vicinity || venue.formatted_address,
        address: venue.vicinity || venue.formatted_address,
        coordinates: {
          latitude: venue.geometry.location.lat,
          longitude: venue.geometry.location.lng,
        },
        cost: estimatedCost > 0 ? `$${estimatedCost}` : 'Free',
        costAmount: estimatedCost,
        priceLevel: GooglePlacesService.formatPriceLevel(venue.price_level),
        rating: venue.rating,
        placeId: venue.place_id,
        photos: venue.photos,
        isOpen: venue.opening_hours?.open_now,
      });

      // Add time for next activity
      currentTime.setMinutes(currentTime.getMinutes() + durationPerActivity);
    });

    return itinerary;
  },

  /**
   * Parse time string (e.g., "18:00") into Date object
   */
  parseTime: (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  },

  /**
   * Parse start time and create full datetime
   */
  parseStartTime: (timeString) => {
    const date = new Date();
    const [hours, minutes] = timeString.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  },

  /**
   * Format Date object to time string
   */
  formatTime: (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    return `${displayHours}:${displayMinutes} ${ampm}`;
  },

  /**
   * Generate activity description
   */
  generateDescription: (venue) => {
    const types = venue.types || [];
    const rating = venue.rating ? `${venue.rating}★` : '';
    
    // Map common place types to friendly descriptions
    const typeDescriptions = {
      restaurant: 'Dining experience',
      cafe: 'Coffee and conversation',
      park: 'Outdoor activity',
      museum: 'Cultural exploration',
      movie_theater: 'Entertainment',
      amusement_park: 'Fun and excitement',
      spa: 'Relaxation and wellness',
      art_gallery: 'Art appreciation',
      movie_theater: "Movies & Entertainment",
      arcade: "Games & Recreation",
      escape_room: "Games & Recreation"
    };

    const primaryType = types.find(type => typeDescriptions[type]);
    const description = typeDescriptions[primaryType] || 'Activity';

    return rating ? `${description} • ${rating}` : description;
  },

  /**
   * Calculate total estimated cost
   */
  calculateTotalCost: (itinerary) => {
    const total = itinerary.reduce((sum, item) => sum + (item.costAmount || 0), 0);
    return total > 0 ? `$${total}` : 'Free';
  },

  /**
   * Generate a creative date title
   */
  generateDateTitle: (dateType) => {
    // AI generated titles
    const titles = {
      Dinner: ['Culinary Evening', 'Romantic Dinner Date', 'Fine Dining Experience'],
      Adventure: ['Adventure Awaits', 'Exciting Day Out', 'Thrill Seeker\'s Date'],
      Relaxing: ['Peaceful Escape', 'Chill Day Together', 'Relaxation Retreat'],
      Romantic: ['Romantic Evening', 'Love in the Air', 'Special Night Out'],
      Cultural: ['Cultural Journey', 'Art & Culture Date', 'Museum Day'],
      Sporty: ['Active Date Day', 'Sports & Fun', 'Athletic Adventure'],
      Fun: ['Fun Times Ahead', 'Entertainment Extravaganza', 'Joy & Laughter'],
    };

    const options = titles[dateType] || ['Perfect Date'];
    return options[Math.floor(Math.random() * options.length)];
  },

  /**
   * Get additional recommendations (for "View More" feature)
   */
  getAlternativeVenues: async (dateType, budget, location, excludePlaceIds = []) => {
    const result = await GooglePlacesService.findPlacesForDate(
      dateType,
      budget,
      location
    );

    if (result.success) {
      // Filter out already selected venues
      const alternatives = result.places.filter(
        place => !excludePlaceIds.includes(place.place_id)
      );

      return {
        success: true,
        venues: alternatives.slice(0, 10), // Return top 10 alternatives
      };
    }

    return { success: false, venues: [] };
  },

  /**
   * Regenerate itinerary with different venues
   */
  regeneratePlan: async (currentPlan, location) => {
    // Get current place IDs to exclude
    const excludeIds = currentPlan.itinerary.map(item => item.placeId);

    // Generate new plan excluding current venues
    const placesResult = await GooglePlacesService.findPlacesForDate(
      currentPlan.dateType,
      currentPlan.budget,
      location
    );

    if (placesResult.success) {
      const newPlaces = placesResult.places.filter(
        place => !excludeIds.includes(place.place_id)
      );

      if (newPlaces.length >= 2) {
        return DateGenerator.generateDatePlan(
          {
            dateType: currentPlan.dateType,
            budget: currentPlan.budget,
            startTime: '18:00',
          },
          location
        );
      }
    }

    return {
      success: false,
      error: 'No alternative venues found. Try adjusting your preferences.',
    };
  },
};