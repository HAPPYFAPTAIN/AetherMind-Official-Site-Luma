export type DragRotation = [number, number, number, number];

// Both screen axes use the same CSS-pixel travel, independent of DPR/aspect.
export function dragRadiansPerPixel(width: number, height: number) {
  return Math.PI / Math.max(600, Math.min(1000, width, height));
}

/** Apply a screen-space rotation before the existing orientation. Quaternion
 * accumulation permits repeated full turns without poles, clamps or gimbal lock. */
export function rotateFromDrag(rotation: DragRotation, dx: number, dy: number, radiansPerPixel: number): DragRotation {
  const distance = Math.hypot(dx, dy);
  if (!distance) return rotation;
  const halfAngle = distance * radiansPerPixel / 2;
  const scale = Math.sin(halfAngle) / distance;
  const ax = dy * scale, ay = dx * scale, aw = Math.cos(halfAngle);
  const [bx, by, bz, bw] = rotation;
  const result: DragRotation = [
    ax * bw + aw * bx + ay * bz,
    ay * bw + aw * by - ax * bz,
    aw * bz + ax * by - ay * bx,
    aw * bw - ax * bx - ay * by,
  ];
  const length = Math.hypot(...result);
  return result.map(value => value / length) as DragRotation;
}
