import React, {useState, useEffect} from 'react';
import { View, KeyboardAvoidingView} from 'react-native';
import searchHook from './hooks/searchItems';
import Navbar from './Components/Navbar';
import CategoryBar from './Components/CategoryBar';
import MapComponent from './Components/MapComponent';
import GetLocation from 'react-native-get-location';
import RenderList from './Components/RenderList'
import PermissionsHook from "./hooks/PermissionsHook";

const App = () => {
  const [search, nearbyData, featuredData, clearData] = searchHook();
  const [requestPermission, isPermitted, locationData] = PermissionsHook();
  const [isMapShown, setIsMapShown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [restaurantData, setRestaurantData] = useState({});
  const [savedData, setSavedData] = useState([]);
  
  function ctgFunction(ctgSelected)
  {
    if(ctgSelected === 'Nearby')
    {
      setSelectedCategory(0);
      setRestaurantData(nearbyData);
      console.log('Nearby Selected!');
    }
    else if(ctgSelected === 'Featured')
    {
      setSelectedCategory(1);
      setRestaurantData(featuredData);
      console.log('Featured Selected!');
    }
    else if(ctgSelected === 'Saved')
    {
      setSelectedCategory(2);
      setRestaurantData(savedData);
      console.log('Saved Selected!');
    }
  }
  function saveItem(item, state) {
    if (state) {
      savedData.push(item);
    } else {
      let newSavedData = savedData.filter((e) => e.id !== item.id);
      setSavedData(newSavedData);
    }
  }

  useEffect(() => {
    console.log('UseEffect called!');
    async function startFunction() {
      await requestPermission();
    }
    startFunction();
  }, []);

  useEffect( () => {
    console.log("Permission: ", isPermitted)
    if (isPermitted)
      search(locationData)
  }, [isPermitted])
  
  useEffect(() => {

    if(selectedCategory === 0)
      setRestaurantData(nearbyData)
    else if(selectedCategory === 1)
      setRestaurantData(featuredData)

  }, [nearbyData, featuredData]);

  function searchNewLocation(location) {
    setSelectedCategory(3);
    search({location: location}).then(() => {
      setSelectedCategory(1);
    });
  }
  function returnData() {
    let data = [];
    if(selectedCategory == 0)
      data = nearbyData;
    else if(selectedCategory == 1)
      data = featuredData;
    else
      data = savedData;
    return data;
  }
  function showMap() {
    setIsMapShown((prev) => !prev);
  }

  async function refreshData(category)
  {
      clearData(0);
      setSelectedCategory(0);
      if(category === 0)
      {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
        })
        .then(location => {
          search({
            latitude: location.latitude,
            longitude: location.longitude,
          }).then(setSelectedCategory(0));
        })
      }
  }
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Navbar mapSelected={isMapShown} searchFunction={searchNewLocation} mapFunction={showMap} />
      <CategoryBar
        selected={selectedCategory}
        ctgFunction={ctgFunction}
      />
      <View style={{flex: 1}}>
        {isMapShown ? (
          <MapComponent yelpData={restaurantData} />
        ) : (
          <RenderList data={restaurantData} category={selectedCategory} saveItem={saveItem} refreshFn={refreshData}/>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};


export default App;