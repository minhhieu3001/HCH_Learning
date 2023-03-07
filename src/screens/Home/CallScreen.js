import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';

export default function CallScreen({navigation}) {
  const connectionData = {
    appId: '84e6846fa5ca43c68fe534ebd95b4730',
    channel: 'test1',
    token:
      '007eJxTYLiyx/Jdja7En7cs7wpDZ0xRdchZqtW461/agjKOZ89nzulRYLAwSTWzMDFLSzRNTjQxTjazSEs1NTZJTUqxNE0yMTc2kOxmTGkIZGQ4t82GkZEBAkF8VoaS1OISQwYGANrmIKo=',
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
