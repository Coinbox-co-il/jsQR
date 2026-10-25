import * as fs from "node:fs/promises";
import * as png from "upng-js";

import { BitMatrix } from "../src/BitMatrix";

export function bitMatrixToPng(matrix: BitMatrix) {
  const output = new Uint8ClampedArray(matrix.width * matrix.height * 4);
  for (let y = 0; y < matrix.height; y++) {
    for (let x = 0; x < matrix.width; x++) {
      const v = matrix.get(x, y);
      const i = (y * matrix.width + x) * 4;
      output[i + 0] = v ? 0x00 : 0xff;
      output[i + 1] = v ? 0x00 : 0xff;
      output[i + 2] = v ? 0x00 : 0xff;
      output[i + 3] = 0xff;
    }
  }
  return Buffer.from(png.encode([output.buffer], matrix.width, matrix.height, 0));
}

export async function loadPng(path: string) {
  const file = await fs.readFile(path);
  const data = png.decode(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength));
  const out: {
    data: Uint8ClampedArray,
    height: number,
    width: number,
  } = {
    data: new Uint8ClampedArray(png.toRGBA8(data)[0]),
    height: data.height,
    width: data.width,
  };
  return out;
}

export async function loadBinarized(path: string) {
  const image = await loadPng(path);
  const out = BitMatrix.createEmpty(image.width, image.height);
  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      out.set(x, y, image.data[(y * image.width + x) * 4] === 0x00);
    }
  }
  return out;
}
