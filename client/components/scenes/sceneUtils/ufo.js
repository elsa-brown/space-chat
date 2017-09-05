// This component controls sphere rendering and animations of Cubes.jsx. 
// Much of this code is based on Three.js' example here:  https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_anaglyph.html

let cubes = []
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
let width = window.innerWidth || 2
let height = window.innerHeight || 2
let mouseX = 0
let mouseY = 0
let currentScale = 0.2
let tickSpeed = 0.00005
let animationId

//Set up orbital camera, mouse listener, and window resize listener. 
function initScene() {
	var camera = document.getElementById('camera')
	camera.setAttribute('fov', 45) //field of view
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight) //aspect
	camera.setAttribute('near', 0.01) //near
	camera.setAttribute('far', 1000) //far
	camera.setAttribute('position', { z: 20 })
	camera.setAttribute('focalLength', 3)

	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false)
}

// Create single cube with specified material and size
const createCube = (images) => {
	let cube = document.createElement('a-box')

	// set cube position - break into helper func
	let x = (Math.random() * 501) - 250
	let y = (Math.random() * 501) - 250
	let z = (Math.random() * 501) - 200
	cube.setAttribute('position', { x: x, y: y, z: z})

	// set cube image - break into helper func
	let i = Math.floor(Math.random() * images.length)
	cube.setAttribute('material', `src: ${images[i]}`)

	// set cube size
	let j = Math.floor((Math.random() * (40 - 2)) + 2)
	cube.setAttribute('depth', j)
	cube.setAttribute('height', j)
	cube.setAttribute('width', j)

	// set cube id
	cubes.push(cube)
	cube.setAttribute('id', cubes.length)

	// add cubeWrapper to scene
	document.querySelector('a-scene').appendChild(cube)
}

// Create random cubes
const makeCubes = (numCubes, images) => {
	let count = numCubes
	while (count >= 0) {
		createCube(images)
		count--
	}
	console.log('making cubes')
}

// make ambient light
const makeLight = () => {

	let light = document.createElement('a-light')

	light.setAttribute('type', 'ambient')
	light.setAttribute('color', `#FFFFFF`)
	light.setAttribute('intensity', 1)
	light.setAttribute('distance', 60)
	light.setAttribute('decay', 12)
	light.setAttribute('id', 'light')

	document.querySelector('a-scene').appendChild(light)

}

// Update ambient light color based on emotion
const updateColor = (color) => {

	let light = document.getElementById('light')

	//light.setAttribute('color', `${color[0]}`)
	light.setAttribute('intensity', `${color[1]}`)

}


// updated speed based on intensity
const updateSpeed = (n) => {
	tickSpeed = n
}

const render = () => {
	let timer = tickSpeed * Date.now() //change number for cube 

  for (var i = 0, il = cubes.length; i < il; i++) {
    var cube = cubes[i];
    cube.setAttribute('rotation', { x: 4 * (timer + i) })
    cube.setAttribute('rotation', { y: 4 * (timer + i * 5) })
  }
}

const animate = () => {
	animationId = requestAnimationFrame(animate)
	render()
}

// stop animating when user leaves scene
const stopAnimating = () => {
	cancelAnimationFrame(animationId)
}

const onWindowResize = () => {
	let camera = document.getElementById('camera')
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.setAttribute('aspect', window.innerWidth / window.innerHeight)
}

const onDocumentMouseMove = (event) => {
	mouseX = (event.clientX - windowHalfX) / 100;
	mouseY = (event.clientY - windowHalfY) / 100;
}

module.exports = { initScene, makeCubes, makeLight, animate, updateColor, updateSpeed, stopAnimating}

