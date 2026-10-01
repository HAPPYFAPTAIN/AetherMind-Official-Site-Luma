export type Vec3 = [number, number, number];
export type MolecularAtom = {
  position: Vec3;
  local: Vec3;
  fragment: number;
  radius: number;
  element: "carbon" | "silver" | "cyan" | "hydrogen";
};
export type MolecularFragment = {
  center: Vec3;
  axis: Vec3;
  direction: Vec3;
  spin: number;
  travel: number;
  phase: number;
};
export type MolecularModel = {
  atoms: MolecularAtom[];
  bonds: [number, number][];
  fragments: MolecularFragment[];
};

function randomSequence(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
const normalize = ([x, y, z]: Vec3): Vec3 => {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
};
function rotate([x, y, z]: Vec3, [a, b, c]: Vec3): Vec3 {
  const y1 = y * Math.cos(a) - z * Math.sin(a);
  const z1 = y * Math.sin(a) + z * Math.cos(a);
  const x1 = x * Math.cos(b) + z1 * Math.sin(b);
  const z2 = -x * Math.sin(b) + z1 * Math.cos(b);
  return [x1 * Math.cos(c) - y1 * Math.sin(c), x1 * Math.sin(c) + y1 * Math.cos(c), z2];
}
export function smoothstep(start: number, end: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}
export function explosionAt(progress: number) {
  return smoothstep(0.12, 0.58, progress) * (1 - smoothstep(0.62, 0.98, progress));
}

/** Illustrative molecular complex, not a claimed chemical structure or simulation. */
export function createMolecularModel(): MolecularModel {
  const random = randomSequence(20260914);
  const atoms: MolecularAtom[] = [];
  const bonds: [number, number][] = [];
  const fragments: MolecularFragment[] = [];
  const connections = new Set<string>();
  const bond = (first: number, second: number) => {
    const a = Math.min(first, second), b = Math.max(first, second);
    const key = `${a}:${b}`;
    if (a !== b && !connections.has(key)) { connections.add(key); bonds.push([a, b]); }
  };
  const addFragment = (center: Vec3, size: number, orientation: Vec3, branch: boolean) => {
    const fragment = fragments.length;
    fragments.push({
      center,
      axis: normalize([random() - 0.5, random() - 0.5, random() - 0.5]),
      direction: normalize([center[0] * 0.75 + random() - 0.5, center[1] + random() - 0.5, center[2] + (random() - 0.5) * 2]),
      spin: (random() > 0.5 ? 1 : -1) * (1.6 + random() * 2.6),
      travel: 1.3 + random() * 3.4,
      phase: random() * Math.PI * 2,
    });
    const addAtom = (local: Vec3, hydrogen = false) => {
      const transformed = rotate(local, orientation);
      const r = random();
      const index = atoms.length;
      atoms.push({
        local: transformed, fragment,
        position: transformed.map((v, i) => v + center[i]) as Vec3,
        radius: (hydrogen ? 0.031 : r > .93 ? .12 : .052 + random() * .035) * size,
        element: hydrogen ? "hydrogen" : r < .15 ? "cyan" : r < .35 ? "silver" : "carbon",
      });
      return index;
    };
    const ringCount = branch ? 1 + Math.floor(random() * 2) : 2 + Math.floor(random() * 2);
    const all: number[] = [];
    let previous: number[] = [];
    for (let ring = 0; ring < ringCount; ring++) {
      const corners = random() > .3 ? 6 : 5;
      const indices: number[] = [];
      const radius = (.26 + random() * .06) * size;
      for (let k = 0; k < corners; k++) {
        const angle = k / corners * Math.PI * 2 + ring * .2;
        const local: Vec3 = [
          Math.cos(angle) * radius + ring * size * .49,
          Math.sin(angle) * radius + Math.sin(ring * 1.8) * .12,
          Math.sin(angle * 2 + ring * .8) * size * .065 + ring * .12,
        ];
        const atom = addAtom(local);
        indices.push(atom);
        all.push(atom);
        if (k > 0) bond(indices[k - 1], atom);
        if ((k + ring) % 3 === 0) {
          const stem: Vec3 = [local[0] + Math.cos(angle) * size * .22, local[1] + Math.sin(angle) * size * .22, local[2] + size * .12];
          bond(atom, addAtom(stem, true));
        }
      }
      bond(indices[indices.length - 1], indices[0]);
      if (previous.length) bond(previous[0], indices[Math.floor(corners / 2)]);
      previous = indices;
    }
    return {first: all[0], end: all[all.length - 1], fragment};
  };

  const nodes = 24;
  const core: ReturnType<typeof addFragment>[] = [];
  for (let n = 0; n < nodes; n++) {
    const angle = n / nodes * Math.PI * 2;
    const radius = 1.5 + Math.sin(angle * 3 + .4) * .27 + random() * .25;
    const center: Vec3 = [Math.cos(angle) * radius, Math.sin(angle) * radius * .83, Math.sin(angle * 2 + .5) * .7];
    core.push(addFragment(center, .72 + random() * .38, [random()*2.7, random()*2.7, angle + random()], false));
    if (n > 0) bond(core[n - 1].end, core[n].first);
    if (n > 2 && n % 3 === 0) bond(core[n - 3].first, core[n].first);
    let previous = core[n].end;
    const arms = 1 + Math.floor(random() * 3);
    for (let arm = 0; arm < arms; arm++) {
      const reach = radius + .55 + arm * .58;
      const curl = angle + Math.sin(n * 1.7 + arm) * .28;
      const armCenter: Vec3 = [Math.cos(curl) * reach * 1.04, Math.sin(curl) * reach * .92, center[2] + (random() - .5) * 1.5];
      const next = addFragment(armCenter, .65 + random() * .5, [random()*3, random()*3, curl], true);
      bond(previous, next.first);
      previous = next.end;
    }
  }
  bond(core[core.length - 1].end, core[0].first);
  // Curved molecular bridges cross the centre at different depths. The core
  // is a tangled complex, not an empty, perfectly regular ring.
  for (let bridge = 0; bridge < 3; bridge++) {
    let previous = core[bridge * 7].first;
    for (let step = 0; step < 4; step++) {
      const x = -1.05 + step * .62;
      const center: Vec3 = [x, Math.sin(step * .9 + bridge * 1.5) * .48 + (bridge - 1) * .3, Math.sin(step * .8 + bridge) * .72];
      const piece = addFragment(center, .7 + random() * .25, [random() * 2.3, random() * 2.8, random() * 3], false);
      bond(previous, piece.first); previous = piece.end;
    }
    bond(previous, core[(bridge * 7 + 12) % nodes].end);
  }
  return {atoms, bonds, fragments};
}

/** Each fragment rotates around its own center, preserving its internal rings. */
export function sampleMolecularPositions(model: MolecularModel, progress: number, target: Float32Array, time = 0) {
  if (target.length < model.atoms.length * 3) throw new RangeError("Position buffer is too small");
  const p = Number.isNaN(progress) ? 0 : Math.max(0, Math.min(1, progress));
  const burst = explosionAt(p);
  const reform = smoothstep(.66, 1, p);
  for (let i = 0; i < model.atoms.length; i++) {
    const atom = model.atoms[i];
    const f = model.fragments[atom.fragment];
    const angle = burst * f.spin + reform * .45 * Math.sin(f.phase) + (Math.sin(time * .22 + f.phase) - Math.sin(f.phase)) * .035;
    const cosine = Math.cos(angle), sine = Math.sin(angle);
    const [ux, uy, uz] = f.axis;
    const [x, y, z] = atom.local;
    const dot = ux * x + uy * y + uz * z;
    const swirl = burst * (.3 + .12 * Math.sin(f.phase));
    const cx = f.center[0] * Math.cos(swirl) - f.center[1] * Math.sin(swirl);
    const cy = f.center[0] * Math.sin(swirl) + f.center[1] * Math.cos(swirl);
    const k = i * 3;
    target[k] = x*cosine + (uy*z-uz*y)*sine + ux*dot*(1-cosine) + cx + f.direction[0]*burst*f.travel + reform * Math.sin(f.center[1]*1.4)*.28;
    target[k+1] = y*cosine + (uz*x-ux*z)*sine + uy*dot*(1-cosine) + cy + f.direction[1]*burst*f.travel*.72 + reform * Math.sin(f.center[0])*.34;
    target[k+2] = z*cosine + (ux*y-uy*x)*sine + uz*dot*(1-cosine) + f.center[2] + f.direction[2]*burst*f.travel + reform * Math.cos(f.phase)*.5;
  }
}
