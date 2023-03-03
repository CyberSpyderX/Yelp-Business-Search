import React, {useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import GetLocation from 'react-native-get-location';

const PermissionsHook = () => {
  const [isPermitted, setPermitted] = useState(false);
  const [locationData, setLocationData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Need Location Permission',
          message: 'Access nearby businesses',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('........................');
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission Acquired!');
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
        });
        console.log(location);
        let requestData = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        console.log(requestData);
        setLocationData(requestData);
        setPermitted(true);
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return [requestPermission, isPermitted, locationData, errorMessage];
};

export default PermissionsHook;
