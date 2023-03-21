
# Restaurant Finder

This project was made for the purpose of easing the process of searching for businesses and restuarants around you or anywhere in the world. It uses the Yelp Business API (https://docs.developer.yelp.com/reference/v3_business_search) to search for popular restaurants across the globe. You can also save your favourite restaurants which you can see later. It is made using React Native so it can run seemlessly on both iOS and Android. It also features interactive React Native Maps to explore the desired locale better. It also leverages the capabilities of Redux Saga to handle predictable states and asynchronous network calls.

## Installation

Clone the project

```bash
    git clone https://github.com/CyberSpyderX/Yelp.git
```

Install the dependencies

```bash
    npm install
```

Add the required API Keys

**Yelp**

Add the Bearer Token for the Yelp Business Search API in the placeholder in networking/apiHandler.js
```bash
  headers: {
    Authorization: 'Bearer <-----YOUR-YELP-BEARER-TOKEN----->',
  }
```

**Google Maps**

Add the Google Maps API Key in the android/src/main/AndroidManifest.xml
```bash
    <meta-data
      android:name="com.google.android.geo.API_KEY"
      android:value="<-----YOUR-GOOGLE-MAPS-API-KEY----->" />
```

Run the project
```bash
    npx react-native run-android
```
## Features

- Search for nearby restaurants
- Search for restaurants in any city
- Save your favourite restaurants
- Interactive Maps
- Cross platform
## Screenshots

 | Use Case  | Screenshot |
| ------------- | ------------- |
| Searching for Nearby Restaurants  | ![App Screenshot](https://drive.google.com/uc?id=1680QrIzM4_ayXBa0wxzuXac6sqIWjGGe)  |
| Searching for Restaurants at desired location  | ![App Screenshot](https://drive.google.com/uc?id=1EbLN3jne_osb_BIokkrC0m3nbfdUpdgZ)  |
| Saving restaurants  | ![App Screenshot](https://drive.google.com/uc?id=1Ntkoz6yiXNBb7RE_V47DqK5vPqDuuycL)  |
| Searching for Restaurants using Maps  | ![App Screenshot](https://drive.google.com/uc?id=1DZrKM-YGF6SRn4I5Nnm4Kr-ynQ-CO6yu)  |

### Interactive Maps

![App Screenshot](https://drive.google.com/uc?id=1V27taMxsDAvAp_9soN8XoCISVIxqI2DG)





