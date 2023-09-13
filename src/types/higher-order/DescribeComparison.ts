import { Matcher, ErrorCondition } from "../base";

type Success<
  TInput,
  TMatcher extends Matcher
> = any;

type Failure<
  TOutcome extends ErrorCondition | false | never,
  TInput,
  TMatcher extends Matcher
> = any;

/**
 * **DescribeComparison**`<TOutcome, TInput, TMatcher>`
 * 
 * Describes the outcome of a type comparison when
 * using `TypeComparison` utility.
 */
export type DescribeComparison<
  TOutcome extends ErrorCondition | boolean,
  TInput,
  TMatcher extends Matcher
> = TOutcome extends true
? Success<TInput, TMatcher>
: Failure<TOutcome & ErrorCondition | false, TInput, TMatcher>;
