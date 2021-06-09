/* eslint-disable no-use-before-define */

import { Narrowable } from "~/types";

/**
 * Takes an object as input --which has an `id` property and returns it as the same
 * run-time content but with the _type_ of the `id` property being forced to a literal type
 */
export function idLiteral<T extends { id: I }, I extends PropertyKey>(o: T): T & { id: T["id"] } {
  return { ...o, id: o.id };
}

/**
 * Takes an object as input --which has an `name` property and returns it as the same
 * run-time content but with the _type_ of the `name` property being forced to a literal type
 */
export function nameLiteral<T extends { name: I }, I extends PropertyKey>(
  o: T
): T & { name: T["name"] } {
  return o;
}

/**
 * Takes an object as input --which has an `kind` property and returns it as the same
 * run-time content but with the _type_ of the `kind` property being forced to a literal type
 */
export function kindLiteral<T extends { kind: I }, I extends PropertyKey>(
  o: T
): T & { kind: T["kind"] } {
  return o;
}

export function idTypeGuard<T extends { id: I }, I extends PropertyKey>(
  _o: T
): _o is T & { id: I } {
  return true;
}

/**
 * Takes an object as input and infers the narrow literal types of the property
 * values on the object.
 * 
 * > Note: this addresses this [a known TS gap](https://github.com/microsoft/TypeScript/issues/30680). 
 * > Hopefully at some point this will be addressed in the language.
 */
export function literal<N extends Narrowable, T extends Record<keyof T, N>>(obj: T) {
  return obj;
}
