import {PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';
import {useDispatch} from 'react-redux';

const PermissionsHook = () => {
  const dispatch = useDispatch();

  const requestPermission = async () => {
    try {
      const permissionResult = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Need Location Permission',
          message: 'Access nearby businesses',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch({type: 'SET_PERMISSION_STATE', payload: true});
        console.log('Location Permission Acquired!');

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
      } else {
        console.log('PermissionsHook.js: Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return [requestPermission];
};

export default PermissionsHook;
