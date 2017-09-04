const SET_SCENE = 'SET_SCENE';

export const setScene = (scene) => {
	console.log('inside setScene. scene is ', scene)
  return {
    type: SET_SCENE,
    scene: scene
  }
}

const sceneReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCENE:
      return action.scene;
    default:
			return state;
  }
}

export default sceneReducer;

