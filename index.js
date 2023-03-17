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

import {store} from './src/redux/store';

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

  PushNotification.localNotification({
    /* Android Notification Options */
    channelId: 'uet_learning',
    priority: 'high',
    title: 'THÔNG BÁO',
    message: `Tin nhắn mới từ ${remoteMessage.data.real_name}`,
  });
});

const RN_App = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RN_App);
