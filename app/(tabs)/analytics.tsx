import Layout from "@/constants/Layout";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";

// SVG imports (adjust paths based on your project)
import FoodIcon from "@/assets/images/food.svg";
import HouseIcon from "@/assets/images/housing.svg";
import EntertainmentIcon from "@/assets/images/entertainment.svg";
import FamilyIcon from "@/assets/images/family.svg";
// import FoodIcon from "@/assets/images/food.svg";
import HealthIcon from "@/assets/images/health.svg";
// import HouseIcon from "@/assets/images/housing.svg";
import ShopIcon from "@/assets/images/shopping.svg";
import TravelIcon from "@/assets/images/travel.svg";
const { width } = Dimensions.get("window");

const AnalyticsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const chartData = [
    { value: 50000, label: "Food & Drinks", color: "#F04438" },
    { value: 30000, label: "Housing", color: "#FACC15" },
    { value: 20000, label: "Shopping", color: "#F97316" },
    { value: 10000, label: "Travel & Vacation", color: "#800080" },
    { value: 15000, label: "Family", color: "#039855" },
    { value: 10000, label: "Transportation", color: "#005EE8" },
  ];

  const categoriesData = [
    {
      title: "Food & Drinks",
      amount: 12000,
      icon: <FoodIcon width={24} height={24} />,
      color: "#F04438",
    },
    {
      title: "Housing",
      amount: 12000,
      icon: <HouseIcon width={24} height={24} />,
      color: "#FACC15",
    },
    {
      title: "Entertainment",
      amount: 12000,
      icon: <EntertainmentIcon width={24} height={24} />,
      color: "#800080",
    },
    {
      title: "Family",
      amount: 12000,
      icon: <FamilyIcon width={24} height={24} />,
      color: "#039855",
    },
    {
      title: "Health",
      amount: 12000,
      icon: <HealthIcon width={24} height={24} />,
      color: "#039855",
    },
    {
      title: "Shop",
      amount: 12000,
      icon: <ShopIcon width={24} height={24} />,
      color: "#F97316",
    },
    {
      title: "Travel",
      amount: 12000,
      icon: <TravelIcon width={24} height={24} />,
      color: "#800080",
    },
  ];

  const transactionData = [
    {
      title: "Cooking gas",
      category: "Housing",
      amount: 12000,
      date: "Sun, 16 Jan",
      color: "#F97316",
    },
    {
      title: "A/C Repair",
      category: "Car",
      amount: 36000,
      date: "Sun, 16 Jan",
      color: "#22C55E",
    },
    {
      title: "Bolu Upkeep",
      category: "Family",
      amount: 10000,
      date: "Sun, 16 Jan",
      color: "#3B82F6",
    },
    {
      title: "Food",
      category: "Housing",
      amount: 12000,
      date: "Sun, 16 Jan",
      color: "#F97316",
    },
    {
      title: "A/C Repair",
      category: "Car",
      amount: 36000,
      date: "Sun, 16 Jan",
      color: "#22C55E",
    },
  ];

  const totalExpense = chartData.reduce((acc, item) => acc + item.value, 0);
  const radius = width * 0.42;
  const innerRadius = radius * 0.75;

  return (
    <Layout>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Expense Report</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>This year (2024) ▼</Text>
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

        {/* Pie Chart */}
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            donut
            innerRadius={innerRadius}
            radius={radius}
            showText
            textStyle={{ color: "#000", fontSize: 14 }}
            textPosition="inside"
          />
          <View style={styles.centerTextContainer}>
            <Text style={styles.totalExpenseText}>Total Expense</Text>
            <Text style={styles.totalAmount}>
              ₦ {totalExpense.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendColumn}>
            {chartData.slice(0, 3).map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
          <View style={styles.legendColumn}>
            {chartData.slice(3).map((item, index) => (
              <View key={index + 3} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Categories Section */}
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
            {categoriesData.map((cat, index) => (
              <View key={index} style={styles.categoryCard}>
                <View
                  style={[
                    styles.categoryIconContainer,
                    { backgroundColor: cat.color + "20" },
                  ]}
                >
                  {cat.icon}
                </View>
                <Text style={styles.categoryTitle}>{cat.title}</Text>
                <Text style={styles.categoryAmount}>₦ {cat.amount.toLocaleString()}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Transaction History */}
        <Text style={styles.transactionTitle}>Transaction History</Text>

        <View style={styles.transactionList}>
          {transactionData.map((item, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionDot,
                    { backgroundColor: item.color },
                  ]}
                />
                <View>
                  <Text style={styles.transactionTitleText}>{item.title}</Text>
                  <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>
                  ₦ {item.amount.toLocaleString()}
                </Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
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
  // scrollContainer: {
  //   paddingBottom: 40,
  // },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
  },
  dropdown: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownText: {
    color: "#1E293B",
    fontSize: 14,
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
    borderRadius: 20,
  },
  tabButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  tabText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#fff",
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
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "bold",
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
    color: "#333",
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
    fontWeight: "600",
    fontSize: 14,
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
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 4,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "500",
    color: "#000",
  },
  transactionCategory: {
    fontSize: 14,
    color: "#666",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  transactionDate: {
    fontSize: 13,
    color: "#666",
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
    fontWeight: "600",
  },
});

export default AnalyticsScreen;
