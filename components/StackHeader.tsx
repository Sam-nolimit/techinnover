import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface LogoHeaderProps {
  onProfilePress?: () => void;
  logoSource: any; 
  profileImageSource: any; 
  style?: StyleProp<ViewStyle>; 
  backgroundColor?: string;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({
  onProfilePress,
  logoSource,
  profileImageSource,
  style,
  backgroundColor = "",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Image
        source={logoSource}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={profileImageSource}
          style={styles.userIcon}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 40,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d9dce1",
  },
});
