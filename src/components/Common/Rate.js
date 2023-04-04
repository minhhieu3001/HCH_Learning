import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';

const Rate = ({starNumber, isChoose, size, setData}) => {
  const [maxRating, setMaxRating] = useState([1.0, 2.0, 3.0, 4.0, 5.0]);
  const [defaultRating, setDefaultRating] = useState(starNumber);
  const [change, setChange] = useState(isChoose ? true : false);

  useEffect(() => {
    console.log(starNumber);
  }, []);

  return (
    <View style={{flexDirection: 'row'}}>
      {maxRating.map((item, key) => {
        if (Number.isInteger(defaultRating)) {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                if (!change) {
                } else {
                  setDefaultRating(item);
                  setData(item);
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
        } else {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => {
                if (!change) {
                } else {
                  setDefaultRating(item);
                  setData(item);
                }
              }}>
              <Image
                style={{width: size, height: size, resizeMode: 'cover'}}
                source={
                  item < Math.ceil(defaultRating)
                    ? require('../../assets/images/star_filled.png')
                    : item == Math.ceil(defaultRating)
                    ? require('../../assets/images/star_filled_a_half.png')
                    : require('../../assets/images/star_corner.png')
                }
              />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default Rate;
