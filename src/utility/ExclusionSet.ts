import { kvDictArray } from "./kvDictArray";


export type RuleSet<S extends object = {}> = { [key: string]: true | ((s: S) => boolean) };

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
export type RuleSetReady<S extends object, R extends RuleSet<S>> = (state: S) => RuleSetOutcome<S, R, O>;



/**
 * A **RuleSet** with only the shape of "state" defined
 */
export type RsBuilderWithState<S extends object = {}> = <R extends RuleSet<S>>(rules: R) => RuleSetReady<S, R>;

export type RuleSetBuilder = <S extends object = {}>() => RsBuilderWithState<S>;



export const RuleSet: RuleSetBuilder =
  <S extends object = {}>(): RsBuilderWithState<S> =>
    <R extends RuleSet<S>>(rs: R): RuleSetReady<S, R> => {
      return <O extends string>(s?: S): RuleSetOutcome<S, R, O> => {
        const rules = s
          ? kvDictArray(rs).filter(r => r.value === true || r.value(s) === true).map(i => ({ ...i, value: true as true }))
          : kvDictArray(rs).filter(r => r.value === true);

        type Rules = keyof typeof rules;
        return rules as unknown as Rules;
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