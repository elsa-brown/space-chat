import React from 'react';

import Bubbles from './scenes/Bubbles.jsx';
import Plasma from './scenes/Plasma.jsx';
import Cosmos from './scenes/Cosmos.jsx';
import UFO from './scenes/UFO.jsx';

const Scene = (props) => {
	console.log('in Scene ', props)

	let scene = props.scene;
	let sentiment = props.sentiment;

	// emotion data
  let currEmotion = sentiment.primaryEmotion[0] || 'joy' 
  let primaryIntensity = sentiment.primaryIntensity[0] || 0.5

  // personality data
  let primaryPersonality = sentiment.primaryPersonality[0] || 'default'
  // sentiment score
  let sentimentScore = sentiment.sentimentScore[0] || 0.5

  // speaker for above data - for Avatars
  // let speaker = sentiment.speaker

  // scene
  // let scene = this.props.scene
  let sceneComponent

    switch (scene) {
      case 'bubbles':
        sceneComponent = <Bubbles currEmotion={currEmotion} primaryPersonality={primaryPersonality} />
        break
      case 'plasma':
        sceneComponent = <Plasma currEmotion={currEmotion} primaryPersonality={primaryPersonality} primaryIntensity={primaryIntensity} />
        break
      case 'cosmos':
        sceneComponent = <Cosmos currEmotion={currEmotion} primaryPersonality={primaryPersonality} />
        break
      case 'ufo':
        sceneComponent = <UFO currEmotion={currEmotion} sentimentScore={sentimentScore} />
        break
    }

    console.log('emotions in Room are', currEmotion)

  return (
    <div id="sceneComponent" >
      {sceneComponent}
    </div>
  )
}

export default Scene;
