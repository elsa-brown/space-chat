export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = (language) => {
  return {
    type: SET_LANGUAGE,
    language: language
  }
};

const languageReducer = (state = [], action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.language
    default: return state
  }
};

export default languageReducer;

