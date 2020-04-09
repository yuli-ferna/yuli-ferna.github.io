//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json


//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');

//controles orbitales
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//controles por teclado
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
const canvas = document.getElementById('canvas');

function main() {
//	const canvas = document.querySelector('#c');

	var obj = {
		message: 'Hello World',
		displayOutline: false,

		maxSize: 6.0,
		speed: 5,

		height: 10,
		noiseStrength: 10.2,
		growthSpeed: 0.2,

		type: 'three',

		explode: function () {
		alert('Bang!');
		},

		posX: 10, 
		posY: 50, 
		posZ: 100,
		colorL: [ 0, 128, 255 ], // RGB array
		
		color0: "#ffae23", // CSS string
		color1: [ 0, 128, 255 ], // RGB array
		color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
		color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
	};

	var gui = new dat.gui.GUI();

	gui.remember(obj);

	gui.add(obj, 'message');
	gui.add(obj, 'displayOutline');
	gui.add(obj, 'explode');

	gui.add(obj, 'maxSize').min(-10).max(10).step(0.25);
	gui.add(obj, 'height').step(5); // Increment amount

	// Choose from accepted values
	gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

	// Choose from named values
	gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
	
	var f1 = gui.addFolder('SpotLight');
	f1.add(obj, 'posX');
	f1.add(obj, 'posY');
	f1.add(obj, 'posZ');
	f1.addColor(obj, 'colorL');

	var f1 = gui.addFolder('Colors');
	f1.addColor(obj, 'color0');
	f1.addColor(obj, 'color1');
	f1.addColor(obj, 'color2');
	f1.addColor(obj, 'color3');

	var f2 = gui.addFolder('Another Folder');
	f2.add(obj, 'noiseStrength');

	var f3 = f2.addFolder('Nested Folder');
	f3.add(obj, 'growthSpeed');

	const renderer = new THREE.WebGLRenderer({canvas});
	renderer.setClearColor(0x000000);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	
	const fov = 45;
	const aspect =  window.innerWidth/ window.innerHeight;  // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	//camera.position.z = 2;
	const scene = new THREE.Scene();
	camera.position.x = 40;
	camera.position.y = 40;
	camera.position.z = 40;
	camera.lookAt(scene.position);
	//SpotLight
	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.castShadow = true;            // default false

	spotLight.position.set( 10, 50, 100 );

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );
	
	//Cube
	const boxWidth = 5;
	const boxHeight = 5;
	const boxDepth = 5;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )

	const cube = new THREE.Mesh(geometry, material);
	cube.castShadow = true; //default is false
	cube.receiveShadow = false; //default	
	cube.position.z = 10;

	scene.add(cube);

	//Create a plane that receives shadows (but does not cast them)
	var planeGeometry = new THREE.PlaneBufferGeometry( 20, 20, 32, 32 );
	var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
	var plane = new THREE.Mesh( planeGeometry, planeMaterial );
	plane.receiveShadow = true;
	scene.add( plane );

	//Create a sphere that cast shadows (but does not receive them)
	var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
	var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
	var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	sphere.castShadow = true; //default is false
	sphere.receiveShadow = false; //default
	scene.add( sphere );
	function render(time) {
	  	time *= 0.001;  // convert time to seconds
		spotLight.position.x = obj.posX;
		spotLight.position.y = obj.posY;
		spotLight.position.z = obj.posZ;
	
		// cube.rotation.x = time;
		// cube.rotation.y = time;

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);

}

main();
