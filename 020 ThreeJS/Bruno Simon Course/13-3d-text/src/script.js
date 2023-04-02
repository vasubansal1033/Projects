import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

/**
 * Fonts
 */
const fontsLoader = new THREE.FontLoader();
fontsLoader.load(
    '/fonts/helvetiker_bold.typeface.json',
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'Hello Three.js', {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        }
        )
        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x * 0.5,
        //     - textGeometry.boundingBox.max.y * 0.5,
        //     - textGeometry.boundingBox.max.z * 0.5,
        //     )
        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        });
        // textMaterial.wireframe = true;

        // textMaterial.color.set('red')
        const text = new THREE.Mesh(textGeometry, textMaterial);

        scene.add(text);

        /**
         * creating donuts
         */

        console.time('donuts')
        const donutGeometry = new THREE.TorusBufferGeometry(
            0.3, 0.1, 16, 16
        )
        const donutMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
        const donut = new THREE.Mesh(donutGeometry, donutMaterial);
        for (let i = 0; i < 1000; i++) {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial);
            donut.position
                .set(Math.random() * 10 - 5,
                    Math.random() * 10 - 5,
                    Math.random() * 10 - 5
                )
            donut.rotation
                .set(Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                )

            const scale = Math.max(Math.random(), 0.5);
            donut.scale.set(scale, scale, scale)

            scene.add(donut);
        }
        console.timeEnd('donuts')
    }
)

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()