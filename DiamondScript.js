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
renderer.setSize(window.innerWidth, window.innerHeight);// for intensive problems you can give smaller values
document.getElementById('crystal').appendChild( renderer.domElement );
//document.body.appendChild( renderer.domElement );//<canvas> element
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
//include variable range and density

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
/*
for(i = -1; i < 2; i++){
    for(j = -1; j < 2; j++){
        for(k = -1; k < 2; k++){
           if (i == j && j == k && i == 0) {
             continue;
           }
           x_locations.push(i * a1[0] + i * a2[0] + i * a3[0]);
           y_locations.push(j * a1[1] + j * a2[1] + j * a3[1]);
           z_locations.push(k * a1[2] + k * a2[2] + k * a3[2]);
           var c = "rgb(" + 73 + ", " + 98 + ", " + 166 + ")";
           geometries.push(new THREE.MeshBasicMaterial( {color: c} ));
           spheres.push(new THREE.SphereBufferGeometry(0.4, 20, 20));

           finalSpheres.push(new THREE.Mesh(spheres[m], geometries[m]));
           finalSpheres[m].translateX(x_locations[m]);
           finalSpheres[m].translateY(y_locations[m]);
           finalSpheres[m].translateZ(z_locations[m]);
           group.add(finalSpheres[m]);
           m += 1;
        }
    }
}
*/
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
