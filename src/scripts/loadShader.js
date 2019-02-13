export async function loadShaders() {
  try {
    const vertexResponse = await fetch('src/shaders/vertex.shader');
    const vertexText = await vertexResponse.text();
    const shaderResponse = await fetch('src/shaders/frag.shader');
    const shaderText = await shaderResponse.text();

    return { vertexText, shaderText };
  } catch (ex) {
    throw new Error(ex);
  }
}
