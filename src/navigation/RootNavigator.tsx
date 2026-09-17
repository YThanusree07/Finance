import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';

import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { RequestMoneyScreen } from '../screens/request/RequestMoneyScreen';
import { PayQrScreen } from '../screens/pay/PayQrScreen';
import { TopUpScreen } from '../screens/topup/TopUpScreen';
import { CardsScreen } from '../screens/cards/CardsScreen';
import { AddCardScreen } from '../screens/cards/AddCardScreen';
import { SendMoneyKeypadScreen } from '../screens/send/SendMoneyKeypadScreen';
import { SendMoneyPresetScreen } from '../screens/send/SendMoneyPresetScreen';
import { SendMoneyConfirmScreen } from '../screens/send/SendMoneyConfirmScreen';
import { SendMoneySuccessScreen } from '../screens/send/SendMoneySuccessScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { HelpCenterScreen } from '../screens/help/HelpCenterScreen';
import { ChangePasswordScreen } from '../screens/auth/ChangePasswordScreen';

import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="RequestMoney" component={RequestMoneyScreen} />
          <Stack.Screen name="PayQr" component={PayQrScreen} />
          <Stack.Screen name="TopUp" component={TopUpScreen} />
          <Stack.Screen name="Cards" component={CardsScreen} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />
          <Stack.Screen
            name="SendMoneyKeypad"
            component={SendMoneyKeypadScreen}
          />
          <Stack.Screen
            name="SendMoneyPreset"
            component={SendMoneyPresetScreen}
          />
          <Stack.Screen
            name="SendMoneyConfirm"
            component={SendMoneyConfirmScreen}
          />
          <Stack.Screen
            name="SendMoneySuccess"
            component={SendMoneySuccessScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          <Stack.Screen
            name="ChangePasswordDirect"
            component={ChangePasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
