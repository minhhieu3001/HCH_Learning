import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {subjects} from '../../data/subjects';
import LinearGradient from 'react-native-linear-gradient';
import {WIDTH} from '../../constant/dimentions';

const Item = ({text, active, onPress}) => {
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

export default function QuickSearch({navigation}) {
  const [chooseItem, setChooseItem] = useState('');

  const handleChoose = text => {
    setChooseItem(text);
  };

  return (
    <LinearGradient style={{width: WIDTH}} colors={['#ffe6ff', '#ccffff']}>
      <View style={styles.container}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>
          Môn học
        </Text>
        <FlatList
          data={subjects}
          renderItem={({item}) => (
            <Item
              text={item.name}
              active={chooseItem === item.name ? true : false}
              onPress={() => {
                handleChoose(item.name);
              }}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={3}
          horizontal={false}
          style={{alignSelf: 'center', top: 10, marginBottom: 20}}
        />
        <Pressable
          style={styles.buttonSearch}
          onPress={() => navigation.navigate('search-screen')}>
          <Icon
            name="options-outline"
            size={24}
            color="#82ce"
            style={{alignSelf: 'center'}}
          />
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 16,
              color: 'black',
              alignSelf: 'center',
            }}>
            Thêm lọc
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
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
    backgroundColor: '#82cd',
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
    borderColor: '#83c',
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -15,
  },
});
