import {View, Text, Dimensions, StyleSheet, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Common/Loading';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';

const WIDTH = Dimensions.get('window').width;

export default function Profile({navigation}) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(`${BASE_URL}/ums/session/student`, config).then(res => {
      if (res.data.code === 0) {
        setUser(res.data.object);
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 20, fontWeight: '500', color: '#02457A'}}>
          Thông tin cá nhân
        </Text>
        <Icon
          name="account-edit-outline"
          size={24}
          color="#018ABE"
          onPress={() => navigation.navigate('edit-screen', {user})}
        />
      </View>
      {user ? (
        <View View style={styles.content}>
          <View>
            <Text style={styles.field}>Họ và tên</Text>
            <Text style={styles.field}>Giới tính</Text>
            <Text style={styles.field}>Ngày sinh</Text>
            <Text style={styles.field}>SĐT</Text>
            <Text style={styles.field}>Lớp</Text>
            <Text style={styles.field}>Môn học</Text>
          </View>
          <View>
            <Text style={styles.value}>{user.realName}</Text>
            <Text style={styles.value}>{user.gender == 1 ? 'Nam' : 'Nữ'}</Text>
            <Text style={styles.value}>{user.dateOfBirth}</Text>
            <Text style={styles.value}>{user.phoneNumber}</Text>
            <Text style={styles.value}>{user.course}</Text>

            <Text style={styles.value}>
              {user.subjects.length <= 3
                ? user.subjects.join(', ')
                : `${user.subjects[0]}, ${user.subjects[1]}, ${user.subjects[2]}, ...`}
            </Text>
          </View>
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: 'white',
    width: WIDTH - 10,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  field: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
});
