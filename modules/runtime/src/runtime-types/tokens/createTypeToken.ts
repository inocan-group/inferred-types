import type {
  IsUnset,
  Join,
  ShapeCallback,
  SimpleToken,
  TypeTokenAtomics,
  TypeTokenContainers,
  TypeTokenFunctions,
  TypeTokenKind,
  TypeTokenLookup,
  TypeTokenSets,
  TypeTokenSingletons,
  Unset,
} from "inferred-types/types";
import {
  handleDoneFn,
  isAtomicKind,
  isFnBasedKind,
  isSet,
  isSetBasedKind,
  isSingletonKind,
  isUnset,
  unset,
} from "inferred-types/runtime";

type VariantClosure<
  TVariant extends TypeTokenKind,
> = TVariant extends TypeTokenAtomics
  ? `<<${TVariant}>>`
  : TVariant extends TypeTokenSingletons
    ? SingletonClosure<TVariant>
    : TVariant extends TypeTokenSets
      ? TokenSetClosure<TVariant>
      : TVariant extends TypeTokenFunctions
        ? TokenFunctionClosure<TVariant, Unset, Unset>
        : TVariant extends TypeTokenContainers
          ? TokenContainerClosure<TVariant>
          : never;

export type UnionClosure = <T extends readonly unknown[]>(...elements: T) =>
  `union::[${Join<T, ", ">}]`;

/**
 * **SingletonClosure**
 *
 * Closes out the `string` or `number` base types to conclude as
 * a valid Singleton Token.
 */
export interface SingletonClosure<T extends "string" | "number"> {
  wide: () => `<<${T}>>`;
  literal: <TLit extends T extends "string" ? string : number>(val: TLit) => `<<${T}::${TLit}>>`;
}

function singletonApi<
  T extends "string" | "number",
>(kind: T): SingletonClosure<T> {
  return {
    wide: () => `<<${kind}>>`,
    literal: val => `<<${kind}::${val}>>`,
  };
}

/**
 * **TokenSetClosure**
 *
 * Closes out the `string` or `number` base types to conclude as
 * a valid Singleton Token.
 */
export type TokenSetClosure<T extends TypeTokenSets> = <P extends
TypeTokenLookup<T>,
>(_p: P
) => any;

export type TokenContainerClosure<_T> = any;

function setApi<
  T extends TypeTokenSets,
>(_variant: T): TokenSetClosure<T> {
  return null as unknown as TokenSetClosure<T>;
}

/**
 * Closes out the definition of a `TypeToken` for a _function_ based token
 */
export interface TokenFunctionClosure<
  T extends TypeTokenFunctions,
  P extends (readonly (SimpleToken | ShapeCallback)[]) | Unset,
  R extends Unset | SimpleToken | ShapeCallback,
> {
  params: P extends Unset
    ? <TParams extends (readonly (SimpleToken | ShapeCallback)[]) >(
        ...p: TParams
      ) => TokenFunctionClosure<T, TParams, R>
    : never;
  returns: R extends Unset
    ? <TReturns extends SimpleToken | ShapeCallback>(
        r: TReturns
      ) => TokenFunctionClosure<T, P, TReturns>
    : never;
  done: () => IsUnset<P> extends true
    ? IsUnset<R> extends true
      ? `<<${T}>>` // TODO
      : `<<${T}::any::${string}>>`
    : IsUnset<R> extends true
      ? `<<${T}::${string}>>` // TODO
      : `<<${T}::${string}>>`; // TODO
}

function fnReturnsApi<
  T extends TypeTokenFunctions,
  P extends (readonly (SimpleToken | ShapeCallback)[]) | Unset,
  R extends SimpleToken | ShapeCallback | Unset,
>(variant: T, _params: P, returns: R): TokenFunctionClosure<T, P, R>["returns"] {
  return (
    isSet(returns)
      ? null as never
      : <TRtn extends SimpleToken | ShapeCallback | Unset>(_rtn: TRtn) => {
          return isSet(returns)
            ? `<<${variant}::>>`
            : null;
        }
  ) as unknown as TokenFunctionClosure<T, P, R>["returns"];
}

function fnParamsApi<
  T extends TypeTokenFunctions,
  P extends (readonly (SimpleToken | ShapeCallback)[]) | Unset,
  R extends SimpleToken | ShapeCallback | Unset,
>(variant: T, params: P, _returns: R): TokenFunctionClosure<T, P, R>["params"] {
  return (
    isSet(params)
      ? null as never
      : <TParams extends (readonly (SimpleToken | ShapeCallback)[]) | Unset>(
          params: TParams,
        ) => {
          return isSet(params)
            ? `<<${variant}::>>`
            : null;
        }
  ) as unknown as TokenFunctionClosure<T, P, R>["params"];
}

function fnDoneApi<
  T extends TypeTokenFunctions,
  P extends (readonly (SimpleToken | ShapeCallback)[]) | Unset,
  R extends SimpleToken | ShapeCallback | Unset,
>(variant: T, params: P, returns: R): TokenFunctionClosure<T, P, R>["done"] {
  return (
    isUnset(params) && isUnset(returns)
      ? `<<`
      : ``

  ) as unknown as TokenFunctionClosure<T, P, R>["done"];
}

function fnTokenClosure<
  T extends TypeTokenFunctions,
  P extends (readonly (SimpleToken | ShapeCallback)[]) | Unset,
  R extends SimpleToken | ShapeCallback | Unset,
>(
  kind: T,
  params: P,
  returns: R,
): TokenFunctionClosure<T, P, R> {
  return {
    done: fnDoneApi(kind, params, returns),
    params: fnParamsApi(kind, params, returns),
    returns: fnReturnsApi(kind, params, returns),
  };
}

/**
 * **createTypeToken**`(base) => (secondary) => ...`
 *
 * A higher order function designed to creating a valid
 * `TypeToken` simple through a compound process.
 */
export function createTypeToken<
  TBase extends TypeTokenKind,
>(
  kind: TBase,
): VariantClosure<TBase> {
  return (
    isAtomicKind(kind)
      ? `<<${kind}>>`
      : isSingletonKind(kind)
        ? singletonApi(kind)
        : isSetBasedKind(kind)
          ? setApi(kind)
          : isFnBasedKind(kind)
            ? handleDoneFn(fnTokenClosure(kind, unset, unset))
            : "<<never>>"
  ) as unknown as VariantClosure<TBase>;
}
