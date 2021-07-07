/* eslint-disable no-use-before-define */
import type { Narrowable, DynamicRuleSet } from "~/types";

const dynamicRuleState = {
  state: <TState extends any>() => {
    return {
      rules: <TRules extends DynamicRuleSet<TState, any>>(rules: TRules) => {
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

