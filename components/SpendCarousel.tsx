import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import SpendCard from "./spendCard";

const formatAmount = (amount: number) => amount.toLocaleString();

// Helper function to format dates
const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Helper function to get previous dates
const getPreviousDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

const SpendCarousel = () => {
  const [data, setData] = useState([
    {
      id: "1",
      date: new Date(), // Today
      amount: 23946,
      differenceText: "47% below than yesterday",
    },
    {
      id: "2",
      date: getPreviousDate(1), // Yesterday
      amount: 22000,
      differenceText: "12% higher than previous",
    },
    {
      id: "3",
      date: getPreviousDate(2), // 2 days ago
      amount: 18500,
      differenceText: "5% below than previous",
    },
    {
      id: "4",
      date: getPreviousDate(3), // 3 days ago
      amount: 18500,
      differenceText: "5% below than previous",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          const randomIncrease = Math.floor(Math.random() * 10000) + 100;
          const newAmount = item.amount + randomIncrease;
          return {
            ...item,
            amount: newAmount,
          };
        })
      );
    }, 100000);

    return () => clearInterval(interval);
  }, []);

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
            amount={formatAmount(item.amount)}
            differenceText={item.differenceText}
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

export default SpendCarousel;

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