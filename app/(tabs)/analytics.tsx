import CarIcon from "@/assets/images/car.svg";
import EntertainmentIcon from "@/assets/images/entertainment.svg";
import FamilyIcon from "@/assets/images/family.svg";
import FoodIcon from "@/assets/images/food.svg";
import HealthIcon from "@/assets/images/health.svg";
import HouseIcon from "@/assets/images/housing.svg";
import ShopIcon from "@/assets/images/shopping.svg";
import TravelIcon from "@/assets/images/travel.svg";
import Layout from "@/constants/Layout";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const { width } = Dimensions.get("window");

const getIconForCategory = (categoryKey: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "Food & Drinks": <FoodIcon width={30} height={30} />,
    Housing: <HouseIcon width={30} height={30} />,
    Shopping: <ShopIcon width={30} height={30} />,
    Family: <FamilyIcon width={30} height={30} />,
    Transportation: <CarIcon width={30} height={30} />,
    "Travel/Vacation": <TravelIcon width={30} height={30} />,
    Entertainment: <EntertainmentIcon width={30} height={30} />,
    Health: <HealthIcon width={30} height={30} />,
  };
  return iconMap[categoryKey] || <HouseIcon width={30} height={30} />;
};

const AnalyticsScreen = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);
  const categories = useSelector(
    (state: RootState) => state.expenses.categories
  );

  const [selectedFilter, setSelectedFilter] = useState("All");

  // Calculate spending by category
  const categorySpending = categories
    .map((category) => {
      const categoryExpenses = expenses.filter(
        (expense) => expense.category.key === category.key
      );
      const total = categoryExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      return {
        value: total,
        label: category.key,
        color: category.color,
        onPress: () => console.log(`Pressed ${category.key}`),
      };
    })
    .filter((item) => item.value > 0);

  const totalExpense = categorySpending.reduce(
    (acc, item) => acc + item.value,
    0
  );
  const radius = width * 0.42;
  const innerRadius = radius * 0.75;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Layout>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Expense Report</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>This year (2025) ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabContainer}>
          {["All", "Daily", "Weekly", "Monthly"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedFilter(tab)}
              style={[
                styles.tabButton,
                selectedFilter === tab && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedFilter === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {categorySpending.length > 0 && (
          <View style={styles.chartContainer}>
            <PieChart
              data={categorySpending}
              donut
              innerRadius={innerRadius}
              radius={radius}
              showText
              textStyle={{
                color: "#000",
                fontSize: 12,
                fontFamily: "LatoBold",
              }}
            />
            <View style={styles.centerTextContainer}>
              <Text style={styles.totalExpenseText}>Total Expense</Text>
              <Text style={styles.totalAmount}>
                ₦ {totalExpense.toLocaleString()}
              </Text>
            </View>
          </View>
        )}

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendColumn}>
            {categorySpending
              .slice(0, Math.ceil(categorySpending.length / 2))
              .map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                </View>
              ))}
          </View>
          <View style={styles.legendColumn}>
            {categorySpending
              .slice(Math.ceil(categorySpending.length / 2))
              .map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: item.color }]}
                  />
                  <Text style={styles.legendLabel}>{item.label}</Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesHeader}>
            <Text style={styles.transactionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.addCategory}>+ Add</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryCardsWrapper}
          >
            {categorySpending.map((cat, index) => (
              <View key={index} style={styles.categoryCard}>
                <Text style={styles.categoryTitle}>{cat.label}</Text>

                <View style={[styles.categoryIconContainer]}>
                  {getIconForCategory(cat.label)}
                </View>
                <Text style={styles.categoryAmount}>
                  ₦ {cat.value.toLocaleString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.transactionTitle}>Transaction History</Text>

        <View style={styles.transactionList}>
          {expenses.slice(0, 5).map((expense) => (
            <View key={expense.id} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionDot,
                    { backgroundColor: expense.category.color },
                  ]}
                />
                <View>
                  <Text style={styles.transactionTitleText}>
                    {expense.title}
                  </Text>
                  <Text style={styles.transactionCategory}>
                    {expense.category.key}
                  </Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  ₦ {expense.amount.toLocaleString()}
                </Text>
                <Text style={styles.transactionDate}>
                  {formatDate(expense.date)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.loadMoreBtn}>
          <Text style={styles.loadMoreText}>Load more Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "LatoBold",
    color: "#0F172A",
  },
  dropdown: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: "#CBD5E1",
    borderWidth: 1,
  },
  dropdownText: {
    color: "#64748B",
    fontSize: 14,
    fontFamily: "LatoRegular",
  },
   tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 16,
    gap: 10,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  tabText: {
    color: "#64748B",
    fontSize: 14,
    fontFamily: "LatoRegular",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
    fontFamily: "LatoBold",
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  centerTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  totalExpenseText: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 28,
    fontFamily: "LatoBold",
    color: "#333",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  legendColumn: {
    flex: 1,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 16,
    color: "#667085",
    fontFamily: "LatoLight",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addCategory: {
    color: "#2563EB",
    fontFamily: "LatoBold",
    fontWeight: "600",
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2563EB",
    paddingBottom: 2,
  },
  categoryCardsWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: 140,
    marginRight: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: "LatoBold",
    fontWeight: "600",
    color: "#101828",
    textAlign: "center",
  },
  categoryAmount: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: "#0F172A",
    marginTop: 4,
  },
  transactionTitle: {
    fontSize: 18,
    fontFamily: "LatoBold",
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  transactionList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  transactionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  transactionTitleText: {
    fontSize: 16,
    fontFamily: "LatoBold",
    fontWeight: "500",
    color: "#000",
  },
  transactionCategory: {
    fontSize: 14,
    color: "#666",
    fontFamily: "LatoBold",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: "LatoBold",
    fontWeight: "600",
    color: "#000",
  },
  transactionDate: {
    fontSize: 13,
    color: "#666",
    fontFamily: "LatoBold",
  },
  loadMoreBtn: {
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#1D4ED8",
    fontFamily: "LatoBold",
    fontWeight: "600",
  },
});

export default AnalyticsScreen;
