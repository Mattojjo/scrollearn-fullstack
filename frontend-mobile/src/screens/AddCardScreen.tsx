import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { createCard } from '../utils/api';

export default function AddCardScreen(): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCard = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await createCard({
        name: title.trim(),
        description: content.trim(),
      });

      Alert.alert('Success', 'Card added successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setTitle('');
            setContent('');
          },
        },
      ]);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to add card';
      setError(errorMsg);
      Alert.alert('Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title Label */}
          <Text style={styles.label}>Card Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter card title..."
            placeholderTextColor="#6b7280"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError(null);
            }}
            editable={!loading}
            maxLength={255}
          />
          <Text style={styles.charCount}>
            {title.length}/255
          </Text>

          {/* Content Label */}
          <Text style={[styles.label, { marginTop: 24 }]}>Card Content</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Enter card content..."
            placeholderTextColor="#6b7280"
            value={content}
            onChangeText={(text) => {
              setContent(text);
              if (error) setError(null);
            }}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!loading}
            maxLength={1000}
          />
          <Text style={styles.charCount}>
            {content.length}/1000
          </Text>

          {/* Error Message */}
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleAddCard}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitButtonText}>Add Card</Text>
            )}
          </TouchableOpacity>

          {/* Info Text */}
          <Text style={styles.infoText}>
            Your card will be synced with the backend and appear in your cards
            list.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#1f2937',
  },
  contentInput: {
    borderWidth: 2,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#1f2937',
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'right',
  },
  errorBox: {
    backgroundColor: '#7f1d1d',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
});
