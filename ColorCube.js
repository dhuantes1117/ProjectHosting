import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from 'three/examples/jsm/OrbitControls';
//import {OrbitControls} from "./three/examples/jsm/controls.OrbitControls.js";
var loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");
const scene = new THREE.Scene();
// THREE.PerspectiveCamera(field of view, aspect ratio, near
// clipping plane, far clipping plane) only objects within
// clipping planes will be rendered, others will be 'clipped'
/*
let raycaster;
let INTERSECTED;
const mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
document.addEventListener('click', onDocumentMouseClick, false)
window.addEventListener( 'resize', onWindowResize, false );
function onDocumentMouseMove( event ) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = (event.clientY / window.innerHeight) * 2 - 1
}
*/
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 2 / 3, window.innerHeight * 2 / 3);// for intensive problems you can give smaller values
document.getElementById('colorcube').appendChild( renderer.domElement );
//document.body.appendChild( renderer.domElement );//<canvas> element

const x_locations = [];
const y_locations = [];
const z_locations = [];
const geometries = [];
const spheres = [];
const finalSpheres = [];
var i;
var j;
var k;
//include variable range and density
for(i = -5; i < 6; i++) {
  for(j = -5; j < 6; j++) {
    for(k = -5; k < 6; k++) {
      var r = ~~((i + 5) * 255 / 10);
      var g = ~~((j + 5) * 255 / 10);
      var b = ~~((k + 5) * 255 / 10);
      var c = "rgb(" + r + ", " + g + ", " + b + ")";
      x_locations.push(r);
      y_locations.push(g);
      z_locations.push(b);
//      var testsphereGeom = new THREE.SphereGeometry( 1, 32, 32 );
      geometries.push(new THREE.MeshBasicMaterial( {color: c} ));
      spheres.push(new THREE.SphereBufferGeometry(0.4, 20, 20));
    }
  }
}
for(i = 0; i < geometries.length; i++){
  finalSpheres.push(new THREE.Mesh(spheres[i], geometries[i]));
}
const group = new THREE.Group();

var w = 0;
for(i = -5; i < 6; i++) {
  for(j = -5; j < 6; j++) {
    for(k = -5; k < 6; k++) {
      //see if we can handle this logic with python... generate colors and feed in grids/files as values
      finalSpheres[w].translateX(i * 2);
      finalSpheres[w].translateY(j * 2);
      finalSpheres[w].translateZ(k * 2);
      group.add(finalSpheres[w]);
      w += 1;
    }
  }
}
scene.add(group);

camera.position.z = 55;
camera.position.x = 0;
camera.position.y = 0;

//const Mod = THREE.OrbitControls;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.screenSpaceFactor = false;

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  //const intersects = raycaster.instersectObjects( scene.children );
  //replace with drag and drop values
//  group.rotation.x += 0.01;
//  group.rotation.y += 0.008;
//  group.rotation.z += 0.007;
}

animate();
