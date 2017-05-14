import React, { Component } from 'react'
import Avatar from './Avatar'
import AssetLoader from './AssetLoader'


/*const animate = (skyColor, prevSkyColor) => {
  if (skyColor !== prevSkyColor) {
    return (
     <a-animation
        begin="sentiment-change"
        attribute="material.color"
        from={prevSkyColor}
        to={skyColor}
        ease="ease-in-circ" />
    )
  }
}*/

const Scene = (props) => {

  // get primary emotion from props, convert it to color for sky animation 
  let emotionColors = {
    anger: '#FF0000',     // red
    surprise: '#FF8300',  // orange
    sadness: '#20A7D2',   // blue
    fear: '#494850',      // dark grey
    joy: '#FBFF00'        // yellow
  }

  let skyColor = emotionColors[props.currEmotion]
  let prevSkyColor = emotionColors[props.prevEmotion]

  console.log('skyColor is', skyColor, 'prevSkyColor is', prevSkyColor)

  console.log("PROPS IN SCENE", props)
  return (
    <div>
      <a-scene>
        <AssetLoader />
        <Avatar position="-1.5 1 -4" />
        <a-sphere id="avatar" position="-1 1.25 -5" radius="1.75" material="src: #blossoms" color="white" />
        <a-light color="red" angle="45" position="-1 1 0" type="spot" target="avatar" />

        <a-sky
          id="sky"
          src="#stars"
          color={skyColor} >
        </a-sky>

      </a-scene>
    </div>
  )
}

export default Scene

