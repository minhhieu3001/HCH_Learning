import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import ChatTop from '../../components/Chat/ChatTop';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {teachers} from '../../data/teacher';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {messages} from '../../data/messages';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';
import Loading from '../../components/Common/Loading';

export default function ChatScreen({navigation}) {
  const dispatch = useDispatch();

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);
    if (dif < 0 || currentOffset == 0) {
      dispatch(showTabNav());
    } else {
      dispatch(hideTabNav());
    }
    this.offset = currentOffset;
  };
  return (
    <View style={styles.container}>
      <ChatTop />
      <View>
        {!teachers || !messages ? (
          <Loading />
        ) : (
          <ScrollView
            onScroll={e => onScroll(e)}
            showsVerticalScrollIndicator={false}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {!teachers ? (
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    height: 110,
                    width: WIDTH,
                  }}>
                  <Text
                    style={{fontSize: 20, color: 'black', alignSelf: 'center'}}>
                    Chưa yêu thích giáo viên nào
                  </Text>
                </View>
              ) : (
                teachers.map((item, index) => {
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => navigation.navigate('chat-detail-screen')}
                      key={item.id}
                      style={{
                        marginTop: 20,
                        marginBottom: 10,
                        marginLeft: 10,
                        marginRight: 10,
                        height: 110,
                        width: 80,
                      }}>
                      <Image
                        source={require('../../assets/images/images.png')}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 35,
                          alignSelf: 'center',
                        }}
                      />
                      <Icon
                        name="moon-full"
                        size={18}
                        style={{
                          color: 'green',
                          position: 'absolute',
                          left: 50,
                          top: 50,
                          padding: 1,
                          backgroundColor: 'white',
                          borderRadius: 9,
                        }}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          textAlign: 'center',
                          fontSize: 14,
                          color: 'black',
                        }}>
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
            <View>
              {!messages ? (
                <View></View>
              ) : (
                messages.map((item, index) => {
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => navigation.navigate('chat-detail-screen')}
                      style={{
                        flexDirection: 'row',
                        width: WIDTH,
                        height: 80,
                      }}>
                      <Image
                        source={require('../../assets/images/images.png')}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 35,
                          alignSelf: 'center',
                          marginLeft: 10,
                        }}
                      />
                      <View style={{padding: 10, width: WIDTH - 80}}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'black',
                            fontWeight: '500',
                          }}>
                          {item.userName}
                        </Text>
                        <Text style={{fontSize: 16}} numberOfLines={1}>
                          {item.message}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
  tab: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
  },
  active: {
    width: '50%',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#82cd',
  },
  inactive: {
    width: '50%',
    justifyContent: 'center',
  },
  textActive: {
    textAlign: 'center',
    fontSize: 16,
    color: '#82cd',
  },
  textInActive: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
