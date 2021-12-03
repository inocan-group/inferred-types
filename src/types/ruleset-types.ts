import type { TypeCondition } from "~/utility/runtime/ifTypeOf";
import { OptionalKeys } from "./props";
import { SameKeys } from "./type-conversion/SameKeys";

/**
 * **RuleDefinition**
 *
 * A rule definition is the typing for the fluent API surface that is built up
 * with the **ruleset** utility.
 */
export type RuleDefinition<
  /** the data which will be evaluated on rule execution */
  T extends object,
  /** the optional props -- as a union type -- which must be defined per the rule */
  H extends string = "",
  /** the key/values which will be evaluated on execution (wide type) */
  E extends Partial<SameKeys<T>> = {},
  /** the key/values which will be evaluated on execution (narrow type) */
  N extends Partial<SameKeys<T>> = {}
> = {
  /**
   * sets up a true/false check that a given property is defined; this
   * condition can only be applied to _optional_ properties.
   */
  has(optProp: OptionalKeys<T>): RuleDefinition<T, H & typeof optProp, E, N>;

  /**
   * Validates that a given property extends a certain value's type; comparison
   * is made assuming "wide types".
   */
  equals<K extends keyof T, V extends Pick<T, K>>(
    prop: K,
    value: V
  ): RuleDefinition<T, H, E & Record<K, V>, N>;

  /**
   * Validates that a given property extends a certain value's type; comparison
   * is made assuming "narrow types". This is only available for props which
   * expose a
   */
  narrowlyEquals<K extends keyof T, V extends Pick<T, K>>(
    prop: K,
    value: V
  ): RuleDefinition<T, H, E, N & Record<K, V>>;
};

/**
 * **DynamicRule**
 *
 * A dynamic rule allows type and runtime validation of a data structure
 * which extends a known `State`. It then returns the literal type `true`
 * or `false`.
 *
 * ```ts
 * type State = { id?: string; favorite: boolean; color: string };
 * // type-safe way to check whether optional prop is actually set
 * const rule: DynamicRule<State> = s => s
 *  .has("id")
 *  .equals("favorite", true)
 *  .equals("color", "red");
 * ```
 */
export type DynamicRule<TState extends any, TResult extends true | false> = (
  rule: TypeCondition<any, TState>
) => TResult;

/**
 * **DynamicRuleSet**
 *
 * A function which accepts the agreed `TState` generic as input and returns a discrete
 * `true` or `false` value.
 */
export type DynamicRuleSet<
  TState extends any,
  TRules extends Record<string, TypeCondition<any, TState>>
> = (rules: TRules) => true | false;
