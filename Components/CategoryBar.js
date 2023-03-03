import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CategoryBar = ({selected, ctgFunction}) => {
  if (selected === 3) selected = 1;
  const colors = ['red', '#66ff66', 'blue'];
  let barTextColors = new Array(3).fill('black');
  let barUnderlineColors = new Array(3).fill('white');
  barTextColors[selected] = colors[selected];
  barUnderlineColors[selected] = colors[selected];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => ctgFunction('Nearby')}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              letterSpacing: 1,
              color: barTextColors[0],
            }}>
            NEARBY
          </Text>
        </View>
        <View style={{ paddingVertical: 2, backgroundColor: barUnderlineColors[0] }} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1}} onPress={() => ctgFunction('Featured')}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              letterSpacing: 1,
              color: barTextColors[1],
            }}>
            FEATURED
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: barUnderlineColors[1]}} />
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 1}} onPress={() => ctgFunction('Saved')}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              letterSpacing: 1,
              color: barTextColors[2],
            }}>
            SAVED
          </Text>
        </View>
        <View style={{flex: 1, backgroundColor: barUnderlineColors[2]}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
};

export default CategoryBar;
