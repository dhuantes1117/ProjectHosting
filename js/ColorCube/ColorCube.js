import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';

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
        r = ~~(i * 255 / n);
        g = ~~(j * 255 / n);
        b = ~~(k * 255 / n);
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
}

scene.add(group);

camera.position.z = cameraZ;
camera.position.x = 0;
camera.position.y = 0;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.screenSpaceFactor = false;

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

document.addEventListener("keypress", onKeyPress, false);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

init();
animate();
