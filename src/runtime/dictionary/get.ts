import type { 
  Narrowable,  
  DotPath, 
  DotPathFor, 
  Get, 
  Suggest, 
  ReportError
} from "src/types";
import {
  NO_DEFAULT_VALUE,
  NoDefaultValue
} from "src/constants";
import { 
  hasDefaultValue, 
  isTruthy,  
  isRef, 
  hasIndexOf, 
  isSpecificConstant, 
  createErrorCondition, 
  NotDefined,
  split,
  NOT_DEFINED 
} from "src/runtime";


/** updates based on whether segment is a Ref or not */
function updatedDotPath<
  TValue extends Narrowable, 
  TDotPath extends string,
  TSegment extends string
>(value: TValue, dotpath: TDotPath, segment: TSegment) {
  return isRef(value)
  ? dotpath.replace(segment, `Ref(${segment})`)
  : dotpath;
}

/**
 * **getValue**(value, dotpath, defaultValue, handler, fullDotPath)
 */
function getValue<
  TValue extends Narrowable, 
  TDotPath extends string,
  TDefVal extends Narrowable,
  TInvalid extends Narrowable,
  TFullDotPath extends string,
>(
  value: TValue, 
  dotPath: DotPath<TDotPath>,
  defaultValue: TDefVal,
  handleInvalid: TInvalid,
  fullDotPath: TFullDotPath
) {  
  
  /** the remaining segments that need processing */
  const pathSegments: string[] = isTruthy(dotPath)
    ? split(dotPath, ".") || []
    : [];
  /** current index property */
  const idx = pathSegments[0];

  /** dotpath will need to recurse further tot
   * q reach destination */
  const hasMoreSegments = pathSegments.length > 1;

  /** whether or not the value is indexable or not */
  const valueIsIndexable = hasIndexOf(value, idx);

  /** has handler for invalid dotpath */
  const hasHandler = !isSpecificConstant("not-defined")(handleInvalid);

  const errors = createErrorCondition(`get(value, "${updatedDotPath(value,fullDotPath, idx)}", ${hasDefaultValue(defaultValue) ? `${String(defaultValue)}` : "[defValue]"})`);
  const invalidDotPath = errors("invalid-dot-path")(`The segment "${idx}" in the dotpath "${updatedDotPath(value,fullDotPath, idx)}" was not indexable and no default value existed.`);

  const current = (
    hasMoreSegments
    ? hasIndexOf(value, idx)
      ? getValue(
          value[idx], pathSegments.slice(1).join("."), defaultValue, handleInvalid, updatedDotPath(value,fullDotPath, idx)
        )
      : hasHandler
        ? handleInvalid 
        : invalidDotPath
    : valueIsIndexable
      ? hasDefaultValue(hasDefaultValue) ? value[idx] || defaultValue : value[idx] 
      : hasHandler ? handleInvalid : invalidDotPath
  ) as ReportError<Get<TValue, TDotPath>>;

  return current;
}

export interface GetOptions<
  TDefVal extends Narrowable,
  TInvalid extends Narrowable
> {
  /**
   * Typically when getting a valid dotpath and the value evaluates to _undefined_
   * then the value returned is _undefined_ but if you'd prefer to put something else
   * in here you may.
   */
  defaultValue?: TDefVal;
  /**
   * Typically when a dotpath is invalid for a given item then this item
   * is set as a `ErrorCondition<'invalid-dot-path'>` but if you'd like
   * to set it to something else you may.
   * 
   * Note: a common replacement would be the `Never` constant from this library
   * as it "reports" as being `never` but allows for a more sophisticated 
   * handling process to follow.
   */
  handleInvalidDotpath?: TInvalid;
}


/**
 * **get**(obj, dotPath, [defVal])
 *
 * Gets a value in a deeply nested object while attempting to preserve type information
 * (a default value is allowed as optional param).
 * 
 * - if the dot-path is invalid then an `ErrorCondition` will be returned, unless 
 * a defaultValue is provided in which case this will be returned instead
 * - this function is also VueJS _aware_ in the sense that it can also traverse 
 * VueJS `ref` properties when encountered
 * 
 * ```ts
 * const prop = get(obj, "foo.bar.baz", "nothing there chief!");
 * ```
 */
export function get<
  TValue extends Narrowable | readonly unknown[], 
  TDotPath extends Suggest<DotPathFor<TValue>> | null, 
  TDefVal extends Narrowable = NoDefaultValue,
  TInvalid extends Narrowable = NotDefined
>(
    value: TValue, 
    dotPath: TDotPath, 
    options: GetOptions<TDefVal, TInvalid> = {
      defaultValue: NO_DEFAULT_VALUE,
      handleInvalidDotpath: NOT_DEFINED
    } as GetOptions<TDefVal, TInvalid>
) {
  return (
    dotPath === null || dotPath === ""
      ? value
      : getValue(
          value, 
          String(dotPath),
          options?.defaultValue || NO_DEFAULT_VALUE, 
          options?.handleInvalidDotpath || NOT_DEFINED,
          String(dotPath)
        )
  ) as Get<TValue, TDotPath>;

}
