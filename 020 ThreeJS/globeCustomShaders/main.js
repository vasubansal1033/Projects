import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import gsap from 'gsap';
import { Float32BufferAttribute } from 'three';

const canvasContainer = document.querySelector("#containerCanvas");
const width = canvasContainer.offsetWidth;
const height = canvasContainer.offsetHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#threejsCanvas")
});



renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);

// document.body.appendChild(renderer.domElement);

// create a sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
  // new THREE.MeshBasicMaterial({
  //   // color: 0xFF0000,
  //   map: new THREE.TextureLoader().load('./earth.jpg')
  // })
  new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./earth.jpg')
      }
    }
  })
);
// scene.add(sphere);

// create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
);

atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (-Math.random()) * 1000;

  starVertices.push(x, y, z);
}

starGeometry.setAttribute('position',
  new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 15;

const mouse = {
  x: undefined,
  y: undefined
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  sphere.rotation.y += 0.005;
  // group.rotation.y = mouse.x * 0.5;
  // group.rotation.x = -mouse.y * 0.5;

  gsap.to(group.rotation, {
    x: mouse.y * -0.5,
    y: mouse.x * 0.5,
    duration: 2
  })

}

animate();


addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -1 * (e.clientY / innerHeight) * 2 + 1;
})