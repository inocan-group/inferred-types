import { AfterFirst, As, Dictionary, EmptyObject, ExpandDictionary, First, IndexOf, Keys, MergeObjects, ObjectKey } from "../..";
import { Constant } from "../../../constants/Constant";
import { IsEqual, IsErrorCondition, IsFalse, IsNever } from "../operators";

export type OnPassRemap<
  TNever = unknown,
  TFalse = unknown,
  TError = unknown,
> = {
  never: TNever;
  false: TFalse;
  error: TError;
}

type Merge<
  A extends Partial<OnPassRemap>,
  TKeys extends readonly (ObjectKey & keyof A)[],
  TConfig extends OnPassRemap = { never: never; false: false; error: Constant<"not-set"> }
> = [] extends TKeys
  ? TConfig
  : Merge<
    A,
    AfterFirst<TKeys>,
    As<ExpandDictionary<
      Record<First<TKeys>, A[First<TKeys>]>
      & Omit<TConfig, First<TKeys>>
    >, OnPassRemap>
  >

type x = Merge<{ error: "hi" }, ["error"]>;


type Process<
  TTest,
  TPass,
  TRemap extends OnPassRemap<unknown, unknown, unknown>
> = [IsNever<TTest>] extends [true]
  ? TRemap["never"]
  : [IsErrorCondition<TTest>] extends [true]
  ? TRemap["error"] extends Constant<"not-set"> ? TTest : TRemap["error"]
  : [IsFalse<TTest>] extends [true]
  ? TRemap["false"]
  : TPass;

/**
 * **OnPass**`<TTest, TPass,[TRemap],[TFalse]>`
 * 
 * Branching utility which evaluates `TTest` for being
 * `never`, `false`, or an `ErrorCondition` and
 * passes that through when it occurs.
 * 
 * In all other cases, the type of `TPass` is proxied through
 * as the type.
 * 
 * - the `TRemap` allows you to remap error conditions
 * as well if needed
 */
export type OnPass<
  TTest,
  TPass,
  TRemap extends Partial<OnPassRemap<unknown, unknown, unknown>> = OnPassRemap<never, false, Constant<"not-set">>
> =

  Process<
    TTest,
    TPass,
    TRemap extends OnPassRemap<never, false, Constant<"not-set">>
    ? TRemap
    : Merge<TRemap, Keys<TRemap>>
  >;


