import apiHandler from '../networking/apiHandler';
import {useState} from 'react';

const searchItems = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [nearbyData, setNearbyData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const params = new URLSearchParams();

  function clearData(index) {
    if (index) {
      setFeaturedData([]);
    } else {
      setNearbyData([]);
    }
  }
  const search = async (requestData) => {
    console.log('Searching for ', requestData);
    try {
      params.append('term', 'Restaurants');
      if (requestData.hasOwnProperty('latitude')) {
        params.append('latitude', requestData.latitude);
        params.append('longitude', requestData.longitude);
        console.log(params);
        const response = await apiHandler.get('', { params: { latitude: requestData.latitude, longitude: requestData.longitude} });
        console.log('Nearby Request returned!');
        data = response.data.businesses
        for(const el of data)
          el.isSaved = 0;
        setNearbyData(data);
      } else {
        params.append('location', requestData.location);
        console.log(params);
        const response = await apiHandler.get('', { params: { location: requestData.location }});
        console.log('Location request returned!');
        data = response.data.businesses
        for(const el of data)
          el.isSaved = 0;
        setFeaturedData(response.data.businesses);
      }
    } catch (error) {
      setErrorMessage(
        'Request failed with status code: ' + error.response.status,
      );
      console.log("Error Code: ", error.response.data.error.code)
    }
  };
  return [search, nearbyData, featuredData, errorMessage, clearData];
};

export default searchItems;
