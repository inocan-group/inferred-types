import type { 
  Narrowable,  
  DotPathFor, 
  Get, 
  Suggest, 
  AnyObject,
  Tuple,
  Dictionary,
} from "src/types/index";
import {
  NO_DEFAULT_VALUE,
  NoDefaultValue,
  NotDefined,
  NOT_DEFINED 
} from "src/constants/index";
import { 
  createErrorCondition,
  isTruthy,
  hasIndexOf,
  isSpecificConstant,
  hasDefaultValue,
  isContainer,
  isRef, 
  indexOf
} from "src/runtime/index";

/** updates based on whether segment is a Ref or not */
function updatedDotPath<
  TValue, 
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
  TValue, 
  TDotPath extends string,
  TDefVal extends Narrowable,
  TInvalid extends Narrowable,
  TFullDotPath extends string,
>(
  value: TValue, 
  dotPath: TDotPath,
  defaultValue: TDefVal,
  handleInvalid: TInvalid,
  fullDotPath: TFullDotPath
) {  
  
  /** the remaining segments that need processing */
  const pathSegments: string[] = isTruthy(dotPath)
    ? dotPath.split(".")
    : [];

  /** current index property */
  const idx = pathSegments[0];

  /** 
   * dotpath _will_ need to recurse further to
   * reach destination
   **/
  const hasMoreSegments = pathSegments.length > 1;

  /** whether or not the value is indexable or not */
  const valueIsIndexable = isContainer(value) && hasIndexOf(value, idx);

  /** has handler for invalid dotpath */
  const hasHandler = !isSpecificConstant("not-defined")(handleInvalid);



  const invalidDotPath = createErrorCondition(
    "invalid-dot-path",
    `The segment "${idx}" in the dotpath "${fullDotPath}" was not indexable and no default value existed on: ${JSON.stringify(value)}`
  );

  const current = (
    hasMoreSegments
    ? isContainer(value) && idx in value
      ? getValue(
          indexOf(value, idx) ,
          pathSegments.join(".").replace(`${idx}.`, ""),
          defaultValue,
          handleInvalid,
          updatedDotPath(value,fullDotPath, idx)
        )
      : hasHandler
        ? handleInvalid 
        : invalidDotPath
    : valueIsIndexable
      ? hasDefaultValue(hasDefaultValue) 
        ? indexOf(value, idx)  || defaultValue 
        : indexOf(value, idx) 
      : hasHandler ? handleInvalid : invalidDotPath
  ) as unknown as Get<TValue, TDotPath>;

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
  TDotPath extends Suggest<DotPathFor<TValue>>, 
  TDefVal extends Narrowable = NoDefaultValue,
  TInvalid extends Narrowable = NotDefined 
>(
    value: TValue, 
    dotPath: TDotPath | null, 
    options: GetOptions<TDefVal, TInvalid> = {
      defaultValue: NO_DEFAULT_VALUE,
      handleInvalidDotpath: NOT_DEFINED
    } as GetOptions<TDefVal, TInvalid>
) {
  const outcome: unknown = (
    dotPath === null || dotPath === ""
      ? value
      : getValue(
          value as Dictionary | Tuple,
          dotPath,
          options?.defaultValue || NO_DEFAULT_VALUE, 
          options?.handleInvalidDotpath || NOT_DEFINED,
          String(dotPath)
        ) as unknown
  );

  return outcome as unknown as Get<TValue,TDotPath>
}
