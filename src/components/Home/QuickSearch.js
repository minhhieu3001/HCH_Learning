import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH} from '../../constant/dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import {Dropdown} from 'react-native-element-dropdown';
import Item from '../Common/Item';

const Button = ({text, active, onPress}) => {
  return (
    <Pressable
      style={active ? styles.itemActive : styles.itemInActive}
      onPress={onPress}>
      <Text style={active ? styles.textActive : styles.textInActive}>
        {text}
      </Text>
    </Pressable>
  );
};

const subjects = [
  {
    id: 1,
    name: 'Toán học',
  },
  {
    id: 2,
    name: 'Ngoại ngữ',
  },
  {
    id: 3,
    name: 'Vật lí',
  },
  {
    id: 4,
    name: 'Hóa học',
  },
  {
    id: 5,
    name: 'Sinh học',
  },
  {
    id: 6,
    name: 'Địa lí',
  },
];

const classes = [
  {
    id: 1,
    name: 7,
  },
  {
    id: 2,
    name: 8,
  },
  {
    id: 3,
    name: 9,
  },
  {
    id: 4,
    name: 10,
  },
  {
    id: 5,
    name: 11,
  },
  {
    id: 6,
    name: 12,
  },
];

export default function QuickSearch({navigation, type}) {
  const [subject, setSubject] = useState(null);
  const [grade, setGrade] = useState(null);

  const [teachers, setTeachers] = useState(null);
  const [tab, setTab] = useState(type);

  const tabs = [
    {label: 'Tất cả', value: 3},

    {label: 'Yêu thích', value: 2},
    {label: 'Đề xuất', value: 1},
  ];

  const getTeachers = async () => {
    setTeachers(null);
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/getTeachers/getTeacher?page=0&size=20&tab=${tab}&searchBySubjects=${
          !subject ? '' : subject
        }&searchByClasses=${!grade ? '' : grade}`,
        config,
      )
      .then(res => {
        if (res.data.code === 0) {
          if (res.data.object != null) {
            setTeachers(res.data.object.teacherResponses);
          } else setTeachers([]);
        }
      });
  };

  const handleChooseSubject = text => {
    if (text == subject) {
      setSubject(null);
    } else {
      setSubject(text);
    }
  };

  const handleChooseClass = text => {
    if (text == grade) {
      setGrade(null);
    } else {
      setGrade(text);
    }
  };

  const navigateToDetailScreen = id => {
    navigation.navigate('detail-screen', {teacherId: id});
  };

  useEffect(() => {
    getTeachers();
    console.log('eo');
  }, [tab, subject, grade]);

  return (
    <ScrollView>
      <LinearGradient style={{width: WIDTH}} colors={['#4dccfe', '#b3d8e5']}>
        <View style={styles.container}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
            Môn học
          </Text>
          <ScrollView horizontal={true} style={{alignSelf: 'center'}}>
            {subjects.map((item, index) => {
              if (index % 2 == 0)
                return (
                  <View key={subjects[index].id} style={{}}>
                    <Button
                      text={subjects[index].name}
                      active={subject === subjects[index].name ? true : false}
                      onPress={() => {
                        handleChooseSubject(subjects[index].name);
                      }}
                    />
                    <Button
                      text={subjects[index + 1].name}
                      active={
                        subject === subjects[index + 1].name ? true : false
                      }
                      onPress={() => {
                        handleChooseSubject(subjects[index + 1].name);
                      }}
                    />
                  </View>
                );
            })}
          </ScrollView>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>
            Lớp
          </Text>
          <ScrollView horizontal={true} style={{alignSelf: 'center'}}>
            {classes.map((item, index) => {
              if (index % 2 == 0)
                return (
                  <View key={classes[index].id} style={{}}>
                    <Button
                      text={classes[index].name}
                      active={grade === classes[index].name ? true : false}
                      onPress={() => {
                        handleChooseClass(classes[index].name);
                      }}
                    />
                    <Button
                      text={classes[index + 1].name}
                      active={grade === classes[index + 1].name ? true : false}
                      onPress={() => {
                        handleChooseClass(classes[index + 1].name);
                      }}
                    />
                  </View>
                );
            })}
          </ScrollView>
          <View style={{height: 10}}></View>
          <Pressable
            style={styles.buttonSearch}
            onPress={() => navigation.navigate('search-screen')}>
            <Icon
              name="account-filter"
              size={24}
              color="#018ABE"
              style={{alignSelf: 'center'}}
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 16,
                color: 'black',
                alignSelf: 'center',
              }}>
              Thêm điều kiện
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
      <View>
        <View style={{marginTop: 15}}>
          <Dropdown
            data={tabs}
            labelField="label"
            valueField="value"
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            value={tab}
            onChange={async item => {
              await setTab(item.value);
            }}
          />
        </View>
        <ScrollView
          style={{alignSelf: 'center', marginTop: 5}}
          horizontal={false}>
          {!teachers ? (
            <ActivityIndicator size="large" color="#018ABE" />
          ) : teachers.length == 0 ? (
            <Text>Không có giáo viên nào</Text>
          ) : (
            teachers.map((item, index) => {
              return (
                <Item
                  key={item.id}
                  teacher={item}
                  press={() => navigateToDetailScreen(item.id)}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
  },
  itemInActive: {
    width: 100,
    height: 35,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 20,
    borderEndWidth: 3,
    borderStartWidth: 3,
    borderEndColor: 'gray',
    borderStartColor: 'gray',
  },
  itemActive: {
    width: 100,
    height: 35,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    backgroundColor: '#cc3300',
    borderRadius: 20,
  },
  textActive: {
    fontSize: 16,
    color: 'white',
  },
  textInActive: {
    fontSize: 16,
    color: 'black',
  },
  buttonSearch: {
    flexDirection: 'row',
    borderWidth: 1,
    width: 250,
    height: 30,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -15,
  },
  dropdown: {
    width: 120,
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  containerStyle: {
    backgroundColor: 'white',
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    padding: 4,
  },
  itemTextStyle: {
    color: 'black',
  },
});
