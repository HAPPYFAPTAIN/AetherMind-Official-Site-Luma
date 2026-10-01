import * as THREE from "three";
import { createScienceModel, sampleSciencePositions } from "./science-geometry";

export type ScienceSceneMode =
  | "hero"
  | "simulation"
  | "structure"
  | "representation"
  | "prediction"
  | "discovery";

const PHASE_RANGE: Record<ScienceSceneMode, [number, number]> = {
  hero: [0, 1],
  simulation: [0.22, 0.86],
  structure: [0, 0.32],
  representation: [0.34, 0.64],
  prediction: [0.66, 1],
  discovery: [0, 1],
};

// A small normal-space studio reflection texture keeps the chrome finish
// without generating six cubemap faces and a PMREM at page load. Geometry,
// occlusion, perspective and individual atom positions remain fully 3D.
function studioMaterialTexture() {
  const size = 128;
  const pixels = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x / (size - 1)) * 2 - 1;
      const ny = 1 - (y / (size - 1)) * 2;
      const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      const softbox = Math.exp(-((nx + 0.38) ** 2 / 0.035 + (ny - 0.32) ** 2 / 0.19));
      const strip = Math.exp(-((nx - 0.63) ** 2 / 0.009 + (ny - 0.08) ** 2 / 0.28));
      const lower = Math.exp(-((nx + 0.08) ** 2 / 0.4 + (ny + 0.76) ** 2 / 0.025));
      const fresnel = (1 - nz) ** 4;
      const light = Math.min(1, 0.2 + nz * 0.22 + Math.max(0, ny) * 0.16 + softbox * 0.95 + strip * 0.75 + lower * 0.38 + fresnel * 0.48);
      const i = (y * size + x) * 4;
      pixels[i] = Math.round(light * 240);
      pixels[i + 1] = Math.round(light * 249);
      pixels[i + 2] = Math.round(light * 255);
      pixels[i + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(pixels, size, size);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/** Real atom/bond meshes; no image planes and no camera zoom in the sequence. */
export async function createScienceRenderer(canvas: HTMLCanvasElement | OffscreenCanvas, mode: ScienceSceneMode) {
  if (mode === "hero") {
    const { createMolecularRenderer } = await import("./molecular-renderer");
    return createMolecularRenderer(canvas);
  }
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x05070a, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const scene = new THREE.Scene();
  const cinematic = mode === "discovery";
  const camera = new THREE.PerspectiveCamera(cinematic ? 42 : 35, 1, 0.1, 80);
  // Keep the lens and camera fixed throughout a scroll sequence. All five
  // shapes are made by updating the atoms' positions and their bond endpoints.
  camera.position.set(0, 0.4, 11.5);
  camera.lookAt(0, 0, 0);

  const group = new THREE.Group();
  group.rotation.set(0.46, -0.42, -0.3);
  scene.add(group);
  const model = createScienceModel({cinematic});
  const positions = new Float32Array(model.atoms.length * 3);
  const sphere = new THREE.SphereGeometry(1, 24, 16);
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 10, 1);
  const matcap = studioMaterialTexture();
  const atomMaterial = new THREE.MeshMatcapMaterial({matcap});
  const bondMaterial = new THREE.MeshMatcapMaterial({matcap, color: 0x8c9daa});
  const atoms = new THREE.InstancedMesh(sphere, atomMaterial, model.atoms.length);
  const bonds = new THREE.InstancedMesh(cylinder, bondMaterial, model.bonds.length);
  atoms.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  bonds.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  // Morphing geometry must not be culled against its first frame's bounds.
  atoms.frustumCulled = false;
  bonds.frustumCulled = false;
  const colors = [0xb5c6d2, 0x657e92, 0xe1e8ee, 0x8199ad];
  const color = new THREE.Color();
  model.atoms.forEach((atom, i) => atoms.setColorAt(i, color.setHex(atom.accent ? 0x4eb6db : colors[atom.layer])));
  group.add(bonds, atoms);

  // Fine connections are shown only during representation, when covalent
  // cylinders retract. They indicate the illustrative computational mapping.
  const linesGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(model.bonds.length * 6);
  linesGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  const lineMaterial = new THREE.LineBasicMaterial({color: 0x8ed4ee, transparent: true, opacity: 0, depthWrite: false});
  const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
  lines.frustumCulled = false;
  group.add(lines);

  // Actual paths out of the assembled structure, shown briefly during the
  // burst. Foreground and distant atoms follow different depth trajectories.
  const trailPositions = new Float32Array(model.atoms.length * 6);
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositions, 3).setUsage(THREE.DynamicDrawUsage));
  const trailMaterial = new THREE.LineBasicMaterial({color: 0x9bd8ed, transparent: true, opacity: 0, depthWrite: false});
  const trails = new THREE.LineSegments(trailGeometry, trailMaterial);
  trails.frustumCulled = false;
  group.add(trails);

  const dummy = new THREE.Object3D();
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const [phaseStart, phaseEnd] = PHASE_RANGE[mode];
  let disposed = false;
  let viewportWidth = 1;
  let viewportHeight = 1;
  let compact = false;

  function render(progress: number, pointerX: number, pointerY: number, pointerStrength: number, time = 0) {
    if (disposed) return;
    const phase = phaseStart + (phaseEnd - phaseStart) * Math.max(0, Math.min(1, progress));
    sampleSciencePositions(model, phase, positions);
    const burst = THREE.MathUtils.smoothstep(phase, 0.34, 0.54) * (1 - THREE.MathUtils.smoothstep(phase, 0.61, 0.81));

    // The pointer gently flexes nearby atoms. Each atom has its own weight,
    // so this is a local deformation rather than a translated image layer.
    for (let i = 0; i < model.atoms.length; i++) {
      const k = i * 3;
      const dx = positions[k] - pointerX * 3;
      const dz = positions[k + 2] - pointerY * 3;
      const influence = Math.exp(-(dx * dx + dz * dz) * 0.55) * pointerStrength;
      positions[k + 1] += influence * (0.16 + model.atoms[i].layer * 0.09);
      dummy.position.fromArray(positions, k);
      dummy.quaternion.identity();
      dummy.scale.setScalar(model.atoms[i].radius * (cinematic ? 1.7 : 1.65) * (1 + (cinematic && i % 23 === 0 ? burst * 0.65 : 0)));
      dummy.updateMatrix();
      atoms.setMatrixAt(i, dummy.matrix);
      const original = model.atoms[i].position;
      for (let axis = 0; axis < 3; axis++) {
        trailPositions[i * 6 + axis] = positions[k + axis];
        trailPositions[i * 6 + axis + 3] = positions[k + axis] - (positions[k + axis] - original[axis]) * 0.14 * burst;
      }
    }

    // Withdraw stretched chemical bonds during the exploded atomic phase.
    // Recreate their cylinders from the actual endpoints as atoms reassemble.
    for (let i = 0; i < model.bonds.length; i++) {
      const [first, second] = model.bonds[i];
      a.fromArray(positions, first * 3);
      b.fromArray(positions, second * 3);
      direction.subVectors(b, a);
      const length = direction.length();
      const visibility = (1 - THREE.MathUtils.smoothstep(length, 0.65, 1.25)) * (1 - burst * 0.9);
      dummy.position.copy(a).add(b).multiplyScalar(0.5);
      dummy.quaternion.setFromUnitVectors(up, direction.normalize());
      dummy.scale.set(0.028 * visibility, Math.max(0.001, length), 0.028 * visibility);
      dummy.updateMatrix();
      bonds.setMatrixAt(i, dummy.matrix);
      a.toArray(linePositions, i * 6);
      b.toArray(linePositions, i * 6 + 3);
    }
    atoms.instanceMatrix.needsUpdate = true;
    bonds.instanceMatrix.needsUpdate = true;
    linesGeometry.attributes.position.needsUpdate = true;
    trailGeometry.attributes.position.needsUpdate = true;
    const dispersed = THREE.MathUtils.smoothstep(phase, 0.36, 0.53) * (1 - THREE.MathUtils.smoothstep(phase, 0.64, 0.8));
    lineMaterial.opacity = dispersed * (cinematic ? 0.018 : 0.05);
    lines.visible = lineMaterial.opacity > 0.003;
    trailMaterial.opacity = cinematic ? burst * 0.16 : 0;
    trails.visible = trailMaterial.opacity > 0.003;
    group.rotation.y = -0.42 + phase * 0.55 + pointerX * pointerStrength * 0.06 + time * .02;
    group.rotation.x = 0.46 + phase * 0.15;
    if (cinematic) {
      // Full-section canvas, with a fixed lens: the scene opens into the
      // viewport rather than colliding with the edges of a small DOM box.
      const focusX = compact ? 0.5 : 0.72 - burst * 0.12;
      const focusY = compact ? 0.72 : 0.51;
      camera.setViewOffset(viewportWidth, viewportHeight, (0.5 - focusX) * viewportWidth, (0.5 - focusY) * viewportHeight, viewportWidth, viewportHeight);
    }
    renderer.render(scene, camera);
    if ("dataset" in canvas) {
      canvas.dataset.phase = phase.toFixed(3);
      canvas.dataset.drawCalls = String(renderer.info.render.calls);
    }
    return phase.toFixed(3);
  }

  function resize(width: number, height: number, pixelRatio = 1) {
    viewportWidth = width;
    viewportHeight = height;
    compact = width <= 900;
    const aspect = width / Math.max(height, 1);
    renderer.setPixelRatio(Math.min(pixelRatio, width < 600 ? 1.5 : 1.75));
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    // Fit the largest exploded shape, including portrait aspect ratios.
    // Resize alone adjusts framing; scrolling never changes zoom or scale.
    camera.position.z = cinematic
      ? (compact ? Math.max(11.5, 11.8 / aspect) : 10.5)
      : Math.max(8.7, (width < 600 ? 9.7 : 8.8) / aspect);
    camera.updateProjectionMatrix();
  }

  function dispose(releaseContext = true) {
    disposed = true;
    atoms.dispose();
    bonds.dispose();
    sphere.dispose();
    cylinder.dispose();
    atomMaterial.dispose();
    bondMaterial.dispose();
    linesGeometry.dispose();
    lineMaterial.dispose();
    trailGeometry.dispose();
    trailMaterial.dispose();
    matcap.dispose();
    renderer.dispose();
    if (releaseContext) renderer.forceContextLoss();
  }

  try {
    // KHR_parallel_shader_compile lets the browser compile without blocking
    // input when supported. Wait for the material before revealing the canvas.
    await renderer.compileAsync(scene, camera);
  } catch (error) {
    dispose();
    throw error;
  }
  return { render, resize, dispose };
}
