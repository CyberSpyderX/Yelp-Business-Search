import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses/search',
  headers: {
    Authorization:
      'Bearer tUN4xFfL7VtRVH0ZY6jSbVRp1PpmT-4RE4OkKMd5oMlRklk8lpphXjnP08oQxAj1aPXKAJZ-OHRpQGQ4H8a9vzEy6segsGhJEb7AuYwTlusrkbP-DvZmSjWYku49YHYx',
  },
});
