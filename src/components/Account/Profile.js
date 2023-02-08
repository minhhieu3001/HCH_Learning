import {View, Text, Dimensions, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 18, color: '#8785A2'}}>Thông tin cá nhân</Text>
        <Icon
          name="account-edit-outline"
          size={24}
          color="#82c0d4"
          onPress={() => navigation.navigate('edit-screen')}
        />
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.field}>Họ và tên</Text>
          <Text style={styles.field}>Giới tính</Text>
          <Text style={styles.field}>Ngày sinh</Text>
          <Text style={styles.field}>Lớp</Text>
          <Text style={styles.field}>Môn học</Text>
        </View>
        <View>
          <Text style={styles.value}>Bùi Minh Hiếu</Text>
          <Text style={styles.value}>Nam</Text>
          <Text style={styles.value}>30/01/2001</Text>
          <Text style={styles.value}>12</Text>

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
