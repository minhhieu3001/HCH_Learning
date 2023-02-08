import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;

const Button = ({iconName, text, press}) => {
  return (
    <Pressable
      onPress={() => press(iconName)}
      style={{
        flexDirection: 'row',
        height: 50,
        marginBottom: 1,
        backgroundColor: 'white',
      }}>
      <Icon name={iconName} size={24} color="#82c0d3" style={{padding: 10}} />
      <Text style={{marginLeft: 30, fontSize: 16, color: 'black', padding: 10}}>
        {text}
      </Text>
    </Pressable>
  );
};

export default function Setting({navigation}) {
  const handlePress = buttonName => {
    if (buttonName === 'settings') {
      navigation.navigate('setting-screen');
    }
  };

  return (
    <View style={styles.container}>
      <Button iconName="share-social-outline" text="Chia sẻ nhận 500P" />
      <Button iconName="newspaper-outline" text="Tin tức" />
      <Button iconName="notifications-outline" text="Cài đặt thông báo" />
      <Button iconName="help-circle" text="Trợ giúp" />
      <Button iconName="settings" text="Các cài đặt khác" press={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: WIDTH,
    alignSelf: 'center',
  },
});
