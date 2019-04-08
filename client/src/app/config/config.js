import Immutable from 'utils/immutable/Immutable';

/**
 * @const {Map} CONFIG - map that contains the application configuration parameters
 */
const CONFIG: Object = Immutable({
    API_ENTRY_POINT: window.location.origin || '',
});

export default CONFIG;
