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
import { LightShadow } from 'three';
import CameraControls from 'camera-controls';
 
CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 
//Scene and render
var renderer, scene, camera, cameraControls;
var controls;

//Lights
var spotLight, light, hemisLight;
var light1, light2, light3, light4;
var spotLightHelper, pLightHelper1, pLightHelper2, pLightHelper3, pLightHelper4;

//Interface
var gui;
var obj;
var stats;

//Models
var sphere;
var torusKnot;
var plane;

//movement speed variable
let speedMovement = 300;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

function init() 
{
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: -0.6, 
		posY: 20, 
		posZ: 42,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
		helpSpot:true,
		intSpot:1,
	
		
		intPoint1: 1,
		intPoint2: 1,
		intPoint3: 1,
		intPoint4: 1,
		helpPoint1:false,
		helpPoint2:false,
		helpPoint3:false,
		helpPoint4:false,
		
		intAmbien:1,
		color0: "#000000", 
		intHemis:1,
		colorg: "#23ae23", 
	};
	
	renderer = new THREE.WebGLRenderer({ canvas });
	scene = new THREE.Scene();
	const fov = 45;
	const aspect =  window.innerWidth/ window.innerHeight;  // the canvas default
	const near = 0.1;
	const far = 500;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	// controls = new OrbitControls( camera, renderer.domElement );
	cameraControls = new CameraControls( camera, renderer.domElement );
	cameraControls.setLookAt( 40, 40, 40, 0.0001, 2, 0, false );
	cameraControls.maxDistance = 0.0001;
	cameraControls.minDistance = 0;
	cameraControls.truckSpeed = 2.0;

	//Lights
	spotLight = new THREE.SpotLight( 0xffff00 );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );
	
	//Models in scene
	
	//Create a sphere that cast shadows (but does not receive them)
	var sphereGeometry = new THREE.SphereBufferGeometry( 5, 12, 12 );
	var sphereMaterial = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );
	sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	
	//Create a torusKnot that cast shadows (but does not receive them)
	var geometryT = new THREE.TorusKnotBufferGeometry( 5, 3, 100, 16 );
	// var materialT = new THREE.MeshPhongMaterial( { color: 0x79c4ed } );
	torusKnot = new THREE.Mesh( geometryT, sphereMaterial );
	
	//Create a plane that receives shadows (but does not cast them)
	var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 32, 32 );
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x444444 } )
	plane = new THREE.Mesh( planeGeometry, planeMaterial );

	stats = new Stats();
}

