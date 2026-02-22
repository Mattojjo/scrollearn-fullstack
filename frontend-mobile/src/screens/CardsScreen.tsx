import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { fetchCards, deleteCard, Card } from '../utils/api';
import CardItem from '../components/CardItem';

export default function CardsScreen(): React.JSX.Element {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchCards();
      setCards(data);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to load cards';
      setError(errorMsg);
      console.error('Error loading cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCards();
    setRefreshing(false);
  };

  const handleDeleteCard = (card: Card) => {
    Alert.alert(
      'Delete Card',
      `Are you sure you want to delete "${card.name}"?`,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteCard(card.id);
              await loadCards();
            } catch (err) {
              Alert.alert('Error', 'Failed to delete card');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading && cards.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading cards...</Text>
      </View>
    );
  }

  if (error && cards.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Error</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadCards}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyTitle}>No Cards Yet</Text>
        <Text style={styles.emptyText}>
          Create your first card to get started!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardItem
            card={item}
            isSelected={selectedCard?.id === item.id}
            onSelect={() => setSelectedCard(item)}
            onDelete={handleDeleteCard}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  errorBanner: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  errorBannerText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
  },
});
