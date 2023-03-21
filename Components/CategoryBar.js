import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const CategoryBar = () => {
  const category = useSelector(state => state.dataReducer.category);
  const dispatch = useDispatch();

  const colors = {NEARBY: 'red', FEATURED: '#66ff66', SAVED: 'blue'};
  let barTextColors = {NEARBY: 'black', FEATURED: 'black', SAVED: 'black'};
  let barUnderlineColors = {NEARBY: 'white', FEATURED: 'white', SAVED: 'white'};
  barTextColors[category] = colors[category];
  barUnderlineColors[category] = colors[category];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => dispatch({type: 'SET_CATEGORY', payload: 'NEARBY'})}>
        <View style={styles.optionView}>
          <Text style={{...styles.optionText, color: barTextColors.NEARBY}}>
            NEARBY
          </Text>
        </View>
        <View
          style={{
            ...styles.horizontalLine,
            backgroundColor: barUnderlineColors.NEARBY,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => dispatch({type: 'SET_CATEGORY', payload: 'FEATURED'})}>
        <View style={styles.optionView}>
          <Text style={{...styles.optionText, color: barTextColors.FEATURED}}>
            FEATURED
          </Text>
        </View>
        <View
          style={{
            ...styles.horizontalLine,
            backgroundColor: barUnderlineColors.FEATURED,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => dispatch({type: 'SET_CATEGORY', payload: 'SAVED'})}>
        <View style={styles.optionView}>
          <Text style={{...styles.optionText, color: barTextColors.SAVED}}>
            SAVED
          </Text>
        </View>
        <View
          style={{
            ...styles.horizontalLine,
            backgroundColor: barUnderlineColors.SAVED,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  touchableOpacity: {
    flex: 1,
  },
  optionView: {
    alignItems: 'center',
    marginVertical: 15,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  horizontalLine: {
    paddingVertical: 2,
  },
};

export default CategoryBar;
