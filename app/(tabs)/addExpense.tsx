import CalendarIcon from "@/assets/images/calendar.svg";
import {
  default as CarIcon,
  default as UploadIcon,
} from "@/assets/images/camera.svg";
import EntertainmentIcon from "@/assets/images/entertainment.svg";
import FamilyIcon from "@/assets/images/family.svg";
import FoodIcon from "@/assets/images/food.svg";
import HealthIcon from "@/assets/images/health.svg";
import HouseIcon from "@/assets/images/housing.svg";
import ShopIcon from "@/assets/images/shopping.svg";
import TravelIcon from "@/assets/images/travel.svg";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import DatePicker from 'react-native-date-picker'
import React, { useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";

const categories = [
  {
    key: "Food & Drinks",
    icon: <FoodIcon width={24} height={24} />,
    color: "#F04438",
  },
  {
    key: "Housing",
    icon: <HouseIcon width={24} height={24} />,
    color: "#FACC15",
  },
  {
    key: "Shopping",
    icon: <ShopIcon width={24} height={24} />,
    color: "#F97316",
  },
  {
    key: "Family",
    icon: <FamilyIcon width={24} height={24} />,
    color: "#039855",
  },
  {
    key: "Transportation",
    icon: <CarIcon width={24} height={24} />,
    color: "#005EE8",
  },
  {
    key: "Travel/Vacation",
    icon: <TravelIcon width={24} height={24} />,
    color: "#800080",
  },
  {
    key: "Entertainment",
    icon: <EntertainmentIcon width={24} height={24} />,
    color: "#1F2937",
  },
  {
    key: "Health",
    icon: <HealthIcon width={24} height={24} />,
    color: "#EF4444",
  },
];

export default function AddExpenseScreen() {
  const [amount, setAmount] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [date, setDate] = React.useState("");
  const [note, setNote] = React.useState("");
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const openCategoryPicker = () => {
    modalizeRef.current?.open();
  };

  const closeCategoryPicker = () => {
    modalizeRef.current?.close();
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    closeCategoryPicker();
  };

  const handleContinue = () => {
    console.log({ amount, selectedCategory, date, note });
  };

  const onModalOpened = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });
  };

  const onModalClosed = () => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        ...Platform.select({
          ios: {
            position: "absolute",
            height: 85,
          },
          android: {
            height: 70,
          },
        }),
      },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.select({
            ios: 60,
            android: 0,
          })}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.screenTitle}>Add Expense</Text>

            {/* Amount Input */}
            <View style={styles.amountContainer}>
              <Text style={styles.howMuchText}>How much?</Text>
              <View style={styles.amountInputRow}>
                <Text style={styles.amountSymbol}>₦</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  placeholderTextColor="#FFF"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  textAlign="right"
                />
              </View>
            </View>

            {/* Category */}
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              onPress={openCategoryPicker}
              style={styles.inputBox}
            >
              <Text
                style={
                  selectedCategory ? styles.categoryText : styles.placeholder
                }
              >
                {selectedCategory?.key || "Select a category"}
              </Text>
              <Text style={styles.chevron}>⌄</Text>
            </TouchableOpacity>

            {/* Date */}
            <Text style={styles.label}>Expense date</Text>
            <View style={[styles.inputBox, styles.row]}>
              <TextInput
                style={styles.flex}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#777"
                value={date}
                onChangeText={setDate}
              />
              <CalendarIcon width={20} height={20} color="#EC4899" />
            </View>

            {/* Upload */}
            <TouchableOpacity style={styles.uploadBox}>
              <View style={styles.uploadRow}>
                <UploadIcon width={24} height={24} color="#666" />
                <View style={styles.uploadTextContainer}>
                  <Text style={styles.uploadText}>
                    <Text style={styles.uploadBlue}>Click to upload</Text>
                    <Text style={styles.uploadGray}> or drag and drop</Text>
                  </Text>
                  <Text style={styles.uploadSubtext}>
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Note */}
            <Text style={styles.label}>Note</Text>
            <View style={styles.noteBox}>
              <TextInput
                placeholder="Give a description"
                placeholderTextColor="#777"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              {/* <TouchableOpacity style={styles.cancelBtn}>
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => router.back()}
              >
                <Text style={styles.cancelTxt}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.continueBtn}
                onPress={handleContinue}
              >
                <Text style={styles.continueTxt}>Continue</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Category Bottom Sheet */}
        <Modalize
          ref={modalizeRef}
          modalHeight={600}
          modalStyle={styles.modalStyle}
          onClosed={onModalClosed}
          onOpened={onModalOpened}
          withHandle={true}
          handlePosition="inside"
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
            contentContainerStyle: { paddingBottom: 20 },
          }}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select a Category</Text>
          </View>
          <ScrollView
            style={styles.modalScrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalScrollContent}
          >
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={cat.key}
                style={[
                  styles.modalRow,
                  index === categories.length - 1 && styles.lastModalRow,
                ]}
                onPress={() => handleCategorySelect(cat)}
              >
                <View
                  style={[
                    styles.modalIconBg,
                    { backgroundColor: cat.color + "22" },
                  ]}
                >
                  {React.cloneElement(cat.icon, { color: cat.color })}
                </View>
                <Text style={styles.modalKey}>{cat.key}</Text>
                <Text style={styles.modalChevron}>›</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#000",
  },
  amountContainer: {
    backgroundColor: "#0F172A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  howMuchText: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amountSymbol: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "500",
  },
  amountInput: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  placeholder: {
    color: "#64748B",
    fontSize: 16,
  },
  categoryText: {
    color: "#000",
    fontSize: 16,
  },
  chevron: {
    color: "#9CA3AF",
    fontSize: 18,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadTextContainer: {
    marginLeft: 8,
    alignItems: "center",
  },
  uploadText: {
    fontSize: 14,
  },
  uploadBlue: {
    color: "#2563EB",
  },
  uploadGray: {
    color: "#6B7280",
  },
  uploadSubtext: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
  noteBox: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 14,
    marginBottom: 32,
    minHeight: 80,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  cancelTxt: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  continueBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  continueTxt: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  modalStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    paddingBottom: 40,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastModalRow: {
    borderBottomWidth: 0,
  },
  modalIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  modalKey: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  modalChevron: {
    color: "#9CA3AF",
    fontSize: 18,
  },
});
