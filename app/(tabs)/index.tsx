import AddExpenseIcon from "@/assets/images/add.svg";
import CarIcon from "@/assets/images/car.svg";
import CreateCategoryIcon from "@/assets/images/create.svg";
import EntertainmentIcon from "@/assets/images/entertainment.svg";
import FamilyIcon from "@/assets/images/family.svg";
import FoodIcon from "@/assets/images/food.svg";
import HealthIcon from "@/assets/images/health.svg";
import HouseIcon from "@/assets/images/housing.svg";
import ShopIcon from "@/assets/images/shopping.svg";
import TravelIcon from "@/assets/images/travel.svg";
import QuickLinkCard from "@/components/quickLinkCard";
import RecentTransactionItem from "@/components/RecentTransaction";
import SpendCarousel from "@/components/SpendCarousel";
import UserName from "@/components/userName";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Layout from "../../constants/Layout";
import { RootState } from "../../store/store";
import { formatDate } from "@/utils/Formatter";

const getIconForCategory = (categoryKey: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    Housing: <HouseIcon width={36} height={36} />,
    Transportation: <CarIcon width={36} height={36} />,
    "Food & Drinks": <FoodIcon width={36} height={36} />,
    Entertainment: <EntertainmentIcon width={36} height={36} />,
    Health: <HealthIcon width={36} height={36} />,
    Shopping: <ShopIcon width={36} height={36} />,
    Family: <FamilyIcon width={36} height={36} />,
    "Travel/Vacation": <TravelIcon width={36} height={36} />,
  };
  return iconMap[categoryKey] || <HouseIcon width={36} height={36} />;
};

const TransactionIcon = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => <View style={[styles.iconContainer]}>{children}</View>;

const HomeScreen = () => {
  const expenses = useSelector((state: RootState) => state.expenses.expenses);


  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserName />
        <SpendCarousel />

        <View style={styles.container}>
          <Text style={styles.header2}>Quick Links</Text>
          <View style={styles.row}>
            <QuickLinkCard
              Icon={<AddExpenseIcon width={46} height={46} fill="#fff" />}
              label="Add Expense"
              onPress={() => router.navigate("/addExpense")}
            />
            <QuickLinkCard
              Icon={<CreateCategoryIcon width={46} height={46} fill="#fff" />}
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
                <TransactionIcon>
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
    fontFamily: "LatoBold",
  },
  viewAll: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "LatoBold",
    borderBottomWidth: 1,
    borderBottomColor: "#2563EB",
    paddingBottom: 2,
  },
  iconContainer: {
    borderRadius: 999,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  header2: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#101828",
    fontFamily: "LatoBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});