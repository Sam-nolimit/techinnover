import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type RecentTransactionItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
};

const RecentTransactionItem = ({
  icon,
  title,
  subtitle,
  amount,
  date,
}: RecentTransactionItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₦ {amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
});

export default RecentTransactionItem;
