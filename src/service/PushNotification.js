import PushNotification from 'react-native-push-notification';

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

const channelId = 'uet_learning';

PushNotification.createChannel(
  {
    channelId,
    channelName: 'uet_learning',
    channelDescription: 'This is my notification channel',
    importance: 4,
    vibrate: true,
  },
  () => console.log('Channel created'),
);

export const MessageNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    title: 'Thông báo',
    message: 'Bạn có tin nhắn mới',
    vibration: 300,
    playSound: true,
    soundName: 'default',
    id: 1,
    channelId: channelId,
  });
};

export const AnswerNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    title: 'Thông báo',
    message: 'Bạn có câu trả lời mới',
    vibration: 300,
    playSound: true,
    soundName: 'default',
    id: 1,
    channelId: channelId,
  });
};

export const StudyNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    title: 'Thông báo',
    message: 'Sắp tới giờ học của bạn rồi',
    vibration: 300,
    playSound: true,
    soundName: 'default',
    id: 1,
    channelId: channelId,
  });
};

export const ReportSuccessNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    title: 'Thông báo',
    message: 'Báo cáo của bạn đã được phê duyệt',
    vibration: 300,
    playSound: true,
    soundName: 'default',
    id: 1,
    channelId: channelId,
  });
};

export const ReportRefusedNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    title: 'Thông báo',
    message: 'Báo cáo của bạn đã bị từ chối',
    vibration: 300,
    playSound: true,
    soundName: 'default',
    id: 1,
    channelId: channelId,
  });
};
