import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

export default function CallScreen({navigation}) {
  const connectionData = {
    appId: '84e6846fa5ca43c68fe534ebd95b4730',
    channel: 'test_1',
    token:
      '007eJxTYOhsvC45f//7XcH824UWpcwXnWsVl2yw74u2Q8Px5TPiPl5VYLAwSTWzMDFLSzRNTjQxTjazSEs1NTZJTUqxNE0yMTc2MKl7kNwQyMgg+ukeMyMDBIL4bAwlqcUl8YYMDADbDiFi',
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
