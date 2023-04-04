/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {store} from './src/redux/store';
import {MessageNotification} from './src/service/PushNotification';

PushNotification.configure({
  onNotification: function (notification) {
    // Handle notification
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (remoteMessage.data.type == 1) {
    MessageNotification();
  } else if (remoteMessage.data.type == 0) {
    const data = await AsyncStorage.getItem('notiCount');
    const newCount = JSON.stringify(JSON.parse(data) + 1);
    AsyncStorage.setItem('notiCount', newCount);
  }
});

const RN_App = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RN_App);
