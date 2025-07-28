import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import moment from "moment";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, setSelectedCategory } from "../../store/expenseSlice";
import { RootState } from "../../store/store";

import CalendarIcon from "@/assets/images/calendar.svg";
import UploadIcon from "@/assets/images/camera.svg";
import CarIcon from "@/assets/images/car.svg";
import EntertainmentIcon from "@/assets/images/entertainment.svg";
import FamilyIcon from "@/assets/images/family.svg";
import FoodIcon from "@/assets/images/food.svg";
import HealthIcon from "@/assets/images/health.svg";
import HouseIcon from "@/assets/images/housing.svg";
import ShopIcon from "@/assets/images/shopping.svg";
import TravelIcon from "@/assets/images/travel.svg";

const getIconForCategory = (categoryKey: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    "Food & Drinks": <FoodIcon width={24} height={24} />,
    Housing: <HouseIcon width={24} height={24} />,
    Shopping: <ShopIcon width={24} height={24} />,
    Family: <FamilyIcon width={24} height={24} />,
    Transportation: <CarIcon width={24} height={24} />,
    "Travel/Vacation": <TravelIcon width={24} height={24} />,
    Entertainment: <EntertainmentIcon width={24} height={24} />,
    Health: <HealthIcon width={24} height={24} />,
  };
  return iconMap[categoryKey] || <HouseIcon width={24} height={24} />;
};

export default function AddExpenseScreen() {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.expenses
  );

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const modalizeRef = useRef<Modalize>(null);

  const openCategoryPicker = () => {
    modalizeRef.current?.open();
  };

  const closeCategoryPicker = () => {
    modalizeRef.current?.close();
  };

  const handleCategorySelect = (category: (typeof categories)[0]) => {
    dispatch(setSelectedCategory(category));
    closeCategoryPicker();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
      setDate(formattedDate);
    }
  };

  const confirmDateSelection = () => {
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleContinue = () => {
    if (!amount || !selectedCategory || !title || !date) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Validate date format before saving
    const dateIsValid = moment(date, "DD/MM/YYYY", true).isValid();
    console.log("Date validation:", dateIsValid, "Date:", date);
    
    if (!dateIsValid) {
      Alert.alert("Error", "Invalid date format");
      return;
    }

    dispatch(
      addExpense({
        title,
        amount: parseFloat(amount.replace(/,/g, "")),
        category: selectedCategory,
        date,
        note,
        image,
      })
    );

    setAmount("");
    setTitle("");
    setNote("");
    setDate(moment().format("DD/MM/YYYY"));
    setImage(null);
    dispatch(setSelectedCategory(null));

    Alert.alert("Success", "Expense added successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.screenTitle}>Add Expense</Text>

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

            <Text style={styles.label}>Title</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.titleInput}
                placeholder="Enter expense title"
                placeholderTextColor="#64748B"
                value={title}
                onChangeText={setTitle}
              />
            </View>

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

            <Text style={styles.label}>Expense date</Text>
            <View style={[styles.inputBox, styles.row]}>
              <Pressable
                style={styles.dateInputPressable}
                onPress={openDatePicker}
              >
                <Text style={styles.dateText}>{date}</Text>
              </Pressable>
              <TouchableOpacity onPress={openDatePicker}>
                <CalendarIcon width={20} height={20} color="#EC4899" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {image ? (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.uploadedImage} />
                  <TouchableOpacity 
                    style={styles.removeImageButton} 
                    onPress={removeImage}
                  >
                    <Text style={styles.removeImageText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadRow}>
                  <UploadIcon width={44} height={44} color="#666" />
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
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Note</Text>
            <View style={styles.noteBox}>
              <TextInput
                placeholder="Give a description"
                placeholderTextColor="#667085"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.buttonRow}>
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

        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.centeredModalContainer}>
            <View style={styles.centeredModalContent}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.fullWidthDatePicker}
              />
              <View style={styles.modalActionButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmDateSelection}
                >
                  <Text style={styles.modalButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modalize
          ref={modalizeRef}
          modalHeight={600}
          modalStyle={styles.modalStyle}
          withHandle={true}
          handlePosition="inside"
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select a Category</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                  {React.cloneElement(getIconForCategory(cat.key), {
                    color: cat.color,
                  })}
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
    color: "#101828",
    fontFamily: "LatoBold",
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
    // opacity: 0.8,
    fontFamily: "LatoBold",
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
    fontFamily: "LatoBold",
  },
  amountInput: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
    fontFamily: "LatoBold",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    fontFamily: "LatoBold",
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
  titleInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontFamily: "LatoRegular",
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
    fontFamily: "LatoRegular",
  },
  dateText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "LatoRegular",
  },
  dateInputPressable: {
    flex: 1,
  },
  categoryText: {
    color: "#101828",
    fontSize: 16,
    fontFamily: "LatoBold",
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
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
  },
  uploadedImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadTextContainer: {
    marginLeft: 8,
    alignItems: "center",
  },

  uploadBlue: {
    color: "#005EE8",
    fontFamily: "LatoBold",
  },
  uploadGray: {
    color: "#667085",
    fontFamily: "LatoRegular",
  },
  uploadText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },

  uploadSubtext: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
    color: "#667085",
    fontFamily: "LatoRegular",
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
    fontFamily: "LatoBold",
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
    fontFamily: "LatoBold",
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
    fontFamily: "LatoBold",
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
    fontFamily: "LatoRegular",
  },
  modalChevron: {
    color: "#9CA3AF",
    fontSize: 18,
  },
  centeredModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  centeredModalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fullWidthDatePicker: {
    width: "100%",
  },
  modalActionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 12,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
  },
  confirmButton: {
    backgroundColor: "#2563EB",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "LatoBold",
  },
});