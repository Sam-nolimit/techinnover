import LogoHeader from "@/components/StackHeader";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <View style={styles.rootContainer}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <LogoHeader
          logoSource={require("@/assets/images/icon1.png")}
          profileImageSource={require("@/assets/images/unknownUser.png")}
          onProfilePress={() => router.push("/")}
        />
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
