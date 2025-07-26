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
    width: '48%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  iconWrapper: {
    marginBottom: 8,
  },
  label: {
    color: '#0063F7',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'LatoBold',
  },
});

export default QuickLinkCard;
