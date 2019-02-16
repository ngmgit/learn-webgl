import * as THREE from 'three';

import { RotateCube } from './RotateCube';
import { CubeWaves } from './CubeWaves';
import { SetupP5Eq } from './p5eq';

let listener = null;
let sound = null;
let analyser = null;

function playAudio(camera, SetAudio) {
  listener = new THREE.AudioListener();
  sound = new THREE.Audio(listener);
  camera.add(listener);

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('public/sounds/sample.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();

    analyser = new THREE.AudioAnalyser(sound, 1024);
    SetAudio(analyser);
    SetupP5Eq({ analyser });
  });
}

export default function threeExample() {
  // Initialize and set render context
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight - 4);
  document.body.appendChild(renderer.domElement);

  const cubeWaves = new CubeWaves(scene);
  const rotateCube = new RotateCube(scene);

  const SetAudio = (data) => {
    rotateCube.SetAnalyzer(data);
    cubeWaves.SetAnalyzer(data);
  };

  playAudio(camera, SetAudio);

  // Animation Loop
  const animate = function () {
    requestAnimationFrame(animate);

    if (analyser) {
      rotateCube.draw();
      cubeWaves.draw();
    }

    renderer.render(scene, camera);
  };

  animate();
}
