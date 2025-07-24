import SunIcon from "@/assets/images/sun.svg"; // Your sun.svg should already exist
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      text: "Good Morning!",
      icon: <SunIcon width={20} height={20} style={styles.icon} />,
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      text: "Good Afternoon!",
      icon: <SunIcon width={20} height={20} style={styles.icon} />,
    };
  } else {
    return {
      text: "Good Evening!",
      icon: <Text style={styles.emojiIcon}>🌙</Text>,
    };
  }
};

const UserName = () => {
  const greeting = getGreeting();

  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={styles.greetingRow}>
        <Text style={styles.greetingText}>{greeting.text}</Text>
        {greeting.icon}
      </View>
      <Text style={styles.nameText}>Adeola Adeyoyin</Text>
    </View>
  );
};

export default UserName;

const styles = StyleSheet.create({
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  emojiIcon: {
    marginRight: 6,
    fontSize: 18,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "latoLight",
  },
});
