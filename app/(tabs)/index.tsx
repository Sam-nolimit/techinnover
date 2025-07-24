import React from "react";
// import Layout from "@/components/Layout";
import SpendCarousel from "@/components/SpendCarousel";
import Layout from "../../constants/Layout"; // Adjust the import path as necessary
import UserName from "@/components/userName";
import { Text } from "react-native";

const HomeScreen = () => {
  return (
    <>
    <Layout>
      <UserName />
      
      <SpendCarousel />
    <Text> Quick Links</Text>
    </Layout>
    </>
  );
};

export default HomeScreen;
