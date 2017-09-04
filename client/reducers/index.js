import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  language: require('./languageReducer').default,
  sentiment: require('./sentimentReducer').default,
  scene: require('./sceneReducer').default,
  roster: require('./rosterReducer').default
});

export default rootReducer;
