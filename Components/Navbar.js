import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

const Navbar = ({mapSelected, mapFunction}) => {
  const dispatch = useDispatch();
  const mapIcon = mapSelected ? 'list-outline' : 'map-outline';
  return (
    <View style={styles.container}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', padding: 10}}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Home
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-around',
          padding: 5,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#b3b3b3',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="filter-outline" size={30} />
        </TouchableOpacity>
        <View style={{flex: 8}}>
          <TextInput
            style={{
              elevation: 1,
              borderWidth: 1,
              borderRadius: 5,
              height: 40,
              marginHorizontal: 5,
              borderColor: '#b3b3b3',
              backgroundColor: 'white',
            }}
            placeholder=" Search in your location"
            onSubmitEditing={event =>
              dispatch({
                type: 'GET_FEATURED_DATA',
                payload: event.nativeEvent.text,
              })
            }
          />
        </View>
        <TouchableOpacity
          onPress={mapFunction}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#b3b3b3',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name={mapIcon} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    padding: 5,
    borderBottomWidth: 1,
    backgroundColor: '#e6e6e6',
  },
};

export default Navbar;
