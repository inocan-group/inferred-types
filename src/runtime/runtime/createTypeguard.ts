import { AnyObject, TypeGuard } from "src/types";
import { isIntersectionType, isObjectType, isStringLiteralType, isTupleType, isUnionType } from "src/types/runtime-types/runtime-type-guards";
import { Type, TypeKind } from "src/types/runtime-types/Type";
import { keys } from "../keys";
import { ifArray, isArray, isObject } from "../type-checks";


const allowUndef = <T extends Type, V>(defn: T, value: V): boolean => {
  return typeof value === "undefined" && !defn.isRequired ? true : false;
};

/**
 * Type guards which assume that `isRequired` is true.
 */
const guards =(
  <D extends Type>(defn: D) => ({
  string(t: unknown): t is D["type"] {
    return typeof t === "string" || allowUndef(defn, t) ? true : false;
  },
  number(t: unknown): t is D["type"] {
    return typeof t === "number" || allowUndef(defn, t) ? true : false;
  },
  null(t: unknown): t is D["type"] {
    return (typeof t === "object" && t === null) || allowUndef(defn, t);
  },
  undefined(t: unknown): t is D["type"] {
    return typeof t === "undefined" ;
  },
  boolean(t: unknown): t is D["type"] {
    return typeof t === "boolean" || allowUndef(defn, t);
  },
  true(t: unknown): t is D["type"] {
    return t === true || allowUndef(defn, t);
  },
  false(t: unknown): t is D["type"] {
    return t === true || allowUndef(defn, t);
  },
  stringLiteral(t): t is D["type"]  {
    return (
      isStringLiteralType(defn) && 
      typeof t === "string" && 
      defn.underlying && 
      defn.underlying.includes(t)
    ) || allowUndef(defn, t);
  },
  numericLiteral(t): t is D["type"]  {
    return (
      typeof t === "number" && 
      defn.underlying && 
      Array.isArray(defn.underlying) && 
      defn.underlying.includes(t)
    ) || allowUndef(defn, t);
  },
  anyFunction(t): t is D["type"] {
    return typeof t === "function" || allowUndef(defn, t);
  },
  anyArray(t): t is any[] {
    return isArray(t) || allowUndef(defn, t);
  },
  anyObject(t): t is Record<string, any> {
    return isObject(t) || allowUndef(defn, t);
  },
  unknownObject(t): t is Record<string, any> {
    return isObject(t) || allowUndef(defn, t);
  },
  arrayOf(t): t is D["type"] {
    return ifArray(
      t, 
      v => v.every(i => defn.is(i)),
      () => false
    );
  },
  emptyObject(t): t is {} {
    return typeof t === "object" && keys(t as Record<string, any>).length === 0;
  },
  explicitFunctions(t): t is D["type"] {
    return typeof t === "function"; 
  },
  fnType(t): t is D["type"] {
    return typeof t === "function"; 
  },
  fnWithDict(t): t is D["type"] {
    return typeof t === "function"; 
  },
  intersection(t): t is D["type"] {
    return isIntersectionType(defn)
      ? defn.underlying.every(i => i.is(t))
      : false;
  },
  union(t): t is D["type"] {
    return isUnionType(defn)
      ? defn.underlying.some(i => i.is(t))
      : false;
  },
  object(t): t is D["type"] {
    const basics = typeof t === "object" && t !== null && isObjectType(defn);
    const validKeys: string[] = basics ? defn.underlying.map(i => i.key) : [];
    const props = basics 
    ? validKeys.reduce(
      (_acc, k) => k in (t as AnyObject) && 
        defn.underlying.find(i => i.key === k).is((t as AnyObject)[k]),
        true
    ) 
    : false;

    return basics && props;
  },
  tuple(t): t is D["type"] {
    return (
      Array.isArray(t) &&
      isTupleType(defn) &&
      t.every((v, idx) => defn.underlying[idx].is(v))
    );
  },
  


})) satisfies ((t: Type) => Record<TypeKind, TypeGuard<any>>);

export function createTypeGuard<T extends Type>(defn: T): T {
  return {
    ...defn,
    is: guards(defn)[defn.kind] as TypeGuard<T["type"]>,
  } as T;
}
