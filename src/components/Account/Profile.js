import {View, Text, Dimensions, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Thông tin cá nhân</Text>
        <Icon name="account-edit-outline" size={24} color="#82c0d4" />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.field}>Họ và tên</Text>
          <Text style={styles.field}>Giới tính</Text>
          <Text style={styles.field}>Ngày sinh</Text>
          <Text style={styles.field}>A</Text>
          <Text style={styles.field}>B</Text>
          <Text style={styles.field}>Môn học</Text>
        </View>
        <View>
          <Text style={styles.value}>Bùi Minh Hiếu</Text>
          <Text style={styles.value}>Nam</Text>
          <Text style={styles.value}>30/01/2001</Text>
          <Text style={styles.value}>A</Text>
          <Text style={styles.value}>B</Text>
          <Text style={styles.value}>Toán, Ngoại Ngữ, Vật lí, ...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: 'white',
    width: WIDTH - 20,
    alignSelf: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 18,
    color: 'black',
  },
});
