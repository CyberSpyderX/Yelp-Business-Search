import apiHandler from './apiHandler';
export async function getData(requestData, category) {
  params = {term: 'restaurants'};

  switch (category) {
    case 'NEARBY':
      params = {
        ...params,
        latitude: requestData.latitude,
        longitude: requestData.longitude,
      };
      break;
    case 'FEATURED':
      params = {...params, location: requestData};
  }

  const response = await apiHandler.get('', {params: params});

  data = response.data.businesses;
  console.log('Data received from Yelp for', requestData);

  for (const el of data) {
    el.isSaved = false;
  }

  return data;
}
