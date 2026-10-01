export type ScienceAtom = {
  position: [number, number, number];
  layer: number;
  radius: number;
  accent: boolean;
};

export type ScienceModel = {
  atoms: ScienceAtom[];
  bonds: [number, number][];
  cinematic?: boolean;
};

const LAYER_COUNT = 3;
const BOND_LENGTH = 0.43;
const PHASES = [0, 0.32, 0.58, 0.82, 1] as const;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// These are illustrative atomic structures, not a molecular dynamics simulation.
// Identity and connectivity persist as a stack separates, disperses, and folds.
// Keyframes are cached per immutable model, never per animation frame: sampling
// any progress value always produces the same result, including reverse scroll.
const modelPoses = new WeakMap<ScienceModel, Float32Array[]>();

export function createScienceModel({ cinematic = false } = {}): ScienceModel {
  const patchRadius = cinematic ? 3 : 2;
  const layers = cinematic ? 4 : LAYER_COUNT;
  const sheet: [number, number][] = [];
  const vertexIndices = new Map<string, number>();
  const edges = new Map<string, [number, number]>();

  // Fused hexagonal sheets: shared corners and
  // shared edges are deduplicated, so every bond has real atom endpoints.
  for (let q = -patchRadius; q <= patchRadius; q++) {
    for (let r = -patchRadius; r <= patchRadius; r++) {
      if (Math.abs(q + r) > patchRadius) continue;
      const centerX = BOND_LENGTH * 1.5 * q;
      const centerZ = BOND_LENGTH * Math.sqrt(3) * (r + q / 2);
      const ring: number[] = [];

      for (let corner = 0; corner < 6; corner++) {
        const angle = (corner * Math.PI) / 3;
        const x = centerX + BOND_LENGTH * Math.cos(angle);
        const z = centerZ + BOND_LENGTH * Math.sin(angle);
        const key = `${Math.round(x * 1e6)},${Math.round(z * 1e6)}`;
        let index = vertexIndices.get(key);
        if (index === undefined) {
          index = sheet.length;
          vertexIndices.set(key, index);
          sheet.push([x, z]);
        }
        ring.push(index);
      }

      for (let corner = 0; corner < 6; corner++) {
        const first = ring[corner];
        const second = ring[(corner + 1) % 6];
        const a = Math.min(first, second);
        const b = Math.max(first, second);
        edges.set(`${a},${b}`, [a, b]);
      }
    }
  }

  const atoms: ScienceAtom[] = [];
  const bonds: [number, number][] = [];
  for (let layer = 0; layer < layers; layer++) {
    const offset = atoms.length;
    const stackingOffset = layer === 1 ? BOND_LENGTH / 3 : 0;
    sheet.forEach(([x, z], index) => {
      atoms.push({
        position: [x + stackingOffset, (layer - (layers - 1) / 2) * (cinematic ? 0.56 : 0.46), z],
        layer,
        radius: index % 11 === 0 ? 0.102 : 0.077,
        accent: (index + layer * 5) % 9 === 0,
      });
    });
    for (const [a, b] of edges.values()) bonds.push([a + offset, b + offset]);
  }

  const model = { atoms, bonds, cinematic };
  modelPoses.set(model, createPoses(model));
  return model;
}

function createPoses(model: ScienceModel): Float32Array[] {
  const poses = PHASES.map(() => new Float32Array(model.atoms.length * 3));
  model.atoms.forEach((atom, index) => {
    const [x, y, z] = atom.position;
    const layer = atom.layer - (model.cinematic ? 1.5 : 1);
    const offset = index * 3;

    poses[0].set([x, y, z], offset);

    // Separate the sheets along their normal, then fan and tilt each sheet.
    // The atoms remain connected inside each independently moving layer.
    const tilt = layer * (model.cinematic ? 0.2 : 0.13);
    poses[1].set([
      x * Math.cos(tilt) + layer * (model.cinematic ? 0.65 : 0.52),
      layer * (model.cinematic ? 1.55 : 1.6) + x * Math.sin(tilt),
      z + layer * (model.cinematic ? 0.65 : 0.23),
    ], offset);

    // Stable spherical dispersion provides an exploded view of individual
    // atoms. Golden-angle indexing avoids unstable random frame positions.
    const latitude = 1 - (2 * (index + 0.5)) / model.atoms.length;
    const ringRadius = Math.sqrt(1 - latitude * latitude);
    const azimuth = index * GOLDEN_ANGLE;
    const shellRadius = model.cinematic
      ? 3.5 + (0.5 + 0.5 * Math.sin(index * 1.71)) * 1.9
      : 2.7 + Math.sin(index * 1.71) * 0.18;
    poses[2].set([
      Math.cos(azimuth) * ringRadius * shellRadius * (model.cinematic ? 1.4 : 1) + x * 0.08,
      latitude * (model.cinematic ? 3.3 : 2.9) + Math.sin(index * 0.73) * 0.08,
      Math.sin(azimuth) * ringRadius * shellRadius * (model.cinematic ? 1.0 : 0.87),
    ], offset);

    // Reconnect into a gently buckled stack before rolling the three sheets.
    poses[3].set([
      x * 1.12,
      layer * (model.cinematic ? 0.72 : 0.59) + Math.sin(x * 1.3) * 0.62 + Math.cos(z * 1.8) * 0.1,
      z * 0.96,
    ], offset);

    // Layer-specific radii form nested curved surfaces, changing internal
    // atom positions rather than applying one transform to a flat image.
    const bendAngle = x * (model.cinematic ? 0.7 : 0.92);
    const bendRadius = (model.cinematic ? 2.05 : 1.52) + layer * 0.42;
    poses[4].set([
      Math.sin(bendAngle) * bendRadius,
      Math.cos(bendAngle) * bendRadius - 1.02,
      z * 0.97 + layer * 0.07,
    ], offset);
  });
  return poses;
}

/** Write XYZ positions into a reusable buffer; no allocations during sampling. */
export function sampleSciencePositions(
  model: ScienceModel,
  progress: number,
  target: Float32Array,
): void {
  const coordinateCount = model.atoms.length * 3;
  if (target.length < coordinateCount) {
    throw new RangeError(`Science positions require ${coordinateCount} coordinates`);
  }

  let poses = modelPoses.get(model);
  if (!poses) {
    poses = createPoses(model);
    modelPoses.set(model, poses);
  }

  const p = Number.isNaN(progress) ? 0 : Math.min(1, Math.max(0, progress));
  let phase = 0;
  while (phase < PHASES.length - 2 && p > PHASES[phase + 1]) phase++;
  const local = (p - PHASES[phase]) / (PHASES[phase + 1] - PHASES[phase]);
  // Quintic interpolation has zero first and second derivatives at phase
  // boundaries, keeping every atom continuous through scroll direction changes.
  const blend = local * local * local * (local * (local * 6 - 15) + 10);
  const from = poses[phase];
  const to = poses[phase + 1];
  for (let i = 0; i < coordinateCount; i++) {
    target[i] = from[i] + (to[i] - from[i]) * blend;
  }
}
