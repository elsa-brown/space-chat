export const LANGUAGE_SET = 'LANGUAGE_SET';

export const setLanguage = (language) => {
  return {
    type: LANGUAGE_SET,
    language: language
  }
};

const languageReducer = (state = [], action) => {
  switch (action.type) {
    case LANGUAGE_SET:
      return action.language
    default: return state
  }
};

export default languageReducer;

