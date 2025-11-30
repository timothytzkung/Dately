import * as Calendar from 'expo-calendar';
import { Platform, Alert } from 'react-native';

export const CalendarService = {
  // Request calendar permissions
  requestPermissions: async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      
      if (status === 'granted') {
        console.log('Calendar permission granted');
        return true;
      } else {
        Alert.alert(
          'Permission Required',
          'Calendar permission is needed to add date reminders to your calendar.',
          [{ text: 'OK' }]
        );
        return false;
      }
    } catch (error) {
      console.error('Error requesting calendar permission:', error);
      return false;
    }
  },

  // Get or create default calendar
  getDefaultCalendar: async () => {
    try {
      // Get all calendars
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      
      // Find the default calendar or first writable calendar
      let defaultCalendar = calendars.find(cal => cal.allowsModifications);
      
      if (!defaultCalendar) {
        // Create a new calendar if none found (Android)
        if (Platform.OS === 'android') {
          const defaultCalendarSource = calendars.find(
            cal => cal.source.name === 'Default' || cal.source.type === Calendar.SourceType.LOCAL
          )?.source;

          if (defaultCalendarSource) {
            const newCalendarID = await Calendar.createCalendarAsync({
              title: 'Dately',
              color: '#E91E63',
              entityType: Calendar.EntityTypes.EVENT,
              sourceId: defaultCalendarSource.id,
              source: defaultCalendarSource,
              name: 'Dately Calendar',
              ownerAccount: 'personal',
              accessLevel: Calendar.CalendarAccessLevel.OWNER,
            });
            
            const newCalendar = calendars.find(cal => cal.id === newCalendarID);
            return newCalendar;
          }
        }
        
        // If still no calendar, use the first one
        defaultCalendar = calendars[0];
      }
      
      return defaultCalendar;
    } catch (error) {
      console.error('Error getting calendar:', error);
      return null;
    }
  },

  // Add a date plan to calendar
  addDateToCalendar: async (datePlan) => {
    try {
      // Request permissions
      const hasPermission = await CalendarService.requestPermissions();
      if (!hasPermission) return { success: false };

      // Get calendar
      const calendar = await CalendarService.getDefaultCalendar();
      if (!calendar) {
        Alert.alert('Error', 'No calendar available to add events.');
        return { success: false };
      }

      // Parse the date and time
      const dateTime = new Date(datePlan.dateTime || datePlan.date);
      
      // If only date provided (no time), set to 6 PM
      if (!datePlan.dateTime) {
        dateTime.setHours(18, 0, 0, 0);
      }

      // Calculate end time (2 hours later by default)
      const endTime = new Date(dateTime.getTime() + 2 * 60 * 60 * 1000);

      // Build event details
      let notes = '';
      if (datePlan.itinerary && datePlan.itinerary.length > 0) {
        notes = 'Itinerary:\n';
        datePlan.itinerary.forEach((item, index) => {
          notes += `\n${index + 1}. ${item.time} - ${item.title}`;
          if (item.location) {
            notes += `\n   ${item.location}`;
          }
          notes += `\n   ${item.cost}\n`;
        });
      }
      
      if (datePlan.totalCost) {
        notes += `\nTotal Cost: ${datePlan.totalCost}`;
      }

      notes += '\n\n✨ Planned with Dately';

      // Get location (first venue from itinerary)
      const location = datePlan.itinerary?.[0]?.location || datePlan.location || '';

      // Create the event
      const eventId = await Calendar.createEventAsync(calendar.id, {
        title: `${datePlan.title}`,
        startDate: dateTime,
        endDate: endTime,
        location: location,
        notes: notes,
        alarms: [
          { relativeOffset: -60 }, // 1 hour before
          { relativeOffset: -1440 }, // 1 day before
        ],
      });

      console.log('Event created with ID:', eventId);
      
      Alert.alert(
        'Added to Calendar!',
        `"${datePlan.title}" has been added to your calendar with reminders.`,
        [{ text: 'Great!' }]
      );

      return { success: true, eventId };
    } catch (error) {
      console.error('Error adding to calendar:', error);
      Alert.alert('Error', 'Failed to add date to calendar. Please try again.');
      return { success: false, error };
    }
  },

  // Add a simple date reminder
  addSimpleDateReminder: async (title, dateTime, location = '') => {
    try {
      const hasPermission = await CalendarService.requestPermissions();
      if (!hasPermission) return { success: false };

      const calendar = await CalendarService.getDefaultCalendar();
      if (!calendar) return { success: false };

      const date = new Date(dateTime);
      const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);

      const eventId = await Calendar.createEventAsync(calendar.id, {
        title: `${title}`,
        startDate: date,
        endDate: endDate,
        location: location,
        alarms: [{ relativeOffset: -60 }],
      });

      return { success: true, eventId };
    } catch (error) {
      console.error('Error adding reminder:', error);
      return { success: false, error };
    }
  },

  // Check if event already exists (to prevent duplicates)
  checkEventExists: async (title, startDate) => {
    try {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      
      // Search events in a 1-day window
      const dayStart = new Date(startDate);
      dayStart.setHours(0, 0, 0, 0);
      
      const dayEnd = new Date(startDate);
      dayEnd.setHours(23, 59, 59, 999);

      for (const calendar of calendars) {
        const events = await Calendar.getEventsAsync(
          [calendar.id],
          dayStart,
          dayEnd
        );

        const existingEvent = events.find(event => 
          event.title.includes(title)
        );

        if (existingEvent) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error checking for existing event:', error);
      return false;
    }
  },
};
