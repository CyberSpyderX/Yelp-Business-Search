import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, Animated} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import LabelItem from './LabelItem';

const {height, width} = Dimensions.get('window');

const MapComponent = ({yelpData}) => {
  let key = 0,
    currentX = 0,
    currentIndex = 0,
    mapObj,
    markerRefs = new Array(20),
    markerIndex = 0;
  const [scrollXValue, setScrollXValue] = useState(new Animated.Value(0));
  useEffect(() => console.log(scrollXValue), [scrollXValue]);
  yelpData.map((element) => console.log(element.hasOwnProperty('price')));
  function handleScroll(event: Object) {
    var newX = event.nativeEvent.contentOffset.x;
    console.log(newX, currentX, newX > currentX);
    if (newX > currentX) {
      currentIndex++;
    } else if (newX < currentX) {
      currentIndex--;
    } else {
      return;
    }
    mapObj.animateToRegion(
      {
        latitude: yelpData[currentIndex].coordinates.latitude,
        longitude: yelpData[currentIndex].coordinates.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      },
      1000,
    );
    markerRefs[currentIndex].showCallout();
    markerRefs[currentIndex].pinColor = 'green';
    currentX = newX;
  }
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={(ref) => (mapObj = ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: yelpData[0].coordinates.latitude,
          longitude: yelpData[0].coordinates.longitude,
          latitudeDelta: 0.026,
          longitudeDelta: 0.005,
        }}>
        {yelpData.map((element) => (
          <Marker
            ref={(ref) => (markerRefs[markerIndex++] = ref)}
            coordinate={element.coordinates}
            key={++key}
            title={element.name}
            description={element.categories[0].title}
          />
        ))}
      </MapView>
      <View style={styles.labelView}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          horizontal={true}
          pagingEnabled
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          {yelpData.map((element) => (
            <LabelItem
              key={++key}
              imageURI={element.image_url}
              category={element.categories[0].title}
              name={element.name}
              priceRange={
                element.hasOwnProperty('price') ? element.price : '$$$$$'
              }
              ratingValue={element.rating}
              color={key % 2 ? 'lightgreen' : 'red'}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = {
  map: {
    flex: 1,
  },
  labelView: {
    height: 200,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
};

export default MapComponent;
