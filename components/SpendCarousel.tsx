import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import SpendCard from "./spendCard";
import TrendDownIcon from "../assets/images/trend-down.svg";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  };
  return date.toLocaleDateString('en-US', options);
};

const getPreviousDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const SpendCarousel = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getDailySpending = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return expenses
      .filter(expense => expense.date === dateString)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const [data, setData] = useState([
    {
      id: "1",
      date: new Date(), 
      amount: getDailySpending(new Date()),
      differenceText: "47% below than yesterday",
    },
    {
      id: "2",
      date: getPreviousDate(1), 
      amount: getDailySpending(getPreviousDate(1)),
      differenceText: "12% higher than previous",
    },
    {
      id: "3",
      date: getPreviousDate(2),
      amount: getDailySpending(getPreviousDate(2)),
      differenceText: "5% below than previous",
    },
    {
      id: "4",
      date: getPreviousDate(3),
      amount: getDailySpending(getPreviousDate(3)),
      differenceText: "5% below than previous",
    },
  ]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    setData(prevData => 
      prevData.map(item => ({
        ...item,
        amount: getDailySpending(item.date)
      }))
    );
  }, [expenses]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <SpendCard
            dateLabel={
              index === 0 
                ? `Today's spend (${formatDate(item.date)})` 
                : index === 1 
                  ? `Yesterday's spend (${formatDate(item.date)})` 
                  : formatDate(item.date)
            }
            amount={item.amount.toLocaleString()}
            differenceText={item.differenceText}
            // icon={<TrendDownIcon width={18} height={18} />}
          />
        )}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    zIndex: 2,
  },
  dot: {
    width: 16,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#E4E6EB",
    marginHorizontal: 4,
    zIndex: 3,
  },
  activeDot: {
    backgroundColor: "#0B1221",
    zIndex: 4,
  },
});

export default SpendCarousel;