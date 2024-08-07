import React, {useEffect} from 'react';
import {StatusBar, Alert} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import {AuthenticationProvider} from './src/contexts/authentication';
import {ContentProvider} from './src/contexts/content';
import RootNavigator from './src/navigators/root';
import theme from './src/styles/theme';
import messaging from '@react-native-firebase/messaging';
//import { messaging as firebaseMessaging } from './src/firebaseConfig'; // Assurez-vous que ce chemin est correct

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Token =', token);
    } catch (error) {
      console.error('Failed to get token:', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <AuthenticationProvider>
        <ContentProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ContentProvider>
      </AuthenticationProvider>
      <StatusBar backgroundColor="#faf8fe" barStyle="dark-content" />
    </PaperProvider>
  );
};

export default App;
