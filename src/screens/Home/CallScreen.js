import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

export default function CallScreen({navigation}) {
  const connectionData = {
    appId: '84e6846fa5ca43c68fe534ebd95b4730',
    channel: 'test_1',
    token:
      '007eJxTYPiyyWnLjMeX8pYxhxxVmhD4ZtnRSvW/C6+8PCJYcE6/KFNSgcHCJNXMwsQsLdE0OdHEONnMIi3V1NgkNSnF0jTJxNzYoCn9XnJDICPDC/sgZkYGCATx2RhKUotL4g0ZGABWHSJa',
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
