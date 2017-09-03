// This component loads assets and mixins, so that they can be called by other components without needing to continually re-render and interrupting the scene.

import React from 'react'

export default function AssetLoader() {
	return (
		//Set timeout for scene to run even if all assets are not fully loaded. Default time is 3 seconds.
		<a-assets timeout="3000">

			{/* Sky assets */}
			<img id="blossoms" src="/images/blossoms.jpg" />
			<img id="starrySky" src="/images/sky-stars.png" />
			<img id="fractal" src="/images/fractal.jpg" />
			<img id="deer" src="/images/deer.png" />
			<img id="gh" src="/images/gh.png" />
			<img id="roses" src="/images/roses.png" />
			<img id="rainbow" src="/images/rainbow.png" />
			<img id="tiedye" src="/images/tiedye.jpg" />
			<img id="colors" src="/images/colors.jpg" />
			<img id="krabi" src="/images/krabi.jpg" />

			{/* space scene */}
			<img id="moon" src="/images/moon.jpg" />
			<img id="planet0" src="/images/gold-lava-texture.jpg" />
			<img id="planet1" src="/images/planet-texture-1.jpg" />
			<img id="planet2" src="/images/planet-texture-2.jpg" />
			<img id="planet3" src="/images/planet-texture-3.jpg" />
			<img id="planet4" src="/images/planet-texture-4.jpg" />
			<img id="planet5" src="/images/planet-texture-5.jpg" />
			<img id="planet6" src="/images/planet-texture-6.png" />
			<img id="gold-sparkle" src="/images/gold-sparkles-texture.jpg" />
			<img id="star-particle" src="/images/star-particle.png" />

		</a-assets>
	)
}

//credit for #colors: 
// photo credit: Rantz <a href="http://www.flickr.com/photos/99804259@N00/33003256230">Susan's World</a> via <a href="http://photopin.com">photopin</a> <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/">(license)</a>

//credit for #krabi
//photo credit: Sitoo <a href="http://www.flickr.com/photos/7470842@N04/32252838043">A window to Krabi (made of limestone)</a> via <a href="http://photopin.com">photopin</a> <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">(license)</a>
