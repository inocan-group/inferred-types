/* eslint-disable @typescript-eslint/no-explicit-any */
import {  AlphaChar, Digit, LowerAlphaChar } from "src/types";
import {  createTypeTuple, split } from "src/runtime";
import { ALPHA_CHARS, LOWER_ALPHA_CHARS, runtimeType } from "src/constants";

const digit = createTypeTuple(
  runtimeType.explicitType<Digit>(),
  <T>(val: T): val is Digit & T => {
    return typeof val === "string" && ["0","1","2","3","4","5","6","7","8","9"].includes(val);
  },
  "A numeric digit (aka, 0-9)"
);

const alpha = createTypeTuple(
  runtimeType.explicitType<AlphaChar>(),
  <T>(val: T): val is T & AlphaChar => {
    return typeof val === "string" && ALPHA_CHARS.includes(val as AlphaChar);
  },
  "A alpha (upper or lowercase)"
);

function convertToLowercase<T>(val: T): val is T & Lowercase<T & string> {
  return typeof val === "string" && LOWER_ALPHA_CHARS.includes(val as LowerAlphaChar);
}

const alphaLowercase = createTypeTuple(
  runtimeType.explicitType<AlphaChar[]>(),
  convertToLowercase,
  "A lowercase alpha"
);

const alphaUppercase = createTypeTuple(
  runtimeType.explicitType<AlphaChar[]>(),
  <T>(val: T): val is T => {
    return typeof val === "string" && split(val).every(i => LOWER_ALPHA_CHARS.includes(i as any));
  },
  "An uppercase alphabetic character"
);

/**
 * **typeTuples**
 * 
 * A dictionary of `TypeTuple` definitions
 */
export const typeTuples = {
  digit,
  alpha,
  alphaLowercase,
  alphaUppercase
} as const;
