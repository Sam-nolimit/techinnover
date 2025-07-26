import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    color: '#101828',
    fontFamily: "LatoBold",

  },
  subtitle: {
    fontSize: 14,
    color: '#667085',
    marginTop: 2,
    fontFamily: "LatoRegular",

  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#101828',
    fontFamily: "LatoBold",
  },
  date: {
    fontSize: 13,
    color: '#667085',
    marginTop: 2,
    fontFamily: "LatoRegular",
  },
});

export default RecentTransactionItem;
