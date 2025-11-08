import { StyleSheet } from 'react-native'


// Global Styles
export const globalStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
      flex: 1,
      padding: 20,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    authContainer: {
      padding: 20,
      justifyContent: 'center',
      minHeight: '100%',
    },
    logo: {
      alignSelf: 'center',
      marginBottom: 20,
    },
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: '#666',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: '#666',
      marginBottom: 24,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
    },
    primaryButton: {
      backgroundColor: '#E91E63',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
      flex: 1
    },
    primaryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    secondaryButtonText: {
      color: '#E91E63',
      fontSize: 16,
      fontWeight: '600',
    },
    outlineButton: {
      marginTop: 16,
      borderWidth: 2,
      borderColor: '#E91E63',
      padding: 16,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    outlineButtonText: {
      color: '#E91E63',
      fontSize: 16,
      fontWeight: '600',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardIcon: {
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 14,
      color: '#666',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: '#333',
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      backgroundColor: '#f5f5f5',
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    chipActive: {
      backgroundColor: '#E91E63',
      borderColor: '#E91E63',
    },
    chipText: {
      fontSize: 14,
      color: '#333',
    },
    chipTextActive: {
      color: '#fff',
    },
    preferenceButton: {
      backgroundColor: '#f5f5f5',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    preferenceButtonText: {
      color: '#E91E63',
      fontSize: 16,
      fontWeight: '600',
    },
    itineraryCard: {
      backgroundColor: '#f9f9f9',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#E91E63',
    },
    itineraryTime: {
      fontSize: 14,
      fontWeight: '600',
      color: '#E91E63',
      marginBottom: 4,
    },
    itineraryTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    itineraryDescription: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
    },
    itineraryCost: {
      fontSize: 14,
      fontWeight: '600',
      color: '#4CAF50',
    },
    costBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    costText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#4CAF50',
      marginLeft: 4,
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: 16,
    },
  });