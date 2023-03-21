import React from 'react';
import LabelItem from './LabelItem';
import {useSelector} from 'react-redux';
import {View, ScrollView} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const MapComponent = () => {
  const yelpData = useSelector(state => state.dataReducer.selectedData);
  let key = 0,
    currentIndex = 0,
    mapObj,
    markerRefs = new Array(20),
    markerIndex = 0;

  function handleScroll(event) {
    const {contentOffset} = event.nativeEvent;
    currentIndex = Math.round(
      contentOffset.x / event.nativeEvent.layoutMeasurement.width,
    );

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
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={ref => (mapObj = ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: yelpData[0].coordinates.latitude,
          longitude: yelpData[0].coordinates.longitude,
          latitudeDelta: 0.026,
          longitudeDelta: 0.005,
        }}>
        {yelpData.map(element => (
          <Marker
            ref={ref => (markerRefs[markerIndex++] = ref)}
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
          {yelpData.map(element => (
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
