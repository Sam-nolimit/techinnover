# TechInnover - Expense Tracker 💰

A modern, intuitive expense tracking mobile application built with React Native and Expo. TechInnover helps you manage your personal finances with beautiful visualizations, category-based expense tracking, and persistent data storage.

## 📱 Features

- **Expense Management**: Add, view, and categorize your expenses
- **Visual Analytics**: Interactive pie charts and spending insights
- **Category System**: Pre-defined categories with custom colors and icons
- **Daily Spending Tracking**: Carousel view of daily spending patterns
- **Persistent Storage**: Your data is saved locally and persists between app sessions
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Cross-platform**: Works on both iOS and Android

## 🏗️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (File-based routing)
- **State Management**: Redux Toolkit with Redux Persist
- **Storage**: AsyncStorage for data persistence
- **Charts**: react-native-gifted-charts for analytics
- **Animations**: Moti for smooth UI animations
- **Icons**: Custom SVG icons
- **Typography**: Custom Lato font family

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techinnover
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional required packages**
   ```bash
   npm install @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage react-native-gifted-charts moti react-native-gesture-handler react-native-modalize
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your preferred platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## 📁 Project Structure

```
techinnover/
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout with Redux Provider
│   └── (tabs)/                  # Tab navigation group
│       ├── _layout.tsx          # Tab layout configuration
│       ├── index.tsx            # Home screen
│       ├── addExpense.tsx       # Add expense screen
│       └── analytics.tsx        # Analytics screen
├── assets/                      # Static assets
│   ├── fonts/                   # Custom fonts
│   └── images/                  # SVG icons and images
├── components/                  # Reusable components
│   ├── SpendCarousel.tsx        # Daily spending carousel
│   ├── spendCard.tsx           # Individual spend card
│   ├── RecentTransaction.tsx    # Transaction list item
│   └── quickLinkCard.tsx       # Quick action cards
├── constants/                   # App constants
│   ├── Colors.ts               # Color theme
│   └── Layout.ts               # Layout constants
├── hooks/                      # Custom hooks
│   ├── redux.ts               # Typed Redux hooks
│   └── useColorScheme.ts      # Theme hook
└── store/                      # Redux store
    ├── store.ts               # Store configuration
    └── expenseSlice.ts        # Expense state management
```

## 🎯 Core Features

### 1. Home Screen
- **Daily Spending Carousel**: Swipeable cards showing spending for different days
- **Quick Links**: Fast access to add expenses and create categories
- **Recent Transactions**: List of recent expenses with category icons
- **Real-time Updates**: Data updates immediately when new expenses are added

### 2. Add Expense Screen
- **Amount Input**: Large, prominent amount entry with currency symbol
- **Category Selection**: Modal picker with visual category icons
- **Date Selection**: Date picker for expense date
- **Notes**: Optional description field
- **Form Validation**: Ensures all required fields are completed

### 3. Analytics Screen
- **Interactive Pie Chart**: Visual breakdown of spending by category
- **Filter Options**: View data by All, Daily, Weekly, or Monthly
- **Category Cards**: Horizontal scroll of category spending summaries
- **Transaction History**: Detailed list of all transactions
- **Total Calculations**: Automatic calculation of total expenses

## 🔧 Configuration

### Redux Store
The app uses Redux Toolkit for state management with the following features:
- **Persistent Storage**: Data is automatically saved to device storage
- **Type Safety**: Full TypeScript support with typed hooks
- **Immutable Updates**: Redux Toolkit handles immutable state updates

### Categories
Default expense categories include:
- Food & Drinks 🍕
- Housing 🏠
- Shopping 🛍️
- Family 👨‍👩‍👧‍👦
- Transportation 🚗
- Travel/Vacation ✈️
- Entertainment 🎬
- Health 🏥

## 🎨 Customization

### Adding New Categories
```typescript
dispatch(addCategory({
  key: "New Category",
  color: "#HEX_COLOR",
  icon: "optional_icon_name"
}));
```

### Modifying Colors
Edit `constants/Colors.ts` to customize the app's color scheme.

### Custom Fonts
The app uses the Lato font family. To add new fonts:
1. Add font files to `assets/fonts/`
2. Update the font loading in `app/_layout.tsx`

## 📊 Data Management

### Storage
- **Local Storage**: Uses AsyncStorage for data persistence
- **Redux Persist**: Automatically saves and restores app state
- **No Cloud Dependency**: All data stays on the device

### Data Structure
```typescript
interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
  title: string;
}

interface Category {
  key: string;
  color: string;
  icon?: string;
}
```

## 🧪 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
# For Android
npx expo build:android

# For iOS
npx expo build:ios
```

### Code Style
The project follows standard React Native and TypeScript conventions:
- Use TypeScript for type safety
- Follow component naming conventions
- Use Redux Toolkit patterns for state management

## 📱 Platform Support

- **iOS**: Full support with native animations
- **Android**: Full support with Material Design elements
- **Web**: Basic support (Expo web compatibility)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install
   ```

3. **Android build issues**
   ```bash
   npx expo run:android --device
   ```

### Getting Help

- Check the [Expo Discord community](https://chat.expo.dev)
- Review [React Native troubleshooting guide](https://reactnative.dev/docs/troubleshooting)
- Open an issue in this repository

---

Built with ❤️ using React Native and Expo