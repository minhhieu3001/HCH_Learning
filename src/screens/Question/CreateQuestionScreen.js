import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalPopup from '../../components/Common/ModalPopup';
import {WIDTH} from '../../constant/dimentions';
import {subjects} from '../../data/subjects';
import {classes} from '../../data/classes';
import ImagePicker from 'react-native-image-crop-picker';
import {showQuestionNav} from '../../redux/slice/questionTabSlice';
import {accessKey, secretKey} from '../../constant/awsKey';
import {RNS3} from 'react-native-aws3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import DocumentPicker from 'react-native-document-picker';
import {minusPoint} from '../../redux/slice/pointSlice';

export default function CreateQuestionScreen({navigation}) {
  const dispatch = useDispatch();

  const [showEditSubject, setShowEditSubject] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);

  const [subject, setSubject] = useState(null);
  const [grade, setGrade] = useState(null);
  const [content, setContent] = useState('');
  const [images, setImages] = useState(null);
  const [files, setFiles] = useState(null);
  const [imgUrls, setImgUrls] = useState(null);
  const [fileUrls, setFileUrls] = useState(null);

  const pickImages = () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(images => {
        console.log(images);
        const imgs = [];
        const imgUrls = [];
        for (let i = 0; i < images.length; i++) {
          const index = images[i].path.lastIndexOf('/');
          const image = {
            uri: images[i].path,
            name: images[i].path.substring(index + 1),
            type: images[i].mime,
          };
          imgUrls.push(
            `https://bookstoreimages.s3.us-east-1.amazonaws.com/questions/${image.name}`,
          );
          imgs.push(image);
        }
        setImages(imgs);
        setImgUrls(imgUrls);
      })
      .catch(err => console.log(err));
  };

  const pickFile = () => {
    DocumentPicker.pick({
      // allowMultiSelection: true,
      type: [DocumentPicker.types.pdf, DocumentPicker.types.doc],
    })
      .then(files => {
        console.log(files);
        const fileList = [];
        const fileUrls = [];
        const file = {
          uri: files[0].uri,
          name: files[0].name,
          type: files[0].type,
        };
        fileList.push(file);
        fileUrls.push(
          `https://bookstoreimages.s3.us-east-1.amazonaws.com/questions/${file.name}`,
        );
        setFiles(fileList);
        setFileUrls(fileUrls);
      })
      .catch(err => {
        setFiles(null);
        setFileUrls(null);
      });
  };

  const createQuestion = async point => {
    const config = {
      keyPrefix: 'questions/',
      bucket: 'bookstoreimages',
      region: 'us-east-1',
      accessKey: accessKey,
      secretKey: secretKey,
      successActionStatus: 201,
    };

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        RNS3.put(images[i], config);
      }
    }

    if (files) {
      RNS3.put(files[0], config);
    }
    const token = await AsyncStorage.getItem('token');
    const configHeader = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      subject: subject,
      totalAnswer: 0,
      course: grade,
      content: content,
      imgUrls: imgUrls,
      filePaths: fileUrls,
      point: point,
    };
    console.log(data);
    axios
      .post(`${BASE_URL}/post/createQuestion`, data, configHeader)
      .then(async res => {
        console.log(res.data);
        if (res.data.code == 0) {
          Alert.alert(
            'Thông báo',
            'Câu hỏi của bạn cần chút thời gian để duyệt',
          );
          dispatch(minusPoint(point));
          const data = await AsyncStorage.getItem('user');
          const user = JSON.parse(data);
          user.point -= point;
          const new_user = JSON.stringify(user);
          AsyncStorage.setItem('user', new_user);
          navigation.goBack();
        }
      });
  };

  const handlePoint = async () => {
    if (!content || !subject || !grade) {
      Alert.alert('Thông báo', 'Bạn cần điền đủ các thông tin');
    } else {
      const data = await AsyncStorage.getItem('user');
      const user = JSON.parse(data);
      let point = content.length * 5;

      if (images) {
        point += images.length * 10;
      }
      if (files) {
        point += files.length * 20;
      }
      console.log(point, user.point);

      if (point > user.point) {
        Alert.alert(
          'Thông báo',
          ` Bạn cần sử dụng ${point}p để đăng câu hỏi. Số point của bạn hiện không đủ. Vui lòng nạp thêm!`,
        );
      } else {
        createQuestion(point);
        console.log('ac');
      }
    }
  };

  const removeImage = name => {
    const newList = images.filter(image => image.name != name);
    setImages(newList);
    const newUrls = imgUrls.filter(image => {
      const imgName = image.substring(image.lastIndexOf('/') + 1);
      return imgName != name;
    });
    console.log(newUrls);
    setImgUrls(newUrls);
  };

  return (
    <View style={{backgroundColor: '#D6E8EE', width: '100%', height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 55,
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingEnd: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => {
              navigation.goBack();
              dispatch(showQuestionNav(true));
            }}
            name="keyboard-backspace"
            size={35}
            color="#018ABE"
            style={{alignSelf: 'center', left: 10}}
          />
          <Text
            style={{
              alignSelf: 'center',
              left: 25,
              fontSize: 25,
              color: 'black',
            }}>
            Tạo câu hỏi
          </Text>
        </View>
        <Pressable style={{alignSelf: 'center'}} onPress={() => handlePoint()}>
          <Text style={{fontSize: 18, color: '#018ABE', alignSelf: 'center'}}>
            Xác nhận
          </Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{marginTop: 5}}>
        <ModalPopup visible={showEditSubject}>
          <View
            style={{
              backgroundColor: 'white',
              width: 200,
              alignSelf: 'center',
              top: 100,
              borderRadius: 5,
              padding: 10,
            }}>
            <Text
              style={{
                borderBottomWidth: 1,
                height: 50,
                fontSize: 20,
                textAlign: 'center',
                paddingTop: 5,
                color: 'black',
              }}>
              Môn học
            </Text>
            <View>
              {subjects.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSubject(item.name);
                      setShowEditSubject(false);
                    }}
                    key={item.id}
                    style={{
                      height: 45,
                      justifyContent: 'center',
                      borderBottomWidth: index == subjects.length - 1 ? 0 : 0.8,
                      borderBottomColor: 'gray',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        textAlign: 'center',
                      }}>
                      {item.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ModalPopup>
        <ModalPopup visible={showEditClass}>
          <View
            style={{
              backgroundColor: 'white',
              width: 150,
              alignSelf: 'center',
              top: 100,
              borderRadius: 5,
              padding: 10,
            }}>
            <Text
              style={{
                borderBottomWidth: 1,
                height: 50,
                fontSize: 20,
                textAlign: 'center',
                paddingTop: 5,
                color: 'black',
              }}>
              Lớp
            </Text>
            <View>
              {classes.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setGrade(item.value);
                      setShowEditClass(false);
                    }}
                    key={item.label}
                    style={{
                      height: 45,
                      justifyContent: 'center',
                      borderBottomWidth: index == classes.length - 1 ? 0 : 0.8,
                      borderBottomColor: 'gray',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        textAlign: 'center',
                      }}>
                      {item.value}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ModalPopup>
        <Pressable
          onPress={() => setShowEditSubject(true)}
          style={{
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 16, color: 'black', alignSelf: 'center'}}>
            Chọn môn học
          </Text>
          <Text style={{fontSize: 16, alignSelf: 'center'}}>{subject}</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowEditClass(true)}
          style={{
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginBottom: 5,
          }}>
          <Text style={{fontSize: 16, color: 'black', alignSelf: 'center'}}>
            Chọn lớp
          </Text>
          <Text style={{fontSize: 16, alignSelf: 'center'}}>{grade}</Text>
        </Pressable>
        <TextInput
          placeholder="Hãy đưa ra câu hỏi của bạn"
          style={{
            backgroundColor: 'white',
            padding: 10,
            fontSize: 18,
            marginBottom: 5,
            minHeight: 80,
          }}
          multiline={true}
          onChangeText={text => setContent(text)}
        />
        <View>
          {!images ? (
            <></>
          ) : (
            <ScrollView horizontal={true}>
              {images.map((item, index) => {
                return (
                  <View key={item.name}>
                    <Icon
                      onPress={() => removeImage(item.name)}
                      name="close-circle"
                      size={22}
                      style={{
                        position: 'absolute',
                        right: 10,
                        zIndex: 10,
                        color: 'red',
                      }}
                    />
                    <Image
                      source={{uri: item.uri}}
                      style={{width: 100, height: 80, margin: 5}}
                      resizeMode="contain"
                    />
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        <Pressable
          onPress={() => pickImages()}
          style={{
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginBottom: 5,
          }}>
          <Text style={{alignSelf: 'center', fontSize: 16, color: 'black'}}>
            Chọn ảnh (Tối đa 9 ảnh)
          </Text>
          <Text style={{alignSelf: 'center'}}>10p/ ảnh</Text>
        </Pressable>
        <View>
          {!files ? (
            <></>
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 5,
                marginBottom: 3,
                height: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{alignSelf: 'center', paddingStart: 10}}>
                {files[0].name}
              </Text>
              <Icon
                onPress={() => {
                  setFiles(null);
                  setFileUrls(null);
                }}
                name="close"
                size={16}
                style={{alignSelf: 'center', paddingEnd: 10}}
              />
            </View>
          )}
        </View>
        <Pressable
          onPress={() => pickFile()}
          style={{
            backgroundColor: 'white',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginBottom: 5,
          }}>
          <Text style={{alignSelf: 'center', fontSize: 16, color: 'black'}}>
            Chọn file (.docx, .doc, .pdf)
          </Text>
          <Text style={{alignSelf: 'center'}}>20p</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}
