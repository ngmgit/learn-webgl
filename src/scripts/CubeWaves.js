import {
  fallInside, getRandomSign, getRandomNumber, GetMesh, GetLineMesh
} from './utils';

const CUBE_CONFIG = {
  total: 500,
  range: {
    min: 2,
    max: 6,
  },
  speed: 2,
};

const maxZPos = 15;
const MaxSpawnDistance = 25;

export class CubeWaves {
  constructor(scene) {
    // Setup forward moving cubes
    this.cubesArr = [];

    for (let i = 0; i < CUBE_CONFIG.total; i++) {
      const cubeVert = GetMesh();
      cubeVert.add(GetLineMesh());
      cubeVert.scale.set(0.5, 0.5, 0.5);

      const randPos = CubeWaves.getRandomPosition();
      cubeVert.position.x = randPos.x;
      cubeVert.position.y = randPos.y;
      cubeVert.position.z = -getRandomNumber(maxZPos, MaxSpawnDistance);

      this.cubesArr.push(cubeVert);
    }

    for (let i = 0; i < CUBE_CONFIG.total; i++) {
      scene.add(this.cubesArr[i]);
    }
  }

  draw() {
    if (!this.analyser) {
      return;
    }

    // get the average frequency of the sound
    let data = this.analyser.getAverageFrequency();
    data *= 0.001;

    for (let i = 0; i < CUBE_CONFIG.total; i++) {
      this.cubesArr[i].position.z += CUBE_CONFIG.speed * data;

      if (this.cubesArr[i].position.z > 2) {
        const randPos = CubeWaves.getRandomPosition();
        this.cubesArr[i].position.x = randPos.x;
        this.cubesArr[i].position.y = randPos.y;
        this.cubesArr[i].position.z = -maxZPos;
      }
    }
  }

  SetAnalyzer(analyser) {
    this.analyser = analyser;
  }

  static getRandomPosition() {
    const range = { min: 0, max: CUBE_CONFIG.range.max };
    let x = getRandomNumber(range.min, range.max);
    let y = getRandomNumber(range.min, range.max);

    while (fallInside(x, y, CUBE_CONFIG.range.min)) {
      x = getRandomNumber(range.min, range.max);
      y = getRandomNumber(range.min, range.max);
    }

    x *= getRandomSign();
    y *= getRandomSign();

    return { x, y };
  }
}
