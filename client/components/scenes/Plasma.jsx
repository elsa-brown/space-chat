import React, { Component } from 'react';
import AssetLoader from '../AssetLoader';
// import Avatars from '../Avatars';
import { vecToStr } from '../utils';

import { initScene, makeKnots, animate, stopAnimating
	   , setAmbientLightA, setAmbientLightB
	   , makeRotatingLightX, makeRotatingLightY
	   , updateKnotColor, updateLightColor, updatePath } from './sceneUtils/plasma.js';

// const Avatar = (props) => {
// 	return (
// 		<a-entity position={vecToStr(props.position)}>
// 			<a-torus id="avatar" radius="1" opacity="0.6" metalness="1" spherical-env-map="#tiedye" />
// 		</a-entity>
// 	)
// }

// maps emotion to color
const paletteHash = {
	anger: ['#FF0000', '#FF6600', '#FF0000', '#FF6600'], 		// red, orange, red, orange
	surprise: ['#FFCC00', '#FFCC66', '#FF6600', '#FF66FF'], // pink, peach, pink, pink
	sadness: ['#3366FF', '#003366', '#00CC00', '#330000'], 	// blue, dark blue, green, brown
	fear: ['#333300', '#666633', '#330000', '#330000'], 		// dark ray, olive green, brown, brown
	joy: ['#FFFA00', '#FFFFFF', '#FFFF00', '#FFFFFF'] 			// yellow, white, gold, white
};

// maps personality traits to movement paths
const movementHash = {
  extraversion: 'trig',
  conscientiousness: 'coolness',
  openness: 'circleZ',
  agreeableness: 'pendulum'
};

export default class Plasma extends Component {

	constructor(props) {
		super(props)
		this.state = {
			numKnots: 60,
			palette: ['#FFFA00', '#FFFFFF', '#FFFF00', '#FFFFFF'], 
			rate: 0.00005,
			path: 'trig'
		}
	}

	componentDidMount() {
		initScene();
		makeKnots(this.state.numKnots);
		setAmbientLightA(this.state.palette[0]);
		setAmbientLightB(this.state.palette[1]);
		makeRotatingLightX();
		makeRotatingLightY();
		animate();
	}

	componentWillReceiveProps() {
		const emotion = this.props.currEmotion;
		const personality = this.props.primaryPersonality;
		const intensity = this.props.primaryIntensity || 0.5;

		// determine color palette based on emotion
		let nextPalette = paletteHash[emotion];
		let prevPalette = this.state.palette;
		let palette = prevPalette !== nextPalette ? nextPalette : prevPalette;

		// determine movement based on dominant personality
		let nextPath = movementHash[personality];
		let prevPath = this.state.path;
		let path = prevPath !== nextPath ? nextPath : prevPath;

		// determine movement rate based on emotional intensity
		let prevRate = this.state.rate;
		let nextRate = (1 - intensity) / 25000 + 0.0003;
		let rate = prevRate !== nextRate ? nextRate : prevRate;

		// update local state with new values
		this.setState({
			palette: palette,
			rate: rate,
			path: path
		});

		// render VR scene and animations with new values
		let newPalette = this.state.palette;
		updateKnotColor(newPalette[0], newPalette[1]);
		updateLightColor(newPalette[2], newPalette[3]);
		updatePath(this.state.path);
  }

	componentWillUnmount() {
    stopAnimating();
  }

	render() {
		// let roster = {
		//     a: {},
		//     b: {},
		//     c: {},
		//     d: {},
		//     e: {},
		//     f: {},
		// }

		return (
			<a-scene fog="type: exponential; color: purple">
				<AssetLoader />
				{/* <Avatars Avatar={Avatar} roster={roster} /> */}

				{/* Camera */}
				<a-entity id="camera" position="0 0 -10" mouse-cursor="">
					<a-camera fov="45" user-height="0" />
				</a-entity>

				{/* Skysphere */}
				<a-sky id="sky" src="#tiedye" />

			</a-scene>
	  )
	}
}

