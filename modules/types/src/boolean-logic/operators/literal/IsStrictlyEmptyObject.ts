import {  IsEmptyObject } from "inferred-types/types";

/** Exclude `{}` and `object` from counting as empty */
export type IsStrictEmptyObject<T> =
  IsEmptyObject<T> extends true
    ? (unknown extends T ? false : true) // filters `object` / `{}` / top-ish aliases
    : false;


