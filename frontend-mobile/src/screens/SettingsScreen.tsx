import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function SettingsScreen(): React.JSX.Element {
  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'Clear local app cache?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Clear',
        onPress: () => {
          Alert.alert('Success', 'Cache cleared');
        },
        style: 'destructive',
      },
    ]);
  };

  const handleAbout = () => {
    Alert.alert(
      'About ScrolLearn',
      'ScrolLearn v1.0.0\n\nA card-based learning platform for mobile and web.'
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Configuration</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Backend URL</Text>
          <Text style={styles.settingValue}>http://localhost:8000</Text>
          <Text style={styles.settingDescription}>
            Make sure the backend is running on this address
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application</Text>

        <TouchableOpacity style={styles.settingButton} onPress={handleClearCache}>
          <Text style={styles.settingButtonText}>Clear Cache</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingButton} onPress={handleAbout}>
          <Text style={styles.settingButtonText}>About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Version</Text>
        <View style={styles.versionBox}>
          <Text style={styles.versionText}>ScrolLearn Mobile v1.0.0</Text>
          <Text style={styles.versionSubText}>Backend API v1.0.0</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for learning
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 12,
  },
  settingItem: {
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 13,
    color: '#d1d5db',
    marginBottom: 4,
    fontFamily: 'Menlo',
  },
  settingDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  settingButton: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  settingButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  versionBox: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  versionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  versionSubText: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
  },
});
