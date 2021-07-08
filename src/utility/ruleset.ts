/* eslint-disable no-use-before-define */
import type { Narrowable } from "~/types";

// TODO: get ruleset functionality working!

// const dynamicRuleState = {
// state: <TState extends any>() => {
//   return {
//     rules: <TRules extends DynamicRuleSet<TState, any>>(rules: TRules) => {
//       const dynRules = rules();
//     }
//   };
// }
// };

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
export function ruleSet<N extends Narrowable, TState extends Record<keyof TState, N>>(defn?: TState) {
  // return <
  //   TStatic extends { [K in keyof TStatic]: Readonly<true | false> },
  //   >(rules: TStatic) => {
  //   return rules;
  // };
  return defn;
}

