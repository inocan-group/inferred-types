import {
  AtomicToken,
  If,
  IsLength,
  Join,
  SimpleType,
  TypeTokenAtomics,
  TypeTokenKind,
  TypeTokenSingletons
} from "src/types/index";
import {
  isAtomicToken,
  isSingletonToken
} from "../type-guards/tokens";

type BaseReturn<TBase extends TypeTokenKind> = TBase extends TypeTokenAtomics
  ? `<<${TBase}>>`
  : TBase extends TypeTokenSingletons
  ? SingletonClosure<TBase>
  : unknown;


export type UnionClosure = <T extends readonly unknown[]>(...elements: T) =>
  `union::[${Join<T, ", ">}]`;

/**
 * **SingletonClosure**
 *
 * Closes out the `string` or `number` base types to conclude as
 * either a wide type or a string literal. It does allow for multiple
 * literal values and in this case will need to add a union token as
 * a parameter
 *
 * ```ts
 * // <<string>>
 * const a = closure<"string">();
 * // <<string::foo>>
 * const b = closure<"string">("foo");
 * // <<string::${UnionClosure("foo", "bar")}>>
 * const c = closure<"string">("foo","bar");
 * ```
 */
export type SingletonClosure<T extends "string" | "number"> = <
  TLit extends readonly SimpleType<T>[]
>(...literals: TLit) => If<
      IsLength<TLit, 0>,
      `<<${T}>>`,
      If<
        IsLength<TLit, 1>,
        `<<${T}::${TLit[0]}>>`,
        `<<${T}::>>`
      >
    >;

const unionToken = <
  TElements extends readonly unknown[]
>(...els: TElements) => {
  return `<<union::[${JoinJsonValues<TElements>}]>>`
}


const singleton = <T extends TypeTokenSingletons>(base: T): SingletonClosure<T> => (lits) => {
  return (
    lits.length === 0
      ? base === "string" ? `<<string>>` : `<<number>>`
      : lits.length === 1
        ? base === "string" ? `<<string::${lits[0]}>>` : `<<number::${lits[0]}>>`
        : base === "string"
          ? `<<string::${unionToken(...lits)}>>`
          : `<<number::${unionToken(...lits)}>>`
  )
}

export const createShapeToken = <
  TBase extends TypeTokenKind
>(base: TBase): BaseReturn<TBase> => {
  return (
    isAtomicToken(base)
    ? `<<${base}>>` as AtomicToken<TBase>
    : isSingletonToken(base)
      ? singleton(base)
      : ""
  ) as unknown as BaseReturn<TBase>
}


const a = createShapeToken("true");
