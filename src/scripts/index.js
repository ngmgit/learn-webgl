import '../styles/index.scss';
import threeExample from './DrawCubeWaves';

const canvas = document.getElementById('test-canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
  // eslint-disable-next-line no-console
  console.log('No webgl');
}

threeExample();
