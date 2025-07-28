import LogoHeader from "@/components/StackHeader";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Animated, Platform, StatusBar } from "react-native";
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Animated opacity for blur effect
  const blurOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.95],
    extrapolate: 'clamp',
  });

  // Animated background color for status bar area
  const statusBarBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.rootContainer}>
      {/* Status Bar Blur Overlay */}
      <Animated.View 
        style={[
          styles.statusBarBlur,
          {
            height: insets.top + (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0),
            opacity: blurOpacity,
          }
        ]}
        pointerEvents="none"
      >
        <BlurView
          intensity={20}
          tint="light"
          style={StyleSheet.absoluteFillObject}
        />
        <Animated.View 
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: statusBarBackgroundColor }
          ]}
        />
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <LogoHeader
          logoSource={require("@/assets/images/icon1.png")}
          profileImageSource={require("@/assets/images/unknownUser.png")}
          onProfilePress={() => router.push("/")}
        />
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingBottom: hp("15%"),
  },
  content: {
    paddingHorizontal: wp("4%"),
    paddingTop: hp("1%"),
  },
});