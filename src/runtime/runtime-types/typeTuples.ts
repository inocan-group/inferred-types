/* eslint-disable @typescript-eslint/no-explicit-any */
import { ALPHA_CHARS } from "src/constants";
import {  AlphaChar, Digit,  } from "../../types/base";
import {  createTypeTuple, kind } from "src/runtime";

const digit = createTypeTuple(
  kind.explicitType<Digit>("Digit"),
  <T>(val: T): val is Digit & T => {
    return typeof val === "string" && ["0","1","2","3","4","5","6","7","8","9"].includes(val);
  },
  "A numeric digit (aka, 0-9)"
);

const alpha = createTypeTuple(
  kind.explicitType<AlphaChar>("AlphaChar"),
  <T>(val: T): val is T & AlphaChar => {
    return typeof val === "string" && ALPHA_CHARS.includes(val as AlphaChar);
  },
  "A alpha (upper or lowercase)"
);



// const alphaLowercase = createTypeTuple(
//   runtimeType.explicitType<Join<LowerAlphaChar[]>>(),
//   <T>(val: T): val is T & Lowercase<T> => {
//     return typeof val === "string" && split(val).every(i => LOWER_ALPHA_CHARS.includes(i as LowerAlphaChar));
//   },
//   "A string with lowercase alphabetic characters"
// );

// const alphaUppercase = createTypeTuple(
//   runtimeType.explicitType<Join<UpperAlphaChar[]>>(),
//   <T>(val: T): val is T & Join<UpperAlphaChar[]> => {
//     return typeof val === "string" && split(val).every(i => LOWER_ALPHA_CHARS.includes(i as any));
//   },
//   "A string with uppercase alphabetic characters"
// );

/**
 * **typeTuples**
 * 
 * A dictionary of `TypeTuple` definitions
 */
export const typeTuples = {
  digit,
  alpha,
  // alphaLowercase,
  // alphaUppercase
} as const;

