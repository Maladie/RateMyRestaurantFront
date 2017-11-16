export const environment = {
  production: true,
  serverEndpoint: 'https://rate-my-restaurant-api.herokuapp.com/',
  /**
   * Get all restaurants in radius
   * Required rarameters: lat, lng, radius: number
   */
  placesInRadiusEndpoint: '/places/area', // /places?lat=&lng=&radius&type=
  /**
   * Get place details. Complete endpoint: '/places/{placeId}/details'
   */
  placesDetailsEndpoint: '/details', // /{placeId}/details
  /**
   * Get all ingredients
   */
  ingredientEndopoint: '/ingredients',
  /**
   * Post new ingredient type { 'id': '', 'name': ''}
   */
  ingredientAddEndpoint: '/ingredients/add',
 
  ratingEndpoint: '/rating/rate', //  - string
  /**
   * Post NewUser credentials { username: '', password: ''} // more in the future...
   */
  registerEndpoint: '/register',
  /**
   * Post User credentials { username: '', password: ''}
   */
  registerToApiEndpoint: '/api/register', // in-development
  /**
   * Post Updated restaurant information (PlaceDetailsData)
   * {
   *  'id': 'string',
   * 'name': 'string',
   * 'location': [ 'lat': '', 'lng': ''],
   * 'newlyCreated':'boolean',
   * 'foodTypes': [ ],
   * 'ingredientRatings': [ ]
   * }
   */
  restaurantSaveEndpoint: '/restaurants/save',
  /**
   * Get restaurant id info. Use '/restaurant/{restaurant/placeId}'
   */
  restaurantEndpoint: '/restaurants/',
  /**
   * WiP!
   * Get restaurants by foodType. Use '/restaurant/type/{foodType}'
   */
  restaurantByFoodEndpoint: '/restaurant/type/',

  restaurantFoodTypesEndpoint: '/foodType'
};
