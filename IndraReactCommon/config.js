/**
 * Default API_URL of Indra would be production URL.
 * If the user has set the environment variable - REACT_APP_API_URL -
 * then that value will be set a the API_URL.
 * One of the ways to set REACT_APP_API_URL is by running the frontend using
 * the below command -
 *        REACT_APP_API_URL=http://127.0.0.1:8000/ npm start
 * (Make sure the backend is running at http://127.0.0.1:8000/)
 *
 *
 * Note: All environment variables in create-react-app setup needs to have
 * the prefix REACT_APP_
 * For more infromation - https://create-react-app.dev/docs/adding-custom-environment-variables/
 */
 let API_URL = 'https://indraabm.herokuapp.com/';
 
 if (process.env.REACT_APP_API_URL) {
   API_URL = process.env.REACT_APP_API_URL;
 }
 
 let PROPS_URL = API_URL + 'models/props/';
 let MENU_URL = API_URL + 'menus/model';
 let RUN_URL = API_URL + 'models/run/';
 let CLEAR_REGISTRY_URL = API_URL + 'registry/clear/';
 let POPHIST_URL = API_URL + 'pophist/';
 let USER_MSGS_URL = API_URL + 'user/msgs/';
 let DEBUG_URL = API_URL + 'menus/debug';
 let SOURCE_URL = API_URL + 'source/';
 let REGISTRY_URL = API_URL + 'registry';
 let LOCATION_URL = API_URL + 'locations/';
 let DETAILS_URL = API_URL + 'models';
 let AGENT_URL = API_URL + 'agent';

 const config = { API_URL, PROPS_URL, MENU_URL, RUN_URL, CLEAR_REGISTRY_URL, POPHIST_URL, USER_MSGS_URL, DEBUG_URL, SOURCE_URL, REGISTRY_URL, LOCATION_URL, DETAILS_URL, AGENT_URL };
 
 export default config;
 
