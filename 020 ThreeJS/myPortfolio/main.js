import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import gsap from 'gsap';

// const gui = new dat.GUI();
const world = {
  plane: {
    width: 20,
    height: 20,
    widthSegments: 40,
    heightSegments: 40
  }
}
// gui.add(world.plane, 'width', 1, 500)
//   .onChange(generatePlane);
// gui.add(world.plane, 'height', 1, 500)
//   .onChange(generatePlane);
// gui.add(world.plane, 'widthSegments', 1, 500)
//   .onChange(generatePlane);
// gui.add(world.plane, 'heightSegments', 1, 500)
//   .onChange(generatePlane);

function generatePlane() {
  plane.geometry.dispose();
  plane.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );

  const { array: arr } = plane.geometry.attributes.position;
  const randomValues = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 3 == 0) {
      const x = arr[i];
      const y = arr[i + 1];
      const z = arr[i + 2];

      arr[i] = x + (Math.random() - 0.5);
      arr[i + 1] = y + (Math.random() - 0.5);
      arr[i + 2] = z + Math.random() - 0.5;
    }
    randomValues.push(Math.random() - 0.5);
  }

  plane.geometry.attributes.position.randomValues = randomValues;
  plane.geometry.attributes.position.originalPosition = plane.geometry.attributes.position.array;


  const colors = [];
  for (let i = 0; i < plane.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.45);
  }

  plane.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(new Float32Array(colors), 3)
  )

}

const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

// new OrbitControls(camera, renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const geometry = new THREE.PlaneGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
);
const material2 = new THREE.MeshPhongMaterial({
  // color: 0xff0000,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true
});

const plane = new THREE.Mesh(geometry, material2);
scene.add(plane);
generatePlane();

// console.log(plane.geometry.attributes.position)


const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);

light.position.set(0, 1, 1);

const mouse = {
  x: undefined,
  y: undefined
}

let t = 0.01;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  raycaster.setFromCamera(mouse, camera);

  const { array: arr, originalPosition, randomValues } = plane.geometry.attributes.position;

  t += 0.01;
  for (let i = 0; i < arr.length; i += 3) {
    arr[i] = originalPosition[i] + Math.cos(t + randomValues[i]) * 0.003;
    arr[i + 1] = originalPosition[i + 1] + Math.sin(t + randomValues[i + 1]) * 0.003;
    // console.log(Math.cos(t+randomValues[i]))
  }

  plane.geometry.attributes.position.needsUpdate = true;

  const intersects = raycaster.intersectObject(plane);

  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes;

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4
    }
    const hoverColor = {
      r: 0.1,
      g: 0.5,
      b: 1
    }

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1,
      onUpdate: () => {
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.g);
        color.setZ(intersects[0].face.a, hoverColor.b);

        color.setX(intersects[0].face.b, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.b, hoverColor.b);

        color.setX(intersects[0].face.c, hoverColor.r);
        color.setY(intersects[0].face.c, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);

        color.needsUpdate = true;
      }
    })

  }

}

animate();


addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -1 * (e.clientY / innerHeight) * 2 + 1;
})

