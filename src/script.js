import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";

// Debug
const gui = new GUI();
const lowCostFolderGUI = gui.addFolder("low cost");
const moderateCostFolderGUI = gui.addFolder("moderate cost");
const highCostFolderGUI = gui.addFolder("high cost");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight("white", 0.3);
scene.add(ambientLight);

const hemishphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
scene.add(hemishphereLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 3);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff9000, 1.6, 10);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 3, 0.5, 0.5);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 7, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);
spotLight.target.position.set(-1, 0, 0);

const hemishphereLightHelper = new THREE.HemisphereLightHelper(
	hemishphereLight,
	0.4
);
scene.add(hemishphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	0.4
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.4);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

console.log(directionalLightHelper);
//GUI
lowCostFolderGUI
	.add(ambientLight, "intensity")
	.min(0)
	.max(10)
	.step(0.01)
	.name("ambient light");

lowCostFolderGUI
	.add(hemishphereLight, "intensity")
	.min(0)
	.max(3)
	.step(0.01)
	.name("hemisphere light");
lowCostFolderGUI
	.add(hemishphereLightHelper, "visible")
	.name("hemisphere light helper");

moderateCostFolderGUI
	.add(directionalLight, "intensity")
	.min(0)
	.max(6)
	.step(0.01)
	.name("directional light");

moderateCostFolderGUI
	.add(directionalLightHelper, "visible")
	.name("directional light helper");

moderateCostFolderGUI
	.add(pointLight, "intensity")
	.min(0)
	.max(12)
	.step(0.01)
	.name("pointLight light");
moderateCostFolderGUI
	.add(pointLightHelper, "visible")
	.name("pointLight light helper");

highCostFolderGUI
	.add(rectAreaLight, "intensity")
	.min(0)
	.max(6)
	.step(0.01)
	.name("rectArea light");
highCostFolderGUI
	.add(rectAreaLightHelper, "visible")
	.name("rectArea light helper");

highCostFolderGUI
	.add(spotLight, "intensity")
	.min(0)
	.max(10)
	.step(0.01)
	.name("spot light");
highCostFolderGUI.add(spotLightHelper, "visible").name("spot light helper");


// Materials
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 32, 64),
	material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	sphere.rotation.y = 0.1 * elapsedTime;
	cube.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.15 * elapsedTime;
	cube.rotation.x = 0.15 * elapsedTime;
	torus.rotation.x = 0.15 * elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
