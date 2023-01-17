import { DotPathFor } from "src/types/alphabetic/DotPath";
import { NO_DEFAULT_VALUE } from "src/types/constants/NoDefaultValue";
import { Narrowable } from "src/types/Narrowable";
import { Get} from "src/types";
import { split } from "../literals/split";
import { hasDefaultValue, isFalsy, isTruthy } from "../type-guards";
import { isRef } from "../type-guards/isRef";
import { IsFalsy } from "src/types/boolean-logic/IsFalsy";
import {  ReportError } from "../literals/ErrorCondition";
import { keys } from "../keys";
import { hasIndexOf } from "../type-guards/hasIndexOf";
import { createErrorCondition } from "../runtime/createErrorCondition";

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

function getValue<
  TValue extends Narrowable, 
  TDotPath extends DotPathFor<TValue>, 
  TDefVal extends Narrowable,
  TFullDotPath extends string,
>(
  value: TValue, 
  dotPath: TDotPath, 
  defaultValue: TDefVal,
  fullDotPath: TFullDotPath
) {  
  /** the remaining segments that need processing */
  const pathSegments: string[] = isTruthy(dotPath)
    ? split(dotPath, ".") || []
    : [];
  /** current index property */
  const idx = pathSegments[0];

  /** dotpath will need to recurse further to reach destination */
  const hasMoreSegments = pathSegments.length > 1;

  /** 
   * The "value" after considering Ref<T> possibility
   */
  const derefVal = isRef(value) ? value.value : value;
  /** whether or not the value is indexable or not */
  const valueIsIndexable = hasIndexOf(derefVal, idx);

  const errors = createErrorCondition(`get(value, "${updatedDotPath(value,fullDotPath, idx)}", ${hasDefaultValue(defaultValue) ? `${String(defaultValue)}` : "[defValue]"})`);
  const invalidDotPath = errors("invalid-dot-path")(`The segment "${idx}" in the dotpath "${updatedDotPath(value,fullDotPath, idx)}" was not indexable and no default value existed.`);

  console.log({idx, isRef: isRef(value), valueIsIndexable, derefVal});

  const current = (
    hasMoreSegments
    ? valueIsIndexable
      ? getValue(derefVal[idx], pathSegments.slice(1).join("."), defaultValue, updatedDotPath(value,fullDotPath, idx))
      : hasDefaultValue(defaultValue) 
        ? defaultValue 
        : invalidDotPath
    : valueIsIndexable
      ? derefVal[idx]
      : invalidDotPath
  ) as ReportError<Get<TValue, TDotPath>>;

  return current;
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
  TValue extends Narrowable, 
  TDotPath extends DotPathFor<TValue>, 
  TDefVal extends Narrowable,
>(
    value: TValue, 
    dotPath: TDotPath | undefined | null, 
    defaultValue = NO_DEFAULT_VALUE as TDefVal
) {
  return (
    isFalsy(dotPath)
    ? value // if null passed in then just pass back value
    : getValue(value, dotPath, defaultValue, dotPath) // otherwise iterate
  ) as ReportError<
    IsFalsy<TDotPath> extends true ? TValue : Get<TValue, TDotPath>
  >;
};
