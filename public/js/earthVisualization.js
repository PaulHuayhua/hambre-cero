const myCanvas = document.getElementById("earth-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    myCanvas.clientWidth / myCanvas.clientHeight,
    0.1,
    10000
);

const renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    alpha: true,
});
renderer.setSize(myCanvas.clientWidth, myCanvas.clientHeight);

// Crear el controlador de órbita para la interactividad
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = false;

// Crear estrellas
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });

    const starVertices = [];
    for (let i = 0; i < 1140; i++) {
        const x = THREE.MathUtils.randFloatSpread(100); // Dispersión más cercana
        const y = THREE.MathUtils.randFloatSpread(100);
        const z = THREE.MathUtils.randFloatSpread(100);
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

createStars();

// Crear la esfera que representa la Tierra
const geometry = new THREE.SphereGeometry(3, 48, 48);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("../img/word.webp");
const material = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Configurar la cámara
camera.position.z = 6;

// Animar la rotación
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.001; 
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajustar el tamaño al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
    const aspectRatio = myCanvas.clientWidth / myCanvas.clientHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(myCanvas.clientWidth, myCanvas.clientHeight);
});
