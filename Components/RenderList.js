import React, {useState} from 'react';
import {FlatList, View, KeyboardAvoidingView} from 'react-native';
import ListItem from './ListItem';
import {useSelector} from 'react-redux';

function RenderList({refreshFn}) {
  const [isRefreshing, setRefreshing] = useState(false);

  const state = useSelector(state => state.dataReducer);

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <FlatList
          data={state.selectedData}
          onRefresh={async () => {
            setRefreshing(true);
            await refreshFn(state.category);
            setRefreshing(false);
          }}
          refreshing={isRefreshing}
          contentContainerStyle={{
            flexGrow: 0,
            minHeight: 100,
          }}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ListItem item={item} />}
          style={{flex: 1}}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default RenderList;
