import { OrbitControls } from 'https://unpkg.com/three@0.119.0/examples/jsm/controls/OrbitControls.js';
var loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);// for intensive problems you can give smaller values
document.getElementById('crystal').appendChild( renderer.domElement );
var a = 10;
const a1= [a / 4, 0, 0];
const a2= [0, a / 4, 0];
const a3= [0, 0, a / 4];
const x_locations = [];
const y_locations = [];
const z_locations = [];
const geometries = [];
const spheres = [];
const finalSpheres = [];
var i;
var j;
var k;
var m = 0;
var flag1, flag2, flag3;
var x, y, z;
const group = new THREE.Group();

const controls = new OrbitControls(camera, renderer.domElement);

var crystal_dict = {"sc": [0], "bcc": [1], "fcc": [2], "hcp": [3], "Diamond": [4]};

// add to module file
function generateLattice(i){
  switch(i){
    case 0:
      // Simple Cubic 
      // group.children = [];
      SimpleCubic();
      break;
    case 1:
      // Body Centered Cubic 
    case 2:
      // Face Centered Cubic
    case 3:
      // Hexagonal Close Packed
    case 4:
      // Diamond 
      // group.children = [];
      Diamond();
      break;
    default:
      return null;
  }
}

function Diamond(){
  for(i = -2; i < 3; i++){
      for(j = -2; j < 3; j++){
          for(k = -2; k < 3; k++){
             x = i + 2;
             y = j + 2;
             z = k + 2;
             flag1 = (x % 2 == y % 2) && (y % 2 == z % 2);
             flag2 = (x + y + z) % 4 == 0;
             flag3 = (x + y + z) % 4 == 1;
             if(flag1 && (flag2 || flag3)){
               console.log("(" + x + ", " + y + ", " + z + ")");
               x_locations.push(i * a);
               y_locations.push(j * a);
               z_locations.push(k * a);
               if(x > 0 && x < 4 && y > 0 && y < 4 && z > 0 && z < 4){
                 var c = "rgb(" + 84 + ", " + 196 + ", " + 150 + ")";
               } else if ((x == 0 || x == 4) && (y == 0 || y == 4) && (z == 0 || z == 4)){
                   var c = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
               } else {
                 var c = "rgb(" + 73 + ", " + 98 + ", " + 166 + ")";
               }
               geometries.push(new THREE.MeshBasicMaterial( {color: c} ));
               spheres.push(new THREE.SphereBufferGeometry(0.9, 20, 20));

               finalSpheres.push(new THREE.Mesh(spheres[m], geometries[m]));
               finalSpheres[m].translateX(x_locations[m]);
               finalSpheres[m].translateY(y_locations[m]);
               finalSpheres[m].translateZ(z_locations[m]);
               group.add(finalSpheres[m]);
               m += 1;
             }
          }
      }
  }
}

function SimpleCubic(){
  for(i = -2; i < 3; i++){
      for(j = -2; j < 3; j++){
          for(k = -2; k < 3; k++){
             x = i + 2;
             y = j + 2;
             z = k + 2;
             flag1 = (x + y + z) % 4 == 0;
             if(flag1){
               console.log("(" + x + ", " + y + ", " + z + ")");
               x_locations.push(i * a);
               y_locations.push(j * a);
               z_locations.push(k * a);
               if(x > 0 && x < 4 && y > 0 && y < 4 && z > 0 && z < 4){
                 var c = "rgb(" + 84 + ", " + 196 + ", " + 150 + ")";
               } else if ((x == 0 || x == 4) && (y == 0 || y == 4) && (z == 0 || z == 4)){
                   var c = "rgb(" + 255 + ", " + 255 + ", " + 255 + ")";
               } else {
                 var c = "rgb(" + 73 + ", " + 98 + ", " + 166 + ")";
               }
               geometries.push(new THREE.MeshBasicMaterial( {color: c} ));
               spheres.push(new THREE.SphereBufferGeometry(0.9, 20, 20));

               finalSpheres.push(new THREE.Mesh(spheres[m], geometries[m]));
               finalSpheres[m].translateX(x_locations[m]);
               finalSpheres[m].translateY(y_locations[m]);
               finalSpheres[m].translateZ(z_locations[m]);
               group.add(finalSpheres[m]);
               m += 1;
             }
          }
      }
  }
}

function init(){
  generateLattice(crystal_dict['Diamond'][0]);
  //generateLattice(crystal_dict['sc'][0]);

  scene.add(group);

  camera.position.z = 55;
  camera.position.x = 0;
  camera.position.y = 0;

  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.screenSpaceFactor = false;
}

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

init();
animate();
