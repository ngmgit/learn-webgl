import * as THREE from 'three';

const Cubeconfig = {
  total: 500,
  range: {
    min: 2,
    max: 6,
  },
  speed: 0.15,
};

const maxZPos = 15;


function getRandomSign() {
  return Math.random() < 0.5 ? -1 : 1;
}

function getRandomNumber(min, max) {
  return (Math.random() * max) + min;
}

function fallInside(x, y, range) {
  if (x < range && y < range) {
    return true;
  }

  return false;
}

function getRandomPosition() {
  const range = { min: 0, max: Cubeconfig.range.max };
  let x = getRandomNumber(range.min, range.max);
  let y = getRandomNumber(range.min, range.max);

  while (fallInside(x, y, Cubeconfig.range.min)) {
    x = getRandomNumber(range.min, range.max);
    y = getRandomNumber(range.min, range.max);
  }

  x *= getRandomSign();
  y *= getRandomSign();

  return { x, y };
}

export default function threeExample() {
  // Initialize and set render context
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight - 4);
  document.body.appendChild(renderer.domElement);

  // Material config
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: '#000',
  });
  const geo = new THREE.EdgesGeometry(geometry);
  const mat = new THREE.LineBasicMaterial({ color: 0x00ff44, linewidth: 2 });

  // Setup forward moving cubes
  const cubesArr = [];
  const MaxSpawnDistance = 25;

  for (let i = 0; i < Cubeconfig.total; i++) {
    const cubeVert = new THREE.Mesh(geometry, material);
    cubeVert.add(new THREE.LineSegments(geo, mat));
    cubeVert.scale.set(0.5, 0.5, 0.5);

    const randPos = getRandomPosition();
    cubeVert.position.x = randPos.x;
    cubeVert.position.y = randPos.y;
    cubeVert.position.z = -getRandomNumber(maxZPos, MaxSpawnDistance);

    cubesArr.push(cubeVert);
  }

  // Setup Center cube
  const cube = new THREE.Mesh(geometry, material);
  cube.add(new THREE.LineSegments(geo, mat));
  cube.rotation.x = -Math.PI / 4;
  cube.rotation.y = Math.PI / 4;

  const group = new THREE.Group();
  group.add(cube);
  group.position.z = -5;

  scene.add(group);

  for (let i = 0; i < Cubeconfig.total; i++) {
    scene.add(cubesArr[i]);
  }

  // Animation Loop
  const animate = function () {
    requestAnimationFrame(animate);
    group.rotation.y -= 0.03;

    for (let i = 0; i < Cubeconfig.total; i++) {
      cubesArr[i].position.z += Cubeconfig.speed;

      if (cubesArr[i].position.z > 2) {
        const randPos = getRandomPosition();
        cubesArr[i].position.x = randPos.x;
        cubesArr[i].position.y = randPos.y;
        cubesArr[i].position.z = -maxZPos;
      }
    }

    renderer.render(scene, camera);
  };

  animate();
}
