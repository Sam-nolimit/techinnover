import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { View, Text, ActivityIndicator } from 'react-native';

import { useColorScheme } from "@/hooks/useColorScheme";

const LoadingScreen = () => (
  <View style={{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  }}>
    <ActivityIndicator size="large" color="#2563EB" />
    {/* <Text style={{ 
      marginTop: 16, 
      fontSize: 16, 
      color: '#666',
      fontFamily: 'LatoRegular'
    }}>
      Loading...
    </Text> */}
  </View>
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    LatoThin: require("../assets/fonts/Lato-Thin.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
    LatoBlack: require("../assets/fonts/Lato-Black.ttf"),
    LatoThinItalics: require("../assets/fonts/Lato-ThinItalic.ttf"),
  });

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}