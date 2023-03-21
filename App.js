import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './saga/store';
import Navbar from './Components/Navbar';
import RenderList from './Components/RenderList';
import CategoryBar from './Components/CategoryBar';
import GetLocation from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';
import MapComponent from './Components/MapComponent';
import PermissionsHook from './hooks/PermissionsHook';

const App = () => {
  const [isMapShown, setIsMapShown] = useState(false);
  const [requestPermission] = PermissionsHook();
  const isRequesting = useSelector(state => state.networkReducer.requesting);
  const state = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function startFunction() {
      await requestPermission();
    }
    startFunction();
  }, []);

  async function refreshData(category) {
    if (category === 'NEARBY') {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      });

      let requestData = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      dispatch({type: 'SET_LOCATION_DATA', payload: requestData});

      dispatch({type: 'SET_CATEGORY', payload: 'NEARBY'});

      dispatch({type: 'GET_NEARBY_DATA'});
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Navbar
        mapSelected={isMapShown}
        mapFunction={() => {
          setIsMapShown(prev => !prev);
        }}
      />
      <CategoryBar />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {isRequesting ? (
          <ActivityIndicator color="blue" size="large" />
        ) : Object.keys(state.selectedData).length > 0 ? (
          isMapShown ? (
            <MapComponent />
          ) : (
            <RenderList refreshFn={refreshData} />
          )
        ) : state.category === 'FEATURED' ? (
          <Text style={{alignSelf: 'center'}}>
            Type in a location and submit!
          </Text>
        ) : state.category === 'SAVED' ? (
          <Text style={{alignSelf: 'center'}}>
            Oops! Looks like you've not saved any location.
          </Text>
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
