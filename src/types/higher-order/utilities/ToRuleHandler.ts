import { AfterFirst, AsArray, First , RuleHandler, RuleHandlerOption } from "src/types";

type DefaultRuleHandler = ["rule-handler", "allow-flatten", "allow-ignore", "throw"];

type Mutate<
  THandler extends RuleHandler,
  TOption extends RuleHandlerOption
> = TOption extends "allow-flatten"
? [ "rule-handler", "allow-flatten", THandler[2], THandler[3] ]
: TOption extends "throw-on-flatten"
? [ "rule-handler", "throw-on-flatten", THandler[2], THandler[3] ]
: TOption extends "allow-ignore"
? [ "rule-handler", THandler[1], "allow-ignore", THandler[3] ]
: TOption extends "throw-on-ignore"
? [ "rule-handler", THandler[1], "throw-on-ignore", THandler[3] ]
: TOption extends "throw"
? [ "rule-handler", THandler[1], THandler[2], "throw" ]
: TOption extends "ErrorCondition"
? [ "rule-handler", THandler[1], THandler[2], "ErrorCondition" ]
: never;


type Process<
  TOptions extends readonly RuleHandlerOption[],
  THandler extends RuleHandler = DefaultRuleHandler
> = [] extends TOptions
? THandler
: Process<
    AfterFirst<TOptions>,
    Mutate<THandler, First<TOptions>>
  >;

/**
 * **ToRuleHandler**`<TMutations,[TDefault]>`
 * 
 * A convenience utility which will take any list of valid options across
 * flattening, ignoring, and throwing errors and apply it as a mutation
 * to the default value of:
 * 
 * - `[ "allow-flatten", "allow-ignore", "throw" ]`.
 */
export type ToRuleHandler<
  TMutations extends RuleHandlerOption | readonly RuleHandlerOption[],
  TDefault extends RuleHandler = DefaultRuleHandler
> = Process<AsArray<TMutations>, TDefault>;
