# ShieldPay — Implementation Notes & Manual Steps

This document outlines the complete technical implementation of the **ShieldPay** mobile finance & banking React Native CLI application.

---

## A. COMPLETED AUTOMATICALLY

### 1. Project Scaffolding & Configuration
- Clean React Native 0.87 CLI TypeScript structure established with both `android/` and `ios/` native folders preserved.
- Package dependencies installed:
  - `@react-navigation/native` (v7)
  - `@react-navigation/native-stack` (v7)
  - `@react-navigation/bottom-tabs` (v7)
  - `react-native-screens`
  - `react-native-safe-area-context`
  - `react-native-svg`
- TypeScript strict configuration with 0 typing or compilation errors (`npx tsc --noEmit` passing).

### 2. Design System & Theme Engine (`src/theme/`)
- **Colors (`colors.ts`)**: Deep navy (`#0D1333`), navy card secondary (`#161B3D`), lavender accent (`#7B61FF`), gold/orange accent (`#FFA800`), light backgrounds (`#F8F9FD`), and semantic status indicators (`#00BA88`, `#ED2E7E`).
- **Typography (`typography.ts`)**: Cross-platform typography scale for iOS & Android with proper line heights, letter spacings, and font weights.
- **Spacing & Shadows (`spacing.ts`, `shadows.ts`)**: Centralized spacing units (4px to 48px), border radii, elevation for Android, and shadow matrices for iOS.

### 3. Reactive State Management Layer (`src/context/`)
- **`AuthContext.tsx`**: Manages authentication status (`isAuthenticated`), onboarding completion (`isOnboarded`), active user profile, PIN updates, and privacy toggle (`hideAccount`).
- **`AppContext.tsx`**: Reactive state for wallet balance (`$2,887.65`), payment cards, real-time transaction ledger, savings goals progress, money requests approval/rejection, and unread notification alerts.

### 4. Custom Vector SVG Asset Suite (`src/assets/`)
- Complete library of custom SVG icons in `src/assets/icons/index.tsx` (ShieldLogo, Home, History, Statistic, Profile, Send, Request, Pay, TopUp, Bell, Keypad, Eye toggles, Card chips, Mastercard/Visa logos, Barcode, etc.).
- High-fidelity vector illustrations in `src/assets/illustrations/index.tsx` (Send Money, Request Money, Easy To Use, Security Shield, Success Checkmark Badge, and Transaction Barcode).

### 5. Reusable UI Component Library (`src/components/`)
- **Common**: `ScreenContainer`, `AppHeader`, `Badge`, `Toggle`, `Divider`, `EmptyState`.
- **Buttons**: `PrimaryButton`, `SecondaryButton`, `IconButton`, `QuickActionButton`.
- **Inputs**: `CustomTextInput`, `PasswordInput`, `PhoneInput`, `PinInputDots`, `NumericKeypad`, `PresetAmountGrid`.
- **Cards**: `PaymentCardView`, `SavingsCardView`, `CardCarousel`.
- **Transactions & Requests**: `TransactionItemView`, `MoneyRequestItemView`, `NotificationItemView`.
- **Navigation**: `SegmentedTabs`, `CustomTabBar`.
- **Charts & Modals**: `SpendingChart` (with Income vs Expense bars), `SuccessModal`, `ConfirmModal`.

### 6. Full Navigation Stacks & All 30 Implemented Flows
- **Auth Flow**:
  1. `SplashScreen`: Dark navy brand splash with auto-navigation.
  2. `OnboardingScreen`: 3-slide carousel (Send Money, Request Money, Easy To Use).
  3. `RegisterScreen`: Full Name, Email, Password, Terms checkbox, validation.
  4. `CreatePinScreen`: 4-digit PIN setup with interactive numeric keypad.
  5. `ConfirmPinScreen`: PIN matching and mismatch validation.
  6. `PhoneRegisterScreen`: Country flag, code picker (+1, +44, +62), phone input.
  7. `VerifyOtpScreen`: 4-box OTP input with countdown timer and demo OTP verification.
  8. `AccountCreatedScreen`: Success badge, description, and transition to Home.
  9. `LoginScreen`: Dark navy hero header, email/password validation, forgot password link.
  10. `ForgotPasswordScreen`: Security shield visual, registered email reset.
  11. `ChangePasswordScreen`: New PIN/password confirmation and local update.
