import { IsNumber, Or } from "types/boolean-logic";
import { NumberLike } from "types/numeric-literals";
import { FixedLengthArray } from "types/tuples";

type Process<
    A extends NumberLike,
    B extends NumberLike,
> = [
    ...FixedLengthArray<"0",A>,
    ...FixedLengthArray<"0",B>,
]["length"]


/**
 * **AddPositive*`<A,B>`
 *
 * Adds two positive numbers.
 */
export type AddPositive<
    A extends NumberLike,
    B extends NumberLike,
> = Process<A,B>;

