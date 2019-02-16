import * as THREE from 'three';

export const getRandomSign = () => (Math.random() < 0.5 ? -1 : 1);

export const getRandomNumber = (min, max) => (Math.random() * max) + min;

export const fallInside = (x, y, range) => {
  if (x < range && y < range) {
    return true;
  }

  return false;
};


export const MakeFrequencyBands = (samples) => {
  const result = [];

  let count = 0;
  for (let i = 0; i < 8; i++) {
    let sampleInThisBand = Math.trunc((2 ** i) * 2);

    if (i === 7) {
      sampleInThisBand += 2;
    }

    let avg = 0;
    for (let j = 0; j < sampleInThisBand; j++) {
      avg += samples[count];
      count++;
    }

    avg /= count;
    result[i] = avg * 10;
  }
  return result;
};


export const minMaxInterpolate = (minMaxConfig, x) => {
  const numerator = (minMaxConfig.b - minMaxConfig.a) * (x - minMaxConfig.min);
  const deno = minMaxConfig.max - minMaxConfig.min;
  return (numerator / deno) + minMaxConfig.a;
};

// Material config
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: '#000',
});

const geo = new THREE.EdgesGeometry(geometry);
const mat = new THREE.LineBasicMaterial({ color: 0x00ff44, linewidth: 2 });

export const GetLineMesh = () => new THREE.Mesh(geometry, material);

export const GetMesh = () => new THREE.LineSegments(geo, mat);

export const baseClamp = (number, lower, upper) => {
  let clampedNum = number;
  if (number === Number) {
    if (upper !== undefined) {
      clampedNum = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      clampedNum = number >= lower ? number : lower;
    }
  }
  return clampedNum;
};