function addLights() 
{
	//SpotLight
	spotLight.castShadow = true;
	spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	//Shadow spotlight
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 1000;
	spotLight.shadow.camera.fov = 30;

	scene.add( spotLight );
	//Helper
	scene.add( spotLightHelper );
	
	//Ambient light
	scene.add( light );
	
	//Hemisphere light
	scene.add( hemisLight );
	
	//Point lights
	var sphereL = new THREE.SphereBufferGeometry( 0.5, 16, 8 );
	
	light1 = new THREE.PointLight( 0xff0040, 2, 50 );
	light1.add( new THREE.Mesh( sphereL, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
	scene.add( light1 );
	
	pLightHelper1 = new THREE.PointLightHelper( light1 );
	pLightHelper1.visible = false;
	scene.add( pLightHelper1 );
	
	light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
	light2.add( new THREE.Mesh( sphereL, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
	scene.add( light2 );
	pLightHelper2 = new THREE.PointLightHelper( light2 );
	pLightHelper2.visible = false;
	scene.add( pLightHelper2 );
	
	light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
	light3.add( new THREE.Mesh( sphereL, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
	scene.add( light3 );
	pLightHelper3 = new THREE.PointLightHelper( light3 );
	pLightHelper3.visible = false;
	scene.add( pLightHelper3 );
	
	light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
	light4.add( new THREE.Mesh( sphereL, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
	scene.add( light4 );
	pLightHelper4 = new THREE.PointLightHelper( light4 );
	pLightHelper4.visible = false;
	scene.add( pLightHelper4 );

}

function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	//Spotlight
	var guiSL = gui.addFolder('SpotLight');
	guiSL.add(obj, 'helpSpot').onChange(function (val) {
		spotLightHelper.visible = val;
	});
	guiSL.add(obj, 'posX').onChange(function (val) {
		spotLight.position.x = val;
	});
	guiSL.add(obj, 'posY').onChange(function (val) {
		spotLight.position.y = val;
	});
	guiSL.add(obj, 'posZ').onChange(function (val) {
		spotLight.position.z = val;
	});
	guiSL.addColor(obj, 'colorL').onChange(function (val) {
		spotLight.color.set(val);
	});
	guiSL.add(obj, 'penunmbra').min(0).max(1).step(0.1).onChange(function (val) {
		spotLight.penunmbra = val;
	});
	guiSL.add(obj, 'intSpot').min(0).max(1).step(0.1).onChange(function (val) {
		spotLight.intensity = val;
	}).name('Intensity');

	//Ambient Light
	var guiAL = gui.addFolder('AmbientLight');
	guiAL.addColor(obj, 'color0').onChange(function (val) {
		light.color.set(val);
		hemisLight.color.set(val);
	});
	guiAL.add(obj, 'intAmbien').min(0).max(1).step(0.1).onChange(function (val) {
		light.intensity = val;
	}).name('Intensity');

	//Hemisphere Light
	var guiHL = gui.addFolder('HemisphereLight');
	guiHL.addColor(obj, 'colorg').onChange(function (val) {
		hemisLight.groundColor.set(val);
	});
	guiHL.add(obj, 'intHemis').min(0).max(1).step(0.1).onChange(function (val) {
		hemisLight.intensity = val;
	}).name('Intensity');

	//Point Lights
	var guiPL = gui.addFolder('PointLights');

	// Light 1
	guiPL.add(obj, 'intPoint1').min(0).max(1).step(0.1).onChange(function (val) {
		light1.intensity = val;
	}).name('Intensity point 1');
	guiPL.add(obj, 'helpPoint1').onChange(function (val) {
		pLightHelper1.visible = val;
	}).name('Helper light 1');

	// Light 2
	guiPL.add(obj, 'intPoint2').min(0).max(1).step(0.1).onChange(function (val) {
		light2.intensity = val;
	}).name('Intensity point 2');
	guiPL.add(obj, 'helpPoint2').onChange(function (val) {
		pLightHelper2.visible = val;
	}).name('Helper light 2');
	
	// Light 3
	guiPL.add(obj, 'intPoint3').min(0).max(1).step(0.1).onChange(function (val) {
		light3.intensity = val;
	}).name('Intensity point 3');
	guiPL.add(obj, 'helpPoint3').onChange(function (val) {
		pLightHelper3.visible = val;
	}).name('Helper light 3');
	
	// Light 4
	guiPL.add(obj, 'intPoint4').min(0).max(1).step(0.1).onChange(function (val) {
		light4.intensity = val;
	}).name('Intensity point 4');
	guiPL.add(obj, 'helpPoint4').onChange(function (val) {
		pLightHelper4.visible = val;
	}).name('Helper light 4');
	
}

//Move the camera according to a direction, and speed received as parameter event received
//the delta factor will divide the movement speed by 100 but will make it feel smoother to the controler
function movement(direction, speed){
	let delta = clock.getDelta()
	let moveZ = Number(moveForward) -Number(moveBackward);
	let moveX = Number(moveRight) - Number(moveLeft);

	if (moveForward || moveBackward) {
		cameraControls.forward(speed*delta*moveZ,true);
	}
	if (moveLeft || moveRight) {
		cameraControls.truck(speed*delta*moveX,0,true);
	}

	// if(!audioPlaying(greenSphere)){
	// 	(colisionDetector(cameraControls, greenSphere)) ? audioManager.startAudio(greenSphere) : false;
	// }
}
function main() {
	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	
	//Camera
	camera.position.x = 40;
	camera.position.y = 40;
	camera.position.z = 40;
	camera.lookAt(scene.position);

	//Orbit controls
	// controls.addEventListener( 'change', render );
	// controls.minDistance = 20;
	// controls.maxDistance = 500;
	// controls.enablePan = false;

	addLights();

	//Models in scene
	sphere.castShadow = true; //default is false
	sphere.receiveShadow = false; //default	
	
	sphere.position.x = 10;
	sphere.position.y = 5;
	sphere.position.z = 5;
	scene.add( sphere );
	
	plane.receiveShadow = true;
	plane.position.y = -5;
	plane.rotation.x = -0.5 * Math.PI;
	scene.add( plane );
	
	torusKnot.castShadow = true; //default is false
	torusKnot.receiveShadow = false; //default	
	torusKnot.position.x = -10;
	torusKnot.position.y = 5;
	torusKnot.position.z = 5;
	scene.add( torusKnot );
	

	addGUI();
	// controls.target.copy( plane.position );
	// controls.update();
	
}
//Event function when a key is pressed
let onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			movement(moveForward, speedMovement);
			break;
		case 37: // left
		case 65: // a
			moveLeft = true;
			movement(moveLeft, speedMovement);
			break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			movement(moveBackward, speedMovement);
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			movement(moveRight, speedMovement);
			break;
		case 70: //F
			audioManager.startAudio(redSphere);
			break;
		case 67:
		if(mediaRecorder == null) {
			catchMicrophone(blueSphere);
		}else {
			blueSphere.getObjectByName('audio').setVolume(10);
		} 

			break;
		}

};
//event function that works when a key is released
let onKeyUp = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
		case 67:
			blueSphere.getObjectByName('audio').setVolume(0);
			break;
		}
};
//event function on click
//this create all the sounds elements
const clicker = function(event){
	principal.style.display = 'none';
	canvas.style.display = 'block';
}


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
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

function animate() 
{
	const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );
	requestAnimationFrame(animate);
	render();
	// controls.update();
	stats.update();	
	// if ( hasControlsUpdated ) {
 
    //     renderer.render( scene, camera );
 
    // }
	renderer.render(scene, camera);
}

function render() 
{
	var time = Date.now() * 0.001;  
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
	
}

init();
main();
animate();