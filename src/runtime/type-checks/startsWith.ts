import { IfStartsWith, StartsWith } from "src/types/type-checks";
import { IfUndefined } from "src/types/type-checks/IsUndefined";
import { box, Box } from "../literals";

/**
 * **startsWith**
 *
 * A higher-order and type strong way to checking whether a string literal `<T>` starts with
 * another known string literal `<S>`:
 * ```ts
 * const answer = startsWith("foo")("foobar");
 * ```
 */
export const startsWith =
  <S extends string>(start: S) =>
  <T extends string>(input: T): StartsWith<T, S> => {
    return input.startsWith(start) as StartsWith<T, S>;
  };

/**
 * **IfStartsWithFn**
 *
 * A function which comes from a partial application of the `ifStartsWith()`
 * utility. This type will receive a value `<T>` and _if_ this values starts
 * with `<S>` then the callback function will executed in a type strong manner.
 */
export type IfStartsWith__Fn<
  /** The "start with" constraint */
  TStartsWith extends string,
  TIf extends Box<<T extends string>(i: `${TStartsWith}${T}`) => any>,
  TElse extends Box<(<T extends string>(i: T) => any) | undefined>
> = <T extends string>(
  val: T
) => IfStartsWith<
  T, //
  TStartsWith,
  // Condition Passes
  ReturnType<TIf["value"]>,
  // Condition Fails
  IfUndefined<
    TElse, //
    undefined,
    ReturnType<Exclude<TElse, undefined>>
  >
>;

export type IfStartsWith__Builder = <
  TStartsWith extends string,
  TIf extends <T extends string>(i: `${TStartsWith}${T}`) => any,
  TElse extends <T extends string>(i: T) => any
>(
  /** the string literal _start value_ which a string must begin with */
  start: TStartsWith,
  /** a mutation function when a value _does_ start with `TStartsWith` */
  mutIf: TIf,
  mutElse?: TElse
) => IfStartsWith__Fn<TStartsWith, Box<TIf>, Box<TElse>>;

/**
 * **ifStartsWith**
 *
 * Type strong way to move into a conditional execution block:
 * ```ts
 * // partial application
 * const mutate = ifStartsWith(
 *    "foo",
 *    i => `${i} is a foo`,
 *    i => `${i} ain't welcome in this town`
 * );
 * // type: `foobar is a foo`
 * const outcome = mutate("foobar");
 * ```
 */
export const ifStartsWith: IfStartsWith__Builder = (
  /** the string literal _start value_ which a string must begin with */
  start,
  /** a mutation function when a value _does_ start with `TStartsWith` */
  mutIf,
  mutElse
) => {
  return (input) => {
    const bIf = box(mutIf);
    const bElse = mutElse ? box(mutElse) : undefined;

    if (startsWith(start)(input)) {
      return bIf.unbox()(input);
    } else {
      return bElse ? bElse.unbox()(input) : undefined;
    }
  };
};
