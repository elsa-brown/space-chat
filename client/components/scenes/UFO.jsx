import React, {Component} from 'react'
import AssetLoader from '../AssetLoader'

import { initScene, makeCubes, makeLight, animate, updateColor, updateSpeed, stopAnimating } from './ufo.js'


export default class UFO extends Component {

  constructor(props) {
    super()

    this.state = {
      numCubes: 180,
      cubeImages: ['#deer', '#gh', '#roses', '#rainbow', '#blossoms'],
      color: ['#FFFFFF', 1], // will update based on primary emotion
      speed: 1, // will update based on sentiment analysis
    }
  }

  componentDidMount() {
    initScene()
    makeLight()
    makeCubes(this.state.numCubes, this.state.cubeImages)
    animate()
  }

  componentWillReceiveProps() {

    let emotionColors = {
      anger: ['#FF3333', 3],
      surprise: ['#ffffcc', 4],
      sadness: ['#0066ff', 0.5],
      fear: ['#99CC00', 2],
      joy: ['#FFFFFF', 1],
    }

    //compare current colors/emotion
    let currentColor = this.state.color
    let currentSpeed = this.state.speed

    let emotion = this.props.currEmotion
    let sentiment = this.props.sentimentScore
    
    let nextSpeed = (1 - sentiment) / 20 

    let color = currentColor !== emotionColors[emotion] ? emotionColors[emotion] : currentColor

    let speed = currentSpeed !== nextSpeed ? nextSpeed : currentSpeed
    console.log('speed is', speed)

    this.setState({ color: color, speed: speed })

    updateColor(this.state.color, this.state.intensity)
    updateSpeed(this.state.speed)

  }

  componentWillUnmount() {
    stopAnimating()
  }

  render() {
    return (
      <a-scene vr-mode-ui="enabled: true" fog="type: exponential; color: yellow; density: 0.00015">
        <AssetLoader />

        {/* Camera */}
        <a-entity id="camera" camera="userHeight: 1.6" look-controls mouse-cursor="">
      </a-entity>

        <a-sky id="#sky" src="#fractal" />
      </a-scene>
    )
  }
}

