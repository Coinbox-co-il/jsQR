import { BitMatrix } from "../BitMatrix.js";
import { GreyscaleWeights } from "../index.js";
export declare function binarize(data: Uint8ClampedArray, width: number, height: number, returnInverted: boolean, greyscaleWeights: GreyscaleWeights, canOverwriteImage: boolean): {
    binarized: BitMatrix;
    inverted: BitMatrix;
} | {
    inverted?: undefined;
    binarized: BitMatrix;
};
