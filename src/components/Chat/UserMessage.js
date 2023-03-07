import {View, Text, Image, Pressable, Animated} from 'react-native';
import React, {useState} from 'react';
import {WIDTH} from '../../constant/dimentions';
import ModalPopup from '../Common/ModalPopup';

export default function UserMessage({type, seen, msg, time}) {
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const convertTime = time => {
    const date = new Date(time);
    const now = new Date();

    if (date.getDate() == now.getDate() && date.getMonth() == now.getMonth()) {
      return `${date.getHours()}:${date.getMinutes()}`;
    } else {
      return `${date.getDate()}/Th${date.getMonth() + 1}`;
    }
  };

  return (
    <View style={{marginBottom: 10}}>
      <ModalPopup visible={showImage}>
        <Pressable style={{height: '100%'}} onPress={() => setShowImage(false)}>
          <Image
            style={{
              width: '80%',
              height: '80%',
              alignSelf: 'center',
              top: '10%',
            }}
            source={{uri: msg}}
            resizeMode="contain"
          />
        </Pressable>
      </ModalPopup>
      <Pressable
        onPress={() => {
          setShow(!show);
          if (type == 'user_image') {
            setShowImage(true);
          }
        }}>
        {type == 'user_message' ? (
          <View
            style={{
              maxWidth: WIDTH - 130,
              marginLeft: 'auto',
              backgroundColor: '#018ABE',
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 15,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{msg}</Text>
          </View>
        ) : (
          <View
            style={{
              maxWidth: WIDTH - 130,
              marginLeft: 'auto',
              backgroundColor: '#018ABE',
              padding: 5,
              borderRadius: 15,
            }}>
            <Image
              source={{
                uri: msg,
              }}
              resizeMode="contain"
              style={{width: WIDTH - 140, height: 150}}
            />
          </View>
        )}
      </Pressable>
      <Text
        style={{
          fontSize: 12,
          display: show ? 'flex' : 'none',
          marginLeft: 10,
          paddingTop: 3,
          marginLeft: 'auto',
        }}>
        {convertTime(time)}
      </Text>
    </View>
  );
}
