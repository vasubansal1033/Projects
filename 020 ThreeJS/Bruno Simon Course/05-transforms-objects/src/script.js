import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

// mesh.position.x = 0.5;
// mesh.position.y = -0.8;
// mesh.position.z = 1;
// mesh.position.set(0.5, -0.8, 1)

// mesh.scale.x = 1.5;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
// mesh.scale.set(1.5, 0.5, 0.5);

/**
 * Rotation
 */
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI / 3;
// mesh.rotation.y = 1.2;
// mesh.rotation.z = Math.PI / 2;

// scene.add(mesh)

/**
 * Groups
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 'red'
    })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 'green'
    })
)
cube2.position.set(-1.5, 0, 0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 'blue'
    })
)
cube3.position.set(1.5, 0, 0)
group.add(cube3)

group.position.set(0, 0, 0)
group.rotation.y = Math.PI/4;

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

// camera.lookAt(mesh.position)

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)