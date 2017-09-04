// This component loads assets and mixins, so that they can be called by other components without needing to continually re-render and interrupting the scene.

import React from 'react'

export default function AssetLoader() {
	return (
		<a-assets timeout="3000">

			{/* Bubbles */}
			<img id="blossoms" src="/images/bubbles/blossoms.jpg" />

			{/* Plasma */}
			<img id="tiedye" src="/images/plasma/tiedye.jpg" />

			{/* Cosmos */}
			<img id="moon" src="/images/cosmos/moon.jpg" />
			<img id="planet0" src="/images/cosmos/gold-lava-texture.jpg" />
			<img id="planet1" src="/images/cosmos/planet-texture-1.jpg" />
			<img id="planet2" src="/images/cosmos/planet-texture-2.jpg" />
			<img id="planet3" src="/images/cosmos/planet-texture-3.jpg" />
			<img id="planet4" src="/images/cosmos/planet-texture-4.jpg" />
			<img id="planet5" src="/images/cosmos/planet-texture-5.jpg" />
			<img id="planet6" src="/images/cosmos/planet-texture-6.png" />
			<img id="gold-sparkle" src="/images/cosmos/gold-sparkles-texture.jpg" />
			<img id="star-particle" src="/images/cosmos/star-particle.png" />
			<img id="starrySky" src="/images/cosmos/sky-stars.png" />

			{/* UFO */}
			<img id="fractal" src="/images/ufo/fractal.jpg" />
			<img id="deer" src="/images/ufo/deer.png" />
			<img id="gh" src="/images/ufo/gh.png" />
			<img id="roses" src="/images/ufo/roses.png" />
			<img id="rainbow" src="/images/ufo/rainbow.png" />

		</a-assets>
	)
}
