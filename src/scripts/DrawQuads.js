import { loadShaders } from './loadShader';
import { createShader, createProgram } from './setupProgram';

let gl = null;

function clearCanvas() {
  // clear the canvas
  gl.clearColor(20, 127, 100, 255);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function SetupTriangle(program) {
  // look up where the vertex data need to go
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    0, 0,
    0, -0.5,
    0.7, 0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // turn on attributes
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the buffer positions
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // tell the attribute how to get data out of the positionBuffer(ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32 bit floats
  const normalize = false; // dont normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // start at he beginning of the buffer

  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset
  );
}

function DrawTraingle() {
  // DRAW
  const primitiveType = gl.TRIANGLES;
  const drawOffset = 0;
  const count = 3;
  gl.drawArrays(primitiveType, drawOffset, count);
}

function DrawSquare() {
  // DRAW
  const primitiveType = gl.TRIANGLES;
  const drawOffset = 0;
  const count = 6;
  gl.drawArrays(primitiveType, drawOffset, count);
}

function DrawAnotherTriangleWithSameSettings() {
  const positions = [
    -1, 1,
    -1, 0,
    0, 0.3,
    0, 0,
    0, 1,
    -1, 1,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  DrawSquare();
}

export async function DrawQuads(_gl) {
  gl = _gl;
  const shaders = await loadShaders();
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders.vertexText);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, shaders.shaderText);

  const program = createProgram(gl, vertexShader, fragShader);

  // Tell it to use our program
  gl.useProgram(program);

  // Set canvas size
  // eslint-disable-next-line no-undef
  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell webgl to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  clearCanvas();

  SetupTriangle(program);
  DrawTraingle();
  DrawAnotherTriangleWithSameSettings();
}
