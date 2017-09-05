import React, {Component} from 'react'
import AssetLoader from '../AssetLoader'

import { initScene
        , makeCubes
        , makeLight
        , animate
        , updateLighting
        , updateSpeed
        , stopAnimating
      } from './sceneUtils/ufo.js'

// maps emotion to lighting intensity value
const lightingHash = {
  anger: 3,
  surprise: 4,
  sadness: 0.5,
  fear: 2,
  joy: 1,
}

export default class UFO extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numCubes: 180,
      cubeImages: ['#deer', '#gh', '#roses', '#rainbow', '#blossoms'],
      lighting: 1,
      speed: 1
    }
  }

  componentDidMount() {
    // render VR scene and begin animating
    initScene();
    makeLight();
    makeCubes(this.state.numCubes, this.state.cubeImages);
    animate();
  }

  componentWillReceiveProps() {
    const emotion = this.props.currEmotion;
    const sentiment = this.props.sentimentScore;

    // determine lighting scheme based on emotion
    let nextLightingScheme = lightingHash[emotion]
      , prevLightingScheme = this.state.lighting;
    let lighting = prevLightingScheme !== nextLightingScheme ? nextLightingScheme : prevLightingScheme;

    // determine cube rotation speed based on sentiment (low = slow, high = fast)
    let nextSpeed = (1 - sentiment) / 20
      , prevSpeed = this.state.speed;
    let speed = prevSpeed !== nextSpeed ? nextSpeed : prevSpeed;

    // update local state with new values
    this.setState({ lighting: lighting, speed: speed });

    // render VR scene with new values
    let lightIntensity = this.state.lighting;
    updateLighting(lightIntensity)
    updateSpeed(this.state.speed)

  }

  componentWillUnmount() {
    stopAnimating();
  }

  render() {
    return (
      <a-scene vr-mode-ui="enabled: true" fog="type: exponential; color: yellow; density: 0.00015">
        <AssetLoader />

        {/* Camera */}
        <a-entity id="camera" camera="userHeight: 1.6"look-controls mouse-cursor="">
        </a-entity>

        {/* Skysphere */}
        <a-sky id="#sky" src="#fractal" />
        }
      </a-scene>
    )
  }
}

