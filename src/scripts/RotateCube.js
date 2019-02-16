import * as THREE from 'three';
import { Tween, Easing, update as TweenUpdate } from 'es6-tween';

import {
  GetLineMesh, GetMesh, MakeFrequencyBands, minMaxInterpolate, baseClamp
} from './utils';


const MINMAX_CONFIG = {
  rotate: {
    min: 0,
    max: 2000,
    a: 0,
    b: 3,
    index: 1
  },
  translate: {
    min: 0,
    max: 1300,
    a: 0,
    b: 3,
    index: 2
  }
};

export class RotateCube {
  constructor(scene) {
    this.direction = 1;

    this.cube = GetMesh();
    this.cube.add(GetLineMesh());
    this.cube.rotation.x = -Math.PI / 4;
    this.cube.rotation.y = Math.PI / 4;

    this.group = new THREE.Group();
    this.group.add(this.cube);
    this.group.position.z = -5;

    scene.add(this.group);

    setInterval(this.RotateTween.bind(this), 300);
    setInterval(this.TranslateTween.bind(this), 300);
  }

  RotateTween() {
    if (!this.analyser) {
      return;
    }

    if (this.rotateTween) {
      this.rotateTween.stop();
    }

    const samples = MakeFrequencyBands(this.analyser.getFrequencyData());
    let currentVal = minMaxInterpolate(MINMAX_CONFIG.rotate, samples[MINMAX_CONFIG.rotate.index]);
    currentVal = currentVal > 1.8 ? currentVal : 0.1;

    const currentAngle = this.group.rotation.y;
    const nextAngle = -(Math.abs(currentAngle) + 8 * currentVal);
    const tweenObj = {
      angle: currentAngle
    };

    this.rotateTween = new Tween(tweenObj)
      .to({ angle: nextAngle })
      .easing(currentVal > 1.8 ? Easing.Quadratic.In : Easing.Linear)
      .on('update', ({ angle }) => {
        this.group.rotation.y = angle;
      })
      .start();
  }

  TranslateTween() {
    if (!this.analyser) {
      return;
    }

    if (this.positionTween) {
      this.positionTween.stop();
    }

    this.direction = this.direction * -1;

    const samples = MakeFrequencyBands(this.analyser.getFrequencyData());
    let currentVal = minMaxInterpolate(
      MINMAX_CONFIG.translate, samples[MINMAX_CONFIG.translate.index]
    );
    currentVal = currentVal > 1.8 ? currentVal : 0.1;

    const currentPos = this.group.position.y;
    const nextPos = -(Math.abs(currentPos) + 2 * currentVal);
    const tweenObj = {
      pos: currentPos
    };

    this.positionTween = new Tween(tweenObj)
      .to({ pos: nextPos })
      .easing(Easing.Quadratic.In)
      .on('update', ({ pos }) => {
        this.group.position.y = this.direction * baseClamp(pos, -0.3, 0.3);
      })
      .start();
  }

  // eslint-disable-next-line class-methods-use-this
  draw() {
    TweenUpdate();
  }

  SetAnalyzer(analyser) {
    this.analyser = analyser;
  }
}
