import { SHAPE_DELIMITER, SHAPE_PREFIXES } from "src/constants/Shape";
import { 
  IndexableObject, 
  ObjectKey,
  IfDoneFn, 
  IfTrue, 
  IfUndefined,
  Narrow, 
  Shape, 
  ShapeTupleOrUnion, 
  ShapeApi, 
  ShapeCallback, 
  WideTypeName, 
  TupleToUnion
} from "src/types/index";
import { isString } from "../type-guards/isString";
import { hasKeys, isObject, isUndefined } from "../type-guards/index";

const isAddOrDone = <T>(val: T): val is ShapeTupleOrUnion & T => {
  return isObject(val) && hasKeys("add","done") && typeof val.done === "function" && typeof val.add === "function"
}

const shapeTupleOrUnion = <
  TTuple extends readonly Narrow[],
  TMakeUnion extends boolean,
>(state: TTuple, makeUnion: TMakeUnion) => {
  const api:  ShapeTupleOrUnion<TTuple,TMakeUnion> = {
    add: <TAdd extends Narrow>(a: TAdd) => shapeTupleOrUnion([...state, a], makeUnion),
    done: () => (
      makeUnion
        ? `<<union::${state.join(SHAPE_DELIMITER)}>>` as unknown as TupleToUnion<TTuple>
        : `<<tuple::${state.join(SHAPE_DELIMITER)}>>` as unknown as TTuple
    ) as IfTrue<TMakeUnion, TupleToUnion<TTuple>, TTuple>
  };

  return api;
}

export const ShapeApiImplementation: ShapeApi = {
  string: () => "<<string>>" as string,
  number: () => "<<number>>" as unknown as number,
  boolean: () => "<<boolean>>" as unknown as boolean,
  unknown: () => "<<unknown>>" as unknown,
  undefined: () => "<<undefined>>" as unknown as undefined,
  null: () => "<<null>>" as unknown as null,
  object: <I extends boolean>(indexable?: I) => (
    indexable 
      ? "<<object::indexable>>" as unknown as IndexableObject
      : "<<object>>" as unknown as object
    ) as IfTrue<I, IndexableObject, object>,
  record: {
    string: () => "<<record::string>>" as unknown as Record<ObjectKey, string>,
    number: () => "<<record::number>>" as unknown as Record<ObjectKey, number>,
    boolean: () => "<<record::boolean>>" as unknown as Record<ObjectKey, boolean>,  
    unknown: () => "<<record::unknown>>" as unknown as Record<ObjectKey, unknown>,
    union: <
      U extends readonly WideTypeName[]
    >(...members: U) => (
      `<<union:${isUndefined(members) ? [] : members}.join(SHAPE_DELIMITER)>>`
    ) as unknown as IfUndefined<U,NonNullable<unknown>, Record<ObjectKey, TupleToUnion<U>>>
  },
  array: {
    string: () => "<<array::string>>" as unknown as string[],
    number: () => "<<array::number>>" as unknown as number[],
    boolean: () => "<<array::boolean>>" as unknown as boolean[],  
    unknown: () => "<<array::unknown>>" as unknown as unknown[],  
  },
  literals: <T extends readonly Narrow[]>(...literals: T) => shapeTupleOrUnion(literals, true),
  tuple: <T extends Narrow>(item: T) => shapeTupleOrUnion([item], false),
  opt: {
    string: () => "<<opt::string>>" as string | undefined,
    number: () => "<<opt::number>>" as unknown as number | undefined,
    boolean: () => "<<opt::boolean>>" as unknown as boolean | undefined,  
    unknown: () => "<<opt::boolean>>" as unknown as unknown | undefined,  
    null: () => "<<opt::boolean>>" as unknown as null | undefined,  
  },
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
>(cb: T): IfDoneFn<ReturnType<T>> => {
  const rtn = cb(ShapeApiImplementation);
  return (
    isAddOrDone(rtn) ? rtn.done() : rtn
  ) as unknown as IfDoneFn<ReturnType<T>>;
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
