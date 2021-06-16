import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';



var loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

let raycaster;
let INTERSECTED;
let theta = 0;
const pointer = new THREE.Vector2();
let prevColor;

renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);// for intensive problems you can give smaller values
document.getElementById('colorcube').appendChild( renderer.domElement );
//document.body.appendChild( renderer.domElement );//<canvas> element

const x_locations = [];
const y_locations = [];
const z_locations = [];
const geometries = [];
const spheres = [];
const finalSpheres = [];
const group = new THREE.Group();
var i, j, k;
var x, y, z;
var r, g, b;
var c;
var n = 11;
var w = 0;
var spacing = 2;
var radius = spacing / 5.0;
var cameraZ = 3 * n;

//include variable range and density
function init(){
  for(i = 0; i < n; i++) {
    for(j = 0; j < n; j++) {
      for(k = 0; k < n; k++) {
        x = i - ((n - 1) / 2);
        y = j - ((n - 1) / 2);
        z = k - ((n - 1) / 2);
        r = ~~(i * 255 / (n - 1));
        g = ~~(j * 255 / (n - 1));
        b = ~~(k * 255 / (n - 1));
        c = "rgb(" + r + ", " + g + ", " + b + ")";
        x_locations.push(r);
        y_locations.push(g);
        z_locations.push(b);
        geometries.push(new THREE.MeshBasicMaterial( {color: c} ));
        spheres.push(new THREE.SphereBufferGeometry(radius, 20, 20));
        finalSpheres.push(new THREE.Mesh(spheres[w], geometries[w]));
        finalSpheres[w].translateX(x * spacing);
        finalSpheres[w].translateY(y * spacing);
        finalSpheres[w].translateZ(z * spacing);
        group.add(finalSpheres[w]);
        w += 1;
      }
    }
  }
  raycaster = new THREE.Raycaster();
}

scene.add(group);

camera.position.z = cameraZ;
camera.position.x = 0;
camera.position.y = 0;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.screenSpaceFactor = false;

const onMouseClick = function ( event ){
    event.preventDefault();
    document.getElementById("rgb_label").innerHTML =  "RGB: [" + Math.round(255 * INTERSECTED.material.color.r) + ", " + Math.round(255 * INTERSECTED.material.color.g) + ", " + Math.round(255 * INTERSECTED.material.color.b) + "]";
    scene.background = INTERSECTED.material.color;
}
const onTouchStart = function ( event ){
    //pointer.x = event.changedTouches[0].pageX;
    //pointer.y = event.changedTouches[0].pageY;
    let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
    pointer.x = ( ( event.changedTouches[0].pageX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
    pointer.y =  - ( ( event.changedTouches[0].pageY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top ) ) * 2 + 1;

    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( group.children );
    if (intersects.length > 0) {
      if (INTERSECTED != intersects[ 0 ].object) {
        if( INTERSECTED ){
          //INTERSECTED.material.color.set(prevColor);
          //INTERSECTED.geometry.parameters.radius = 0.4;
          INTERSECTED.scale.set(1, 1, 1);
        }
        INTERSECTED = intersects[ 0 ].object;
        prevColor = new THREE.Color(INTERSECTED.material['color']);
        //INTERSECTED.material.color.set("rgb(0, 0, 0)");
        //INTERSECTED.geometry.parameters.radius = 0.5;
        INTERSECTED.scale.set(1.3, 1.3, 1.3);
      }
    }
    else {
      if(INTERSECTED){
        //INTERSECTED.material.color.set(prevColor);
        //INTERSECTED.geometry.parameters.radius = 0.4;
        INTERSECTED.scale.set(1, 1, 1);
      }
      INTERSECTED = null;
    }
    document.getElementById("rgb_label").innerHTML =  "RGB: [" + Math.round(255 * INTERSECTED.material.color.r) + ", " + Math.round(255 * INTERSECTED.material.color.g) + ", " + Math.round(255 * INTERSECTED.material.color.b) + "]";
    scene.background = INTERSECTED.material.color;
}
const onPointerMove = function ( event ) {
  let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
  pointer.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  pointer.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top ) ) * 2 + 1;
}
const onTouchMove = function (event){
  let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
  pointer.x = ( ( event.changedTouches[0].pageX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
  pointer.y = - ( ( event.changedTouches[0].pageY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top ) ) * 2 + 1;
}

const onKeyPress = function ( event ) {
  switch ( event.key ) {
    case 'n':
      n += 1;
      group.children = [];
      init();
    break;
    case 'N':
      n -= 1;
      group.children = [];
      init();
    break;
    default:
  }
}

function startup(){
  var canv = document.getElementById("colorcube");
  canv.addEventListener("keypress", onKeyPress, false);
  canv.addEventListener("mousemove", onPointerMove, false);
  canv.addEventListener("mousedown", onMouseClick, false);
  canv.addEventListener("touchend", onTouchStart, false);
}
document.addEventListener("DOMContentLoaded", startup);

function animate(){
  requestAnimationFrame(animate);
  camera.lookAt( scene.position );
  raycaster.setFromCamera( pointer, camera );
  const intersects = raycaster.intersectObjects( group.children );
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[ 0 ].object) {
      if( INTERSECTED ){
        //INTERSECTED.material.color.set(prevColor);
        //INTERSECTED.geometry.parameters.radius = 0.4;
        INTERSECTED.scale.set(1, 1, 1);
      }
      INTERSECTED = intersects[ 0 ].object;
      prevColor = new THREE.Color(INTERSECTED.material['color']);
      //INTERSECTED.material.color.set("rgb(0, 0, 0)");
      //INTERSECTED.geometry.parameters.radius = 0.5;
      INTERSECTED.scale.set(1.3, 1.3, 1.3);
    }
  }
  else {
    if(INTERSECTED){
      //INTERSECTED.material.color.set(prevColor);
      //INTERSECTED.geometry.parameters.radius = 0.4;
      INTERSECTED.scale.set(1, 1, 1);
    }
    INTERSECTED = null;
  }
  camera.updateMatrixWorld;
  renderer.render(scene, camera);
  controls.update();
}

init();
animate();
