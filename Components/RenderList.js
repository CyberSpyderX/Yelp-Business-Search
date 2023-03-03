import React, {useState} from 'react';
import {FlatList, Text, View, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import ListItem from './ListItem';

function RenderList({data, category, saveItem, refreshFn}) {
  const [isRefreshing, setRefreshing] = useState(false);
  
  if (Object.keys(data).length > 0) {
    return (
      <View style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <FlatList
            data={data}
            onRefresh={async () => {
              setRefreshing(true);
              let resp = await refreshFn(category);
              console.log(resp);
              setRefreshing(false);
            }}
            refreshing={isRefreshing}
            contentContainerStyle={{
              flexGrow: 0,
              minHeight: 100,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <ListItem item={item} saveFunction={saveItem} />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {
        category === 0 ? <ActivityIndicator color="blue" size="large" /> :
         category === 1 ? <Text>Type in a location and submit!</Text> : 
          <Text>Oops! Looks like you've not saved any location.</Text>
      }
    </View>
  );
}

export default RenderList;
