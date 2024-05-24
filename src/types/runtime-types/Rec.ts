/* eslint-disable @typescript-eslint/ban-types */

import { Dictionary } from "../base-types";


const s = Symbol("Rec");

/**
 * **Dict**`<T, ID>`
 * 
 * A nominal replacement for Javascript object's with precisely
 * the same functionality but with a hashed type which allows
 * use of `let` instead of `const` for object definitions due 
 * to the type not being able to be reassigned.
 */
export type Rec<T extends Dictionary = Dictionary, ID extends string = string> = {
  [s]: ID;
} & T;


