import { UnionToTuple } from "../type-conversion";

export type OneToOne = `1:1`;
export type OneToMany = `1:M`;
export type OneToZero = `1:0`;
export type ZeroToOne = `0:1`;
export type ZeroToMany = `0:M`;
export type ZeroToZero = `0:0`;
export type ManyToMany = "M:M";
export type ManyToOne = "M:1";
export type ManyToZero = "M:0";

export type CardinalityNode = "0" | "1" | "M";

/**
 * Cardinality which expects a singular input and requires
 * 1 or many outputs.
 *
 * Note: choose `CardinalityFilter1` if you want to allow output
 * to have no outputs.
 */
export type Cardinality1 = OneToOne | OneToMany;

/**
 * Cardinality which expects a singular input and maps to 0,
 * 1, or many outputs.
 */
export type CardinalityFilter1 = OneToOne | OneToMany | OneToZero;

/**
 * Cardinality which expects a singular input which is allowed to be
 * _undefined_ or the expected type.
 */
export type Cardinality0 = ZeroToOne | ZeroToMany | OneToOne | OneToMany;

/**
 * Cardinality which expects a singular input -- which is allowed to be
 * _undefined_ -- and maps to 0,
 * 1, or many outputs.
 */
export type CardinalityFilter0 =
  | ZeroToOne
  | ZeroToMany
  | OneToOne
  | OneToMany
  | OneToZero
  | ZeroToZero;

export type CardinalityExplicit = `${number}:${number}`;

/**
 * Cardinality of any sort between two types
 */
export type Cardinality =
  | CardinalityFilter0
  | CardinalityFilter1
  | ManyToMany
  | ManyToOne
  | ManyToZero
  | CardinalityExplicit;

export type CardinalityTuple<T extends Cardinality> = UnionToTuple<T>;

/**
 * The first or _input_ part of the Cardinality relationship
 */
export type CardinalityIn<T extends Cardinality> = T extends `${infer IN}:${string}` ? IN : never;

/**
 * The second or _output_ part of the Cardinality relationship
 */
export type CardinalityOut<T extends Cardinality> = T extends `${string}:${infer OUT}`
  ? OUT
  : never;

export type CardinalityInput<T, C extends Cardinality> = CardinalityTuple<C>[0] extends 0
  ? T | undefined
  : CardinalityTuple<C>[0] extends 1
  ? T
  : T[];
