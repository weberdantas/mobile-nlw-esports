import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Background, Loading } from './src/components';
import { getPushNotificationToken } from './src/service/getPushNotificationToken';

import './src/service/notificationsConfigs';

export default function App() {
  const [isLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const getNotificationListerner = useRef<Subscription>();
  const responseNotificationListerner = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListerner.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('notification->', notification);
      });

    responseNotificationListerner.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('response->', response);
      });

    return () => {
      if (
        getNotificationListerner.current &&
        responseNotificationListerner.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListerner.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListerner.current
        );
      }
    };
  }, []);

  return (
    <Background>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {isLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
