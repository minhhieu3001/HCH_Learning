import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

export default function CallScreen({navigation}) {
  const connectionData = {
    appId: '84e6846fa5ca43c68fe534ebd95b4730',
    channel: 'test1',
    token:
      '007eJxTYDASW1gW9ZI3pfKSScf9C6Wnn56QPZk+2UxpQ7qnd5ne4W0KDBYmqWYWJmZpiabJiSbGyWYWaammxiapSSmWpkkm5sYGd559TG4IZGTwc77FxMgAgSA+K0NJanGJIQMDAJdpIOk=',
  };

  const callbacks = {
    EndCall: () => {
      navigation.goBack();
    },
  };

  return (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
  );
}
