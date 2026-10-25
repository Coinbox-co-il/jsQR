import GenericGF from "./GenericGF.js";
export default class GenericGFPoly {
    private field;
    private coefficients;
    constructor(field: GenericGF, coefficients: Uint8ClampedArray);
    degree(): number;
    isZero(): boolean;
    getCoefficient(degree: number): number;
    addOrSubtract(other: GenericGFPoly): GenericGFPoly;
    multiply(scalar: number): GenericGFPoly;
    multiplyPoly(other: GenericGFPoly): GenericGFPoly;
    multiplyByMonomial(degree: number, coefficient: number): GenericGFPoly;
    evaluateAt(a: number): number;
}
