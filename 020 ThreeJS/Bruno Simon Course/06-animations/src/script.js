import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock();

// Animation

// const tick = () => {

//     // update the object
//     const elapsedTime = clock.getElapsedTime();
//     // mesh.rotation.y = elapsedTime * 2 * Math.PI;

//     camera.position.y = Math.sin(elapsedTime);
//     camera.position.x = Math.cos(elapsedTime);
//     camera.lookAt(mesh.position);

//     // render the scene
//     renderer.render(scene, camera);

//     window.requestAnimationFrame(tick);
// }

// tick();

// Animation using gsap

gsap.to(mesh.position, {
    delay: 1,
    duration: 1,
    x: 2
});

gsap.to(mesh.position, {
    delay: 2,
    duration: 1,
    x: 1
});

gsap.to(mesh.position, {
    delay: 3,
    duration: 1,
    x: -1
});

gsap.to(mesh.rotation, {
    delay: 3,
    duration: 1,
    y: Math.PI *2
})

const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}

tick();

// renderer.render(scene, camera)
