type AllowFlatten = "allow-flatten" | "throw-on-flatten";
type AllowIgnore = "allow-ignore" | "throw-on-ignore";
type HandleRuntime = "throw" | "ErrorCondition" | "else";

/**
 * **RuleHandlerOption**
 * 
 * Used by the `ToRuleHandler` utility to help create a `RuleHandler`
 */
export type RuleHandlerOption = AllowFlatten | AllowIgnore | HandleRuntime;

/**
 * **RuleHandler**
 * 
 * A **RuleHandler** configures how a **ruleset** should behave when
 * evaluating the type `A` being passed to it (during evaluation time frame).
 * 
 * **Related:** `ToRuleHandler`
 */
export type RuleHandler = [
  identity: "rule-handler", 
  flatten: AllowFlatten, 
  ignore: AllowIgnore, 
  runtime: HandleRuntime
];