- **Main Dashboard & Sub-flows**:
  12. `HomeScreen`: Header greeting for Alexander Michael, balance `$2,887.65`, 4 quick action buttons, card carousel, savings items with circular progress.
  13. `NotificationsScreen`: All / Unread tabs, notification cards, Mark all as read.
  14. `RequestMoneyScreen`: Incoming money requests with interactive Accept & Decline.
  15. `PayQrScreen`: Scan QR with laser viewfinder frame and My QR with user ID and QR card.
  16. `TopUpScreen`: Payment card selector, nominal stepper [ - ] / [ + ], interactive preset grid ($50–$450).
  17. `TopUpSuccessModal`: Modal confirmation with updated balance reflection.
  18. `CardsScreen`: Payment cards list and "+ Add Credit Card" button.
  19. `CardStatisticsScreen`: Card carousel, Total Balance, Week/Month/Year filter, Income vs Expense bar chart, and category spending breakdown.
  20. `AddCardScreen`: Live card preview, 16-digit formatting, MM/YY expiry, CVC, and billing address.
  21. `SendMoneyKeypadScreen` (Step 1): Recipient profile, amount stepper, note input, numeric keypad.
  22. `SendMoneyPresetScreen` (Step 2): Nominal amount, slider, preset chips ($50–$450), recipient edit.
  23. `SendMoneyConfirmScreen` (Step 3): Payment source card, recipient, admin fee ($0.00), total summary.
  24. `SendMoneySuccessScreen` (Step 4): Checkmark, itemized receipt, transaction barcode, return home.
  25. `HistoryScreen`: All / Send / Request segmented tabs, week filter, live search, color-coded amounts.
  26. `ProfileScreen`: Account details, masked email, Hide Account privacy toggle, preference menu, logout & delete account modal.
  27. `EditProfileScreen`: First/Last name, phone, birthday, address, bio, avatar edit picker.
  28. `HelpCenterScreen`: Search bar, category chips, and expandable FAQ accordions with rotating chevrons.

---

## B. MANUAL STEPS REQUIRED FROM USER

Only the following external/platform items require your manual action when compiling native binaries on physical devices/stores:

1. **iOS CocoaPods Installation** *(macOS only)*:
   - When running on macOS for iOS simulator / device, run:
     ```bash
     cd ios && pod install && cd ..
     ```
2. **iOS Signing & Apple Developer Team** *(macOS / Xcode)*:
   - In Xcode, select `FinanceTemp.xcodeproj`, navigate to `Signing & Capabilities`, and select your Apple Developer Team.
3. **Android Keystore for Release APK/AAB**:
   - For Google Play production release, generate your `keystore` and configure `android/app/build.gradle` signing configs.
4. **Custom Fonts (Optional)**:
   - The app currently utilizes system sans-serif font families (San Francisco on iOS, Roboto on Android) matching standard design typography. If you wish to bundle a specific custom OTF/TTF font (e.g. *Outfit* or *Plus Jakarta Sans*), place the font files in `android/app/src/main/assets/fonts/` and configure `react-native.config.js`.

---

## C. HOW TO RUN

### Prerequisites:
- Node.js >= 20.x
- Java JDK 17+ and Android SDK / Android Studio configured for Android builds.
- Xcode configured for iOS builds (macOS only).

### Running Metro Bundler:
```bash
npx react-native start
```

### Running on Android:
```bash
# In a separate terminal with emulator running or device connected via USB:
npx react-native run-android
```

### Running on iOS (macOS):
```bash
npx react-native run-ios
```

### TypeScript Validation:
```bash
npx tsc --noEmit
```

---

## D. KNOWN LIMITATIONS & MOCK DATA

- **Local Mock Storage**: Since no external banking REST/GraphQL backend was provided, all financial state (wallet balances, card numbers, transaction history, notifications, and money requests) is reactively managed in memory via `AppContext` and `AuthContext`.
- **Demo OTP**: In `VerifyOtpScreen`, the verification code defaults to `8943`, and any valid 4-digit code is accepted for rapid demonstration.
- **Card Numbers & Transactions**: All card numbers and names are realistic mock test data (`Alexander Michael`, `**** 4253`, etc.) and do not connect to real financial rails.
