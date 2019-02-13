import {loadShaders} from "./loadShader";
import {createShader, createProgram} from "./setupProgram";

let gl = null;

export async function DrawQuads (_gl) {
    gl = _gl;
    const shaders = await loadShaders();
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, shaders.vertexText);
    let fragShader = createShader(gl, gl.FRAGMENT_SHADER, shaders.shaderText);

    let program = createProgram(gl, vertexShader, fragShader);

    // Tell it to use our program
    gl.useProgram(program);

    // Set canvas size
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell webgl to convert from clip space to pixels
    gl.viewport (0, 0, gl.canvas.width, gl.canvas.height);

    clearCanvas();

    SetupTriangle(program);
    DrawTraingle();
    DrawAnotherTriangleWithSameSettings();
}

function SetupTriangle(program) {
    // look up where the vertex data need to go
    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    let positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    let positions = [
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
    let size = 2;            // 2 components per iteration
    let type = gl.FLOAT;     // the data is 32 bit floats
    let normalize = false;   // dont normalize the data
    let stride = 0;          // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0;          // start at he beginning of the buffer

    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);
}

function DrawAnotherTriangleWithSameSettings()
{
    let positions = [
        -1, 1,
        -1, 0,
        0, 0.3,
        0, 0,
        0 , 1,
        -1, 1
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    DrawSquare();
}

function DrawTraingle() {
    // DRAW
    let primitiveType  = gl.TRIANGLES;
    let drawOffset = 0;
    let count = 3;
    gl.drawArrays(primitiveType, drawOffset, count);
}

function DrawSquare() {
    // DRAW
    let primitiveType  = gl.TRIANGLES;
    let drawOffset = 0;
    let count = 6;
    gl.drawArrays(primitiveType, drawOffset, count);
}

function clearCanvas() {
    // clear the canvas
    gl.clearColor(20,127,100,255);
    gl.clear(gl.COLOR_BUFFER_BIT);
}