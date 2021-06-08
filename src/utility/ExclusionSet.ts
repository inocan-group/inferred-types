import { KeysWithValue, WithValue } from "~/types";
import { arrayToDict, dictToArray } from "./dictToArray";

export type RuleSet<T extends object, S extends object = {}> = { [K in keyof T]: true | ((s: S) => boolean) };

// export function specifyRuleSet<T extends object = {}>(rs: T) {
//   return rs as RuleSet<T>;
// }

/**
 * The outcome of a **RuleSet** which is union of string literals
 */
export type RuleSetOutcome<S extends object, _R extends RuleSet<S>, O extends string> = O;

/**
 * **RuleSetReady**
 * 
 * The ruleset is now ready to be given the current _state_ and with that it will produce
 * the final outcome (aka, a string literal union of property names)
 */
export type RuleSetReady<S extends object, R extends RuleSet<S>> = <O extends string>(state?: S) => RuleSetOutcome<S, R, O>;



/**
 * A **RuleSet** with only the shape of "state" defined
 */
export type RsBuilderWithState<S extends object = {}> = <R extends RuleSet<S>>(rules: R) => RuleSetReady<S, R>;

export type RuleSetBuilder = <S extends object = {}>() => RsBuilderWithState<S>;

export function ruleSet<T extends readonly { [K in keyof T]: Readonly<T[K]> }>(rules: T) {
  return rules;
}


export const RuleSet =
  // receive shape of "state"
  <S extends object = {}>() =>
    // receive the rule set
    <R extends RuleSet<S>>(rs: R) => {
      type StaticRules = KeysWithValue<true, R>;
      // receive the current "state" to trigger dynamic rules
      return (s?: S) => {
        // const rules = s
        //   ? kvDictArray(rs).filter(r => r.value === true || r.value(s) === true).map(i => ({ ...i, value: true as true }))
        //   : kvDictArray(rs).filter(r => r.value === true);
        const dynamicRules = arrayToDict(dictToArray(rs).filter(rule => {
          const [k, v] = rule;
          return typeof v[k] === "function";
        }).filter(rule => {
          const [k, v] = rule;
          return (v[k] as Function)(s);
        }));


        return {
          ruleset: rs,
          type: "" as StaticRules & typeof dynamicRules
        };

        //   type Rules = keyof typeof rules;
        //   return rules as unknown as Rules;
      };
    };

// type ExclusionSet<E extends string>


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


type State = { baz: boolean };
const foo = RuleSet<State>()({ foo: true, bar: true, baz: s => s.baz ? true : false })({ baz: false });