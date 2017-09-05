/* ------------------------------------------------
When SceneContainer loads, it:
(0) Renders presentational <Scene /> component
(1) Starts recording and transcribing audio input (thanks to SpeechRecognition API)
(2) Sets transcription language for SpeechRecognition via recognition.lang
(3) Emits a 'join' message to server through socket (via joinChannel())
(4) Sets listeners for 'got sentiment' and 'got message' from server via receiveSentiment() and receiveMessage()
(4) When speech transcription is finalized (/when user pauses), emits 'message' msg to server through socket via sendMesssage()
   - server then processes transcription:
      -- analyzes sentiment, emits 'got sentiment' with sentiment data
      -- translates into target language, emits 'got message' with translated text
(5) Receives sentiment data from server via receiveSentiment()
(6) Receives translated text from server via receiveMessage()

* Props passed from SpeechRecognition are: { transcript, resetTranscript, browserSupportsSpeechRecognition, finalTranscript, recognition }
------------------------------------------------ */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import Bubbles from './scenes/Bubbles.jsx'
import Plasma from './scenes/Plasma.jsx'
import Cosmos from './scenes/Cosmos.jsx'
import UFO from './scenes/UFO.jsx'
import { openSocket, closeSocket, updateRoster
       , joinChannel, sendMessage
       , receiveMessage, receiveSentiment } from '../sockets'

class SceneContainer extends Component {

  componentWillMount() {
    // establish new socket connection to namespace associated with scene
    openSocket(this.props.scene)
    if (!this.props.browserSupportsSpeechRecognition) return null
  }

  componentWillUnmount() {
    console.log('component will unmount')
    // disconnect socket, also leaves channels, unsets listeners
    closeSocket(this.props.language)
  }

  componentDidMount() {
    // broadcast language to server
    joinChannel(this.props.language)
    // set listener to update roster
    updateRoster()
    // set listeners to receive sentiment analyses, translated messages
    receiveSentiment()
    receiveMessage(this.props.language)
  }

  // NB: WebSpeech API waits to finalize text until after a short pause
  componentWillReceiveProps({ transcript, finalTranscript, resetTranscript, recognition }) {
    //set transcription
    recognition.lang = this.props.language
    // emit message with final transcript, and reset transcript
    if (transcript === finalTranscript && finalTranscript) {
      sendMessage(finalTranscript, this.props.language)
      resetTranscript()
    }
  }

  // when the scene renders, API will start recording
  render() {
    const sentiment = this.props.sentiment
    const scene = this.props.scene
    // emotion data
    let currEmotion = sentiment.primaryEmotion[0] || 'joy' 
    let primaryIntensity = sentiment.primaryIntensity[0] || 0.5

    // personality data
    let primaryPersonality = sentiment.primaryPersonality[0] || 'default'
    // sentiment score
    let sentimentScore = sentiment.sentimentScore[0] || 0.5

    // speaker for above data - if using Avatars
    let speaker = sentiment.speaker

    // scene
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
        sceneComponent = <UFO roster={this.props.roster} 
          currEmotion={currEmotion} sentimentScore={sentimentScore} />
        break
    }

    console.log('emotions in Room are', currEmotion)

    return (
      <div id="sceneComponent" >
        {sceneComponent}
      </div>
    )
  }
}

const mapState = ({language, sentiment, scene, roster}) => ({language, sentiment, scene, roster})

export default connect(mapState, null)(SceneContainer);

