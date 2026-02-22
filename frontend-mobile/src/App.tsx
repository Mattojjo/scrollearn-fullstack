/**
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import CardsScreen from './src/screens/CardsScreen';
import AddCardScreen from './src/screens/AddCardScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CardsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="CardsList"
        component={CardsScreen}
        options={{ title: 'ScrolLearn' }}
      />
    </Stack.Navigator>
  );
}

function AddCardStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{ title: 'Add New Card' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366f1',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
              backgroundColor: '#1f2937',
              borderTopColor: '#374151',
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="CardsStack"
            component={CardsStackNavigator}
            options={{
              title: 'Cards',
              tabBarLabel: 'Cards',
              tabBarIcon: ({ color, size }) => (
                <CardIcon color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="AddCardStack"
            component={AddCardStackNavigator}
            options={{
              title: 'Add Card',
              tabBarLabel: 'Add',
              tabBarIcon: ({ color, size }) => (
                <AddIcon color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="SettingsStack"
            component={SettingsStackNavigator}
            options={{
              title: 'Settings',
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <SettingsIcon color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

// Simple icon components (can be replaced with react-native-vector-icons)
function CardIcon({ color, size }: { color: string; size: number }) {
  return <Icon name="📇" size={size} />;
}

function AddIcon({ color, size }: { color: string; size: number }) {
  return <Icon name="➕" size={size} />;
}

function SettingsIcon({ color, size }: { color: string; size: number }) {
  return <Icon name="⚙️" size={size} />;
}

function Icon({ name, size }: { name: string; size: number }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: size }}>{name}</Text>;
}

export default App;
