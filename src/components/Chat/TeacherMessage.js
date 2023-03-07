import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';
import {Pressable} from 'react-native';
import ModalPopup from '../Common/ModalPopup';

export default function TeacherMessage({type, msg, time}) {
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
          if (type == 'teacher_image') {
            setShowImage(true);
          }
        }}
        style={{
          flexDirection: 'row',
        }}>
        {type == 'typing' ? (
          <View
            style={{
              backgroundColor: '#f2f2f2',
              width: 60,
              borderRadius: 10,
              marginLeft: 10,
            }}>
            <Icon
              name="dots-horizontal"
              size={40}
              style={{color: 'gray', alignSelf: 'center'}}
            />
          </View>
        ) : type == 'teacher_message' ? (
          <View
            style={{
              maxWidth: '75%',
              backgroundColor: '#f2f2f2',
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 15,
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>{msg}</Text>
          </View>
        ) : (
          <View
            style={{
              maxWidth: WIDTH - 130,
              backgroundColor: '#f2f2f2',
              padding: 5,
              borderRadius: 15,
            }}>
            <Image
              source={{uri: msg}}
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
        }}>
        {convertTime(time)}
      </Text>
    </View>
  );
}
