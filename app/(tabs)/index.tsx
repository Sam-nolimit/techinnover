import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import RecentTransactionItem from "@/components/RecentTransaction";
import SpendCarousel from "@/components/SpendCarousel";
import UserName from "@/components/userName";
import Layout from "../../constants/Layout";
import CreateCategoryIcon from "@/assets/images/create.svg";
import AddExpenseIcon from "@/assets/images/add.svg";
import CarIcon from "@/assets/images/car.svg";
import EntertainmentIcon from "@/assets/images/entertainment.svg";
import FamilyIcon from "@/assets/images/family.svg";
import FoodIcon from "@/assets/images/food.svg";
import HealthIcon from "@/assets/images/health.svg";
import HouseIcon from "@/assets/images/housing.svg";
import ShopIcon from "@/assets/images/shopping.svg";
import TravelIcon from "@/assets/images/travel.svg";
import QuickLinkCard from "@/components/quickLinkCard";
import { router } from "expo-router";

const getIconForCategory = (categoryKey: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "Housing": <HouseIcon width={20} height={20} />,
    "Transportation": <CarIcon width={20} height={20} />,
    "Food & Drinks": <FoodIcon width={20} height={20} />,
    "Entertainment": <EntertainmentIcon width={20} height={20} />,
    "Health": <HealthIcon width={20} height={20} />,
    "Shopping": <ShopIcon width={20} height={20} />,
    "Family": <FamilyIcon width={20} height={20} />,
    "Travel/Vacation": <TravelIcon width={20} height={20} />,
  };
  return iconMap[categoryKey] || <HouseIcon width={20} height={20} />;
};

const TransactionIcon = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <View style={[styles.iconContainer, { backgroundColor: color }]}>
    {children}
  </View>
);

const HomeScreen = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserName />
        <SpendCarousel />

        <View style={styles.container}>
          <Text style={styles.header2}>Quick Links</Text>
          <View style={styles.row}>
            <QuickLinkCard
              Icon={<AddExpenseIcon width={24} height={24} fill="#fff" />}
              label="Add Expense"
              onPress={() => router.navigate("/addExpense")}
            />
            <QuickLinkCard
              Icon={<CreateCategoryIcon width={24} height={24} fill="#fff" />}
              label="Create a Category"
              onPress={() => console.log("Create Category")}
            />
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.header}>
            <Text style={styles.title}>Recent Transaction</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          {expenses.slice(0, 8).map((expense) => (
            <RecentTransactionItem
              key={expense.id}
              title={expense.title}
              subtitle={expense.category.key}
              amount={expense.amount.toLocaleString()}
              date={formatDate(expense.date)}
              icon={
                <TransactionIcon color={expense.category.color + '22'}>
                  {getIconForCategory(expense.category.key)}
                </TransactionIcon>
              }
            />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  viewAll: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
  },
  iconContainer: {
    borderRadius: 999,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  header2: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});