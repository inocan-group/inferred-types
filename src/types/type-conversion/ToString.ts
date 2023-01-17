
import { Concat } from "src/runtime/lists/Concat";
import { Join } from "src/runtime/lists/Join";
import { AnyObject, IsUndefined } from "../boolean-logic";
import { IfRef } from "../boolean-logic/IfRef";
import { IfLiteral } from "../boolean-logic/IsLiteral";
import { AnyFunction } from "../functions/function-types";
import { Keys } from "../Keys";
import { ExtractStrings } from "../lists/extractors";
import { Narrowable } from "../Narrowable";


/**
 * **ToString**
 * 
 * Converts any type into a string representation.
 * This utility works as advertised but is in early stages
 * so expect it to be refined over time.
 */
export type ToString<T extends Narrowable> = T extends string
  ? T
  : T extends number ? IfLiteral<T, `${T}`, `${number}`>
  : T extends boolean ? IfLiteral<T, `${T}`, `${boolean}`>
  : T extends null ? "null"
  : IsUndefined<T> extends true ? "undefined"
  : T extends AnyObject ? IfRef<
      T,
      Concat<["Ref<", T extends { value: Narrowable } ? ToString<T["value"]> : "", ">"]>,
      Concat<["Object: [", Join<ExtractStrings<Keys<T>>, ", ">, "]"]>
    >
  : T extends string[] ? "string[]"
  : T extends number[] ? "number[]"
  : T extends boolean[] ? "boolean[]"
  : T extends AnyFunction[] ? "Function[]"
  : "unknown";
