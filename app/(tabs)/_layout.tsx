import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeIcon from '@/assets/images/tabIcon/home.svg';
import HomeIconFocus from '@/assets/images/tabIcon/homeFocus.svg';
import AnalyticsIcon from '@/assets/images/tabIcon/chart.svg';
import AnalyticsIconFocus from '@/assets/images/tabIcon/chartFocus.svg';
import AddExpenseIcon from '@/assets/images/tabIcon/add-circle.svg';
import { useFonts } from 'expo-font';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
      fontFamily: 'LatoBold', 
    },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: 'absolute',
              height: 85,
            },
            android: {
              height: 70,
            },
          }),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => focused ? (
            <HomeIconFocus width={24} height={24} fill={color} />
          ) : (
            <HomeIcon width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="addExpense"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.addExpenseIcon}>
              <AddExpenseIcon width={54} height={54} fill={color} />
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none', 
          },
          tabBarStyle: { display: 'none' }, 
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ focused, color }) => focused ? (
            <AnalyticsIconFocus width={24} height={24} fill={color} />
          ) : (
            <AnalyticsIcon width={24} height={24} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addExpenseIcon: {
    top: -20,
    width: 56, 
    height: 56,
    borderRadius: 28, 
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});