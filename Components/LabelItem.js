import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');
const LabelItem = ({
  imageURI,
  ratingValue,
  name,
  category,
  priceRange,
  color,
}) => {
  let imageWidth = (width - 20) / 3;

  return (
    <View
      style={{
        width: width,
        height: 200,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: width - 20,
          height: 180,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: 'white',
          borderRadius: 15,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 4,
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: imageURI}}
              style={{
                width: imageWidth,
                height: 120,
                resizeMode: 'cover',
                marginLeft: 20,
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{flex: 6, justifyContent: 'center'}}>
            <View
              style={{
                height: 140,
                borderWidth: 1,
                borderColor: 'white',
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  height: 30,
                  width: 60,
                  borderColor: 'white',
                  borderWidth: 1,
                  marginLeft: 10,
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {ratingValue}
                </Text>
                <Icons
                  name="star"
                  size={20}
                  style={{marginLeft: 3, marginTop: 2}}
                  color="#f9f906"
                />
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 20,
                }}>
                {name}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 8,
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}>
                {category}
              </Text>
              <View
                style={{flexDirection: 'row', marginLeft: 10, marginTop: 8}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: priceRange.length > 0 ? 'red' : 'black',
                  }}>
                  $
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: priceRange.length > 1 ? 'red' : 'black',
                  }}>
                  $
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: priceRange.length > 2 ? 'red' : 'black',
                  }}>
                  $
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LabelItem;
