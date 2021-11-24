import { BufferAttribute, InterleavedBufferAttribute } from 'three';

/**
 * Example with BoxGeometry
 *
 * Corner groups:
 * 0 11 17
 * 1  9 20
 * 2 13 19
 * 3 15 22
 * 4  8 21
 * 5 10 16
 * 6 14 23
 * 7 12 18
 *
 *     1+---------+0
 *     /         /|
 *   +---------+  |
 *   | 3+      |  +2
 *   |         | /
 *   +---------+
 *
 *      +---------+
 *     /         /|
 *  4+---------+5 |
 *   |  +      |  +
 *   |         | /
 *  6+---------+7
 *
 *     9+---------+11
 *     /         /|
 *  8+---------+10|
 *   |  +      |  +
 *   |         | /
 *   +---------+
 *
 *      +---------+
 *     /         /|
 *   +---------+  |
 *   |15+      |  +13
 *   |         | /
 * 14+---------+12
 *
 *      +---------+17
 *     /         /|
 *   +---------+16|
 *   |  +      |  +19
 *   |         | /
 *   +---------+18
 *
 *    20+---------+
 *     /         /|
 * 21+---------+  |
 *   |22+      |  +
 *   |         | /
 * 23+---------+
 */
export const applyOffsetXYZ = (
  buffer: BufferAttribute | InterleavedBufferAttribute,
  index: number | number[],
  offsetX: number,
  offsetY: number,
  offsetZ: number
): void => {
  const list: number[] = typeof index === 'number' ? [index] : index;
  list.map((i) => {
    buffer.setXYZ(
      i,
      buffer.getX(i) + offsetX,
      buffer.getY(i) + offsetY,
      buffer.getZ(i) + offsetZ
    );
  });
};

export const getSameVerticesIndexes = (
  buffer: BufferAttribute | InterleavedBufferAttribute,
  index: number
): number[] => {
  const indexes: number[] = [];

  const x = buffer.getX(index);
  const y = buffer.getY(index);
  const z = buffer.getZ(index);

  for (let i = 0; i < buffer.array.length; i++) {
    if (x === buffer.getX(i) && y === buffer.getY(i) && z === buffer.getZ(i)) {
      indexes.push(i);
    }
  }

  return indexes;
};

export const applyOffsetXYZAs = (
  buffer: BufferAttribute | InterleavedBufferAttribute,
  index: number,
  offsetX: number,
  offsetY: number,
  offsetZ: number
): void => {
  const indexes: number[] = getSameVerticesIndexes(buffer, index);
  applyOffsetXYZ(buffer, indexes, offsetX, offsetY, offsetZ);
};
