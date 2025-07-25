import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type QuickLinkCardProps = {
  Icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

const QuickLinkCard = ({ Icon, label, onPress }: QuickLinkCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>{Icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  iconWrapper: {
    backgroundColor: '#0063F7',
    borderRadius: 999,
    padding: 12,
    marginBottom: 10,
  },
  label: {
    color: '#0063F7',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default QuickLinkCard;
