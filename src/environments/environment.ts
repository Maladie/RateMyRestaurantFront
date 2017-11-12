// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverEndpoint: 'http://localhost:8088/',
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
  /**
   * Get restaurant ingredient ratings where ingredient /rating/{ingredientName}
   */
  ratingEndpoint: '/rating/', //  - string
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
  restaurantByFoodEndpoint: '/restaurant/type/'
};
