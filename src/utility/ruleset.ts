/* eslint-disable no-use-before-define */
import { Narrowable } from "~/types/Narrowable";
import { TypeCondition } from "./runtime/ifTypeOf";


/**
 * **DynamicRule**
 * 
 * A dynamic rule is a _function_ which recieves a partially applied `isTypeOf()` utility function
 * which will allow a user to state the relationship they want to test relative to `TState`.
 * 
 * ```ts
 * const state = defineObject(t => t.string("id", {optional: true}));
 * // type-safe way to check whether optional prop is actually set
 * const rule: DynamicRule<typeof state> = s => s.has("id");
 * ```
 */
export type DynamicRule<TState extends any, TResult extends true | false> = (rule: TypeCondition<any, TState>) => TResult;

/**
 * **DynamicRuleSet** 
 * 
 * A function which accepts the agreed `TState` generic as input and returns a discrete
 * `true` or `false` value.
 */
export type DynamicRuleSet<TState extends any, TRules extends Record<string, TypeCondition<any, TState>>> = (rules: TRules) => true | false;

const dynamicRuleState = {
  state: <TState extends any>() => {
    return {
      rules: <TRules extends DynamicRuleSet<TState, TRules>>(rules: TRules) => {
        const dynRules = rules();
      }
    };
  }
};

export type DynamicRuleState = (def: typeof dynamicRuleState) => any;

/**
 * **ruleSet**
 * 
 * Defines a ruleset composed of _dynamic_ and _static_ boolean operators.
 * 
 * - the first function call defines _dynamic_ props (_optional_)
 * - the second function call defines static values
 * 
 * ```ts
 * const rs = ruleSet( 
 *    r => r.state()( { maybe: r => r.extends({ foo: 1 }) })
 * )( 
 *    { color: true, age: false } 
 * );
 * ```
 */
export function ruleSet<N extends Narrowable, TState extends Record<keyof TState, N>, TRules extends DynamicRuleset<TState>>(defn?: DynamicRuleState) {
  return <
    TStatic extends { [K in keyof TStatic]: Readonly<true | false> },
    >(rules: TStatic) => {
    return rules;
  };
}

