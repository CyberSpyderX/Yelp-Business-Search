import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icons from 'react-native-vector-icons/Ionicons';
import getShortDistance from '../hooks/getShortDistance';
import {useDispatch} from 'react-redux';

const App = ({item}) => {
  const [dist, distUnit] = getShortDistance(Number(item.distance));
  const dispatch = useDispatch();

  function markSaved() {
    if (!item.isSaved) {
      item.isSaved = true;
      dispatch({type: 'ADD_TO_SAVED', payload: item});
    } else {
      item.isSaved = false;
      dispatch({type: 'REMOVE_FROM_SAVED', payload: item.id});
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          source={{uri: item.image_url}}
          style={{flex: 1, borderRadius: 10, resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.detailView}>
        <View
          style={{
            flex: 7,
            marginLeft: 15,
            marginTop: 10,
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                fontSize: 20,
                flex: 8,
                height: 30,
                fontWeight: '700',
                marginBottom: 10,
                color: '#4d4d4d',
              }}>
              {item.name}
            </Text>
            <View style={{flex: 2}}>
              <TouchableOpacity onPress={() => markSaved()}>
                <Icons
                  name={item.isSaved ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color={item.isSaved ? 'red' : 'black'}
                  style={{marginTop: 2, marginRight: 5, alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <StarRating
            maxStars={5}
            starSize={15}
            disabled={true}
            rating={item.rating}
            halfStarColor="#fe482b"
            fullStarColor="#fe482b"
          />
        </View>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{
              marginLeft: 15,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: 'grey',
              flex: 1,
              letterSpacing: 1,
            }}>
            {item.categories[0].title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Icons
              name="location-sharp"
              size={16}
              color="#4d4d4d"
              style={{marginTop: 1}}
            />
            <Text
              style={{
                justifyContent: 'flex-end',
                fontWeight: 'bold',
                color: 'grey',
                textAlign: 'right',
                marginRight: 10,
              }}>
              {dist} {distUnit}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    height: 125,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  imageView: {
    flex: 3,
  },
  detailView: {
    flex: 7,
    borderWidth: 0,
  },
};

export default App;
