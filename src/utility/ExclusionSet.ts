import { KeysWithValue, Narrowable, StringKeys, WithStringKeys, WithValue } from "~/types";
import { dictionaryTransform } from "./dictionaryTransform";
import { arrayToDict, dictToArray, literal, withValue } from "./index";
import { inferredType } from "./inferredType";

export type RuleSet<T extends object, S extends object = {}> = { [K in keyof T]: true | ((s: S) => boolean) };

// export function specifyRuleSet<T extends object = {}>(rs: T) {
//   return rs as RuleSet<T>;
// }

/**
 * The outcome of a **RuleSet** which is union of string literals
 */
export type RuleSetOutcome<O extends string> = O;

/**
 * **RuleSetReady**
 * 
 * The ruleset is now ready to be given the current _state_ and with that it will produce
 * the final outcome (aka, a string literal union of property names)
 */
export type RuleSetReady<S extends object, N extends Narrowable, R extends Record<keyof R, N>> = <O extends string>(state?: S) => RuleSetOutcome<O>;


/**
 * A **RuleSet** with only the shape of "state" defined
 */
export type RulesetWithState<S extends object = {}> = <N extends Narrowable, R extends Record<keyof R, N>>(rules: R) => RuleSetReady<S, N, R>;

export type RuleSetBuilder = <S extends object = {}>() => RulesetWithState<S>;

export function ruleSet<T extends { [K in keyof T]: Readonly<T[K]> }>(rules: T) {
  return rules;
}

const receiveCurrentState = <
  S extends object,
  N extends Narrowable,
  R extends Record<keyof R, N>
>(rs: R) =>
  /**
   * Provide the current state to evaluate the dynamic rules against.
   * 
   * _The result of this function should be used by type system but has
   * no meaningful value to runtime._
   * 
   * > Note: using state is optional and if you pass in undefined as a
   * value you'll just get the static rules
   */
  (s?: S) => {
    // always just accept and pass through keys with value set to true
    type StaticRules = StringKeys<WithValue<true, typeof rs>>;

    // pass state into the dynamic rules
    // const dynamicRules = s
    //   ? arrayToDict(dictToArray(literal(rs)).map(rule => {
    //     const [k, v] = rule;
    //     // reduce further to those functions passing back a truthy value
    //     return (v[k] as Function)(s) ? true : null;
    //   })) : {};

    type DynamicRule = (s: S) => boolean;
    const dynRules = withValue<DynamicRule>((s: S) => true)(rs);

    const dynOutcomes = literal(dictionaryTransform<typeof dynRules, Record<keyof typeof dynRules, true | null>>(dynRules, (i, k) => {
      console.log({ i, k, typeof: typeof i[k] });

      return typeof i[k] === "function" ? (i[k] as Function)(s) : undefined;
    }));

    console.log(dynamicRules);

    return "" as unknown as RuleSetOutcome<StaticRules | keyof typeof dynamicRules>;
  };


const receiveRuleSet = <
  S extends object
>() => <
  N extends Narrowable,
  R extends Record<keyof R, N>
/**
 * Provide the ruleset to be used
 */
>(rs: R) => {
    return receiveCurrentState<S, N, R>(rs);
  };

/**
 * A function designed to build a property _ruleset_.
 * 
 * A ruleset is data structure built at run-time to convey a set of
 * props to the type system. This is designed as a higher-order function
 * and this first call is meant only to setup the "structure" of the state
 * structure which will be given to dynamic rules.
 */
export const RuleSet = <S extends object = {}>() => receiveRuleSet<S>();



/**
 * Provides a dictionary-based _exclusion-set_ intended to operate
 * with the type system to provide "exclusions" on an API surface.
 * 
 * The set is simply is a dictionary of string keys with a value of
 * true. The _type_ however is intentionally forced away from a 
 * dictionary to a union of string literal types.
 */
export function ExclusionSet<T extends { [K in keyof T]: true }>(set: T): keyof T {
  return set as any;
}

