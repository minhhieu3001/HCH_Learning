import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {HEIGHT, WIDTH} from '../../constant/dimentions';

export default function CallScreen({navigation}) {
  const [hidden, setHidden] = useState(false);

  const handlePress = () => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 5000);
  };

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
      console.log('hidden');
    }, 5000);
  }, []);

  const connectionData = {
    appId: '84e6846fa5ca43c68fe534ebd95b4730',
    channel: 'test1',
    token:
      '007eJxTYMg22HUx2VprcuMz1+AKd5b3XiLqa4qnq3a9amPK8V+/8aACg4VJqpmFiVlaomlyoolxsplFWqqpsUlqUoqlaZKJubGBk7hwSkMgI4N6syArIwMEgvisDCWpxSWGDAwAzvEcqg==',
  };

  const callbacks = {
    EndCall: () => {
      navigation.goBack();
    },
  };

  return (
    <Pressable
      style={{width: '100%', height: '100%'}}
      onPress={() => handlePress()}>
      <AgoraUIKit
        connectionData={connectionData}
        rtcCallbacks={callbacks}
        styleProps={{
          localBtnContainer: {
            bottom: -18,
          },
          localBtnStyles: {
            endCall: {
              testID: 'Kết thúc',
            },
            switchCamera: {
              backgroundColor: '#018ABE',
              borderColor: '#018ABE',
            },
            muteLocalVideo: {
              backgroundColor: '#018ABE',
              borderColor: '#018ABE',
            },
            muteLocalAudio: {
              backgroundColor: '#018ABE',
              borderColor: '#018ABE',
            },
          },
          BtnTemplateContainer: {
            display: hidden ? 'none' : 'flex',
          },
          minViewContainer: {
            display: hidden ? 'none' : 'flex',
          },
        }}
      />
    </Pressable>
  );
}
