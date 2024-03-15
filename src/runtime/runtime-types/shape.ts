import { HasDoneFn, IfTrue } from "src/types/boolean-logic";
import { Narrowable, Shape } from "src/types/literals";
import { TupleToUnion } from "src/types/type-conversion";
import { isString } from "../type-guards/isString";
import { SHAPE_PREFIXES } from "src/constants/Shape";
import { hasKeys, isObject } from "../type-guards";

type Narrow = Exclude<Narrowable, symbol>;

type AddOrDone<
  TTuple extends readonly Narrow[] = Narrow[],
  TMakeUnion extends boolean = boolean,
> = {
  add: <
    TAdd extends Narrow
  >(a: TAdd) => AddOrDone<[...TTuple, TAdd], TMakeUnion>;
  done: () => IfTrue<TMakeUnion, TupleToUnion<TTuple>, TTuple>;
}

const isAddOrDone = <T>(val: T): val is AddOrDone & T => {
  return isObject(val) && hasKeys("add","done") && typeof val.done === "function" && typeof val.add === "function"
}

const addOrDone = <
  TTuple extends readonly Narrow[],
  TMakeUnion extends boolean,
>(state: TTuple, makeUnion: TMakeUnion) => {
  const api:  AddOrDone<TTuple,TMakeUnion> = {
    add: <TAdd extends Narrow>(a: TAdd) => addOrDone([...state, a], makeUnion),
    done: () => (
      makeUnion
        ? `<<union::${state.join(",")}>>` as unknown as TupleToUnion<TTuple>
        : `<<tuple::${state.join(",")}>>` as unknown as TTuple
    ) as IfTrue<TMakeUnion, TupleToUnion<TTuple>, TTuple>
  };

  return api;
}

export type ShapeApi = {
  string: () => string;
  number: () => number;
  boolean: () => boolean;
  object: () => object;
  literals: <T extends Narrow>(literal: T) => AddOrDone<[T], true>;
  tuple: <T extends Narrow>(literal: T) => AddOrDone<[T], false>;
  null: () => null;
  undefined: () => undefined;
  optional: {
    string: () => string | undefined;
    number: () => number | undefined;
    boolean: () => boolean | undefined;
  };
}

export type ShapeCallback = (api: ShapeApi) => unknown;

const api: ShapeApi = {
  string: () => "<<string>>" as string,
  number: () => "<<number>>" as unknown as number,
  boolean: () => "<<boolean>>" as unknown as boolean,
  object: () => "<<object>>" as unknown as object,
  literals: <T extends Narrow>(literal: T) => addOrDone([literal], true),
  tuple: <T extends Narrow>(item: T) => addOrDone([item], false),
  null: () => "<<null>>" as unknown as null,
  undefined: () => "<<undefined>>" as unknown as undefined,
  optional: {
    string: () => "<<opt::string>>" as string | undefined,
    number: () => "<<opt::number>>" as unknown as number | undefined,
    boolean: () => "<<opt::boolean>>" as unknown as boolean | undefined,  
  }
}

/**
 * **shape**(s => s.[API])
 * 
 * Provides a callback API to allow for defining a type (_which 
 * retains a runtime value which will map back to the type_)
 * 
 * **Related:** `isShape(val)`
 */
export const shape = <
  T extends ShapeCallback
>(cb: T): HasDoneFn<ReturnType<T>> => {
  const rtn = cb(api);
  return (
    isAddOrDone(rtn) ? rtn.done() : rtn
  ) as unknown as HasDoneFn<ReturnType<T>>;
}

/**
 * **isShape**(val)
 * 
 * Type guard which tests whether a value is a _type_ defined by a `Shape`.
 */
export const isShape = (v: unknown): v is Shape => {
  return isString(v) && 
    v.startsWith("<<") && 
    v.endsWith(">>") && 
    SHAPE_PREFIXES.some(i => v.startsWith(`<<${i}`))
    ? true : false
}
