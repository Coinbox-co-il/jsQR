import { BitMatrix } from "../BitMatrix.js";
import { QRLocation } from "../locator/index.js";
export declare function extract(image: BitMatrix, location: QRLocation): {
    matrix: BitMatrix;
    mappingFunction: (x: number, y: number) => {
        x: number;
        y: number;
    };
};
