import {View, Text, Pressable, Image} from 'react-native';
import React, {useState} from 'react';
import ModalPopup from '../Common/ModalPopup';

export default function ImageQuestion({url}) {
  const [showImage, setShowImage] = useState(false);
  return (
    <View>
      <ModalPopup visible={showImage}>
        <Pressable style={{height: '100%'}} onPress={() => setShowImage(false)}>
          <Image
            style={{
              width: '80%',
              height: '80%',
              alignSelf: 'center',
              top: '10%',
            }}
            source={{uri: url}}
            resizeMode="contain"
          />
        </Pressable>
      </ModalPopup>
      <Pressable onPress={() => setShowImage(true)}>
        <View style={{marginBottom: 10, marginRight: 10}}>
          <Image
            source={{
              uri: url,
            }}
            loadingIndicatorSource={{
              uri: 'https://cdn-icons-png.flaticon.com/512/6356/6356659.png',
            }}
            resizeMode="contain"
            style={{width: 100, height: 80}}
          />
        </View>
      </Pressable>
    </View>
  );
}
