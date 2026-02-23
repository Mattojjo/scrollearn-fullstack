import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Card } from '../utils/api';

interface CardItemProps {
  card: Card;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (card: Card) => void;
}

export default function CardItem({
  card,
  isSelected,
  onSelect,
  onDelete,
}: CardItemProps): React.JSX.Element {
  const formattedDate = new Date(card.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={onSelect}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {card.name}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {card.description}
        </Text>
        <Text style={styles.cardDate}>{formattedDate}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(card)}>
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  cardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#111827',
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#d1d5db',
    marginBottom: 6,
  },
  cardDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#7f1d1d',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#991b1b',
  },
  deleteButtonText: {
    fontSize: 20,
  },
});
