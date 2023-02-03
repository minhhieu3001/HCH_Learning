import React, {useState} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';

const Rate = ({starNumber, isChoose, size}) => {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [defaultRating, setDefaultRating] = useState(starNumber);
  const [change, setChange] = useState(isChoose ? true : false);
  return (
    <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => {
              if (!change) {
              } else {
                setDefaultRating(item);
              }
            }}>
            <Image
              style={{width: size, height: size, resizeMode: 'cover'}}
              source={
                item <= defaultRating
                  ? require('../../assets/images/star_filled.png')
                  : require('../../assets/images/star_corner.png')
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Rate;
