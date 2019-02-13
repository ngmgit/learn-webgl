import '../styles/index.scss';
import {threeExample} from './DrawCubeWaves';
let canvas = document.getElementById("test-canvas");
let gl = canvas.getContext("webgl");

if (!gl) {
  console.log("No webgl");
}

threeExample();