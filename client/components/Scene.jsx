import React from 'react';

import Bubbles from './scenes/Bubbles';
import Plasma from './scenes/Plasma';
import Cosmos from './scenes/Cosmos';
import UFO from './scenes/UFO';

const Scene = (props) => {
	console.log('in Scene ', props)

	let sentiment = props.sentiment;
	let scene = props.scene;

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