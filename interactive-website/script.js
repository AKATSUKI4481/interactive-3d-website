// Background color change logic
const button = document.getElementById("colorButton");
const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffccff", "#ccffff"];
let currentIndex = 0;

button.addEventListener("click", () => {
  document.body.style.backgroundColor = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
});

// Three.js 3D model setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("3dCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load a 3D model
const loader = new THREE.GLTFLoader();
loader.load(
  "https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/models/gltf/Duck/glTF/Duck.gltf",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error("Error loading 3D model:", error);
  }
);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Make the 3D scene responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Update controls in the animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Required if controls.enableDamping is true
  renderer.render(scene, camera);
}
animate();