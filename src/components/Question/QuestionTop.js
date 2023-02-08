import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {showTabNav} from '../../actions/visibleTabNavAction';

export default function QuestionTop({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          onPress={() => {
            dispatch(showTabNav());
            navigation.goBack();
          }}
          name="close"
          size={30}
          color="#8785A2"
          style={{alignSelf: 'center', left: 10}}
        />
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          Hỏi & đáp
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.5,
          height: 30,
          top: 10,
          right: 10,
          paddingTop: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 20,
        }}>
        <Text>1234P</Text>

        <Icon
          name="plus-circle-outline"
          size={20}
          style={{marginLeft: 5, color: '#82dc'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
