//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json


//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');

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

		//spotlight
		posX: -0.6, 
		posY: 20, 
		posZ: 42,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
		intensity:1,
		
		color0: "#000000", // CSS string
		colorg: "#23ae23", // CSS string
	};

	var gui = new dat.gui.GUI();

	// gui.remember(obj);

	// gui.add(obj, 'message');
	// gui.add(obj, 'displayOutline');
	// gui.add(obj, 'explode');

	// gui.add(obj, 'height').step(5); // Increment amount

	// // Choose from accepted values
	// gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

	// // Choose from named values
	// gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
	
	
	// f1.addColor(obj, 'color1');
	// f1.addColor(obj, 'color2');
	// f1.addColor(obj, 'color3');

	// var f2 = gui.addFolder('Another Folder');
	// f2.add(obj, 'noiseStrength');

	// var f3 = f2.addFolder('Nested Folder');
	// f3.add(obj, 'growthSpeed');

	const renderer = new THREE.WebGLRenderer({canvas});
	renderer.setClearColor(0x222222);
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


	// var controls = new OrbitControls( camera, renderer.domElement );
	// controls.addEventListener( 'change', render );
	// controls.minDistance = 20;
	// controls.maxDistance = 500;
	// controls.enablePan = false;

	//SpotLight
	var spotLight = new THREE.SpotLight( 0xffff00 );
	spotLight.castShadow = true;            // default false

	spotLight.position.set( obj.posX, obj.posY, obj.posZ );

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 1000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );
	var spotLightHelper = new THREE.SpotLightHelper( spotLight );
	//scene.add( spotLightHelper );

	//Ambient light
	var light = new THREE.AmbientLight( obj.color0 ); // soft white light
	scene.add( light );

	//Hemisphere light
	var hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );
	scene.add( hemisLight );
	var light1, light2, light3, light4;
	//Point lights
	light1 = new THREE.PointLight( 0xff0040, 2, 50 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
	scene.add( light2 );

	light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
	light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
	scene.add( light3 );

	light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
	light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
	scene.add( light4 );

	//Cube
	const boxWidth = 5;
	const boxHeight = 5;
	const boxDepth = 5;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
	//const geometryTourus = new THREE.TourusGeometry(boxWidth, boxHeight, boxDepth);

	const material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } )

	const cube = new THREE.Mesh(geometry, material);
	cube.castShadow = true; //default is false
	cube.receiveShadow = false; //default	
	cube.position.z = 5;

	//scene.add(cube);
	
	//Create a sphere that cast shadows (but does not receive them)
	var sphereGeometry = new THREE.SphereBufferGeometry( 5, 12, 12 );
	var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );
	var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	sphere.castShadow = true; //default is false
	sphere.receiveShadow = false; //default	
	
	sphere.position.x = 10;
	sphere.position.y = 5;
	sphere.position.z = 5;
	
	scene.add( sphere );
	var geometryT = new THREE.TorusKnotBufferGeometry( 5, 3, 100, 16 );
	var materialT = new THREE.MeshPhongMaterial( { color: 0x79c4ed } );
	var torusKnot = new THREE.Mesh( geometryT, materialT );
	torusKnot.castShadow = true; //default is false
	torusKnot.receiveShadow = false; //default	
	torusKnot.position.x = -10;
	torusKnot.position.y = 5;
	torusKnot.position.z = 5;
	scene.add( torusKnot );
	
	//Create a plane that receives shadows (but does not cast them)
	var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 32, 32 );
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x444444 } )
	var plane = new THREE.Mesh( planeGeometry, planeMaterial );
	plane.receiveShadow = true;
	plane.position.y = -5;
	plane.rotation.x = -0.5 * Math.PI;
	scene.add( plane );
	
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );


	var f1 = gui.addFolder('SpotLight');
	f1.add(obj, 'posX').onChange(function (val) {
		spotLight.position.x = val;
	});
	f1.add(obj, 'posY').onChange(function (val) {
		spotLight.position.y = val;
	});
	f1.add(obj, 'posZ').onChange(function (val) {
		spotLight.position.z = val;
	});
	f1.addColor(obj, 'colorL').onChange(function (val) {
		spotLight.color.set(val);
	});
	f1.add(obj, 'penunmbra').min(0).max(1).step(0.1).onChange(function (val) {
		spotLight.penunmbra = val;
	});
	f1.add(obj, 'intensity').min(0).max(1).step(0.1).onChange(function (val) {
		spotLight.intensity = val;
	});

	var f2 = gui.addFolder('AmbientLight');
	f2.addColor(obj, 'color0').onChange(function (val) {
		light.color.set(val);
		hemisLight.color.set(val);
	});

	var f3 = gui.addFolder('HemisphereLight');
	f3.addColor(obj, 'colorg').onChange(function (val) {
		hemisLight.groundColor.set(val);
	});
	// controls.target.copy( plane.position );
	// controls.update();
	function displayWindowSize(){
        // Get width and height of the window excluding scrollbars
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        
		// Display result inside a div element
		console.log("Width: " + w + ", " + "Height: " + h);
		renderer.setSize(w, h);
		// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
    }
    
    // Attaching the event listener function to window's resize event
	window.addEventListener("resize", displayWindowSize);
	
	function render(time) {
		stats.begin();
			time *= 0.001;  // convert time to seconds
			light1.position.x = Math.sin( time * 0.7 ) * 30;
			light1.position.y = Math.cos( time * 0.5 ) * 40;
			light1.position.z = Math.cos( time * 0.3 ) * 30;

			light2.position.x = Math.cos( time * 0.3 ) * 30;
			light2.position.y = Math.sin( time * 0.5 ) * 40;
			light2.position.z = Math.sin( time * 0.7 ) * 30;

			light3.position.x = Math.sin( time * 0.7 ) * 30;
			light3.position.y = Math.cos( time * 0.3 ) * 40;
			light3.position.z = Math.sin( time * 0.5 ) * 30;

			light4.position.x = Math.sin( time * 0.3 ) * 30;
			light4.position.y = Math.cos( time * 0.7 ) * 40;
			light4.position.z = Math.sin( time * 0.5 ) * 30;


			renderer.render(scene, camera);
		stats.end();


		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);

}

main();
