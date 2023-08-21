import { 
  AfterFirst,
  Concat, 
  DescribeType, 
  ErrorCondition, 
  First, 
  Matcher, 
  ParamsForComparison, 
  RefTypeForComparison, 
  TypeComparison, 
  WithDefault
} from "src/types";

type Op<T extends Matcher> = T[0];
type Handler<T extends Matcher> = WithDefault<T[2], "throw">;

type MatchStatus = "success" | "skip" | "narrow" | "throw";
export type MatchResponse<
  TStatus extends MatchStatus = MatchStatus, 
  TData = unknown
> = [
  status: TStatus,
  data: TData
];

/** handle error conditions based on config */
type Handle<
  TInput,
  TMatch extends Matcher,
  TResults
> = TResults extends ErrorCondition
? // handle
  Handler<TMatch> extends "skip"
    ? MatchResponse<"skip", TInput>
    : Handler<TMatch> extends "narrow"
      ? MatchResponse<"narrow", Exclude<TInput, RefTypeForComparison<TMatch>>>
      : MatchResponse<"throw", TResults>
: // no error, just passthrough
  MatchResponse<"success", TInput>;


/**
 * **Match**`<TInput, TMatcher>`
 * 
 * Compares an input `TInput` using a `Matcher` expression.
 */
export type Match<
  TInput,
  TMatcher extends Matcher
> = TInput extends RefTypeForComparison<TMatcher>
? Handle<
    TInput,
    TMatcher,
    TypeComparison<TInput, TMatcher> extends false
      ? ErrorCondition<"did-not-match">
      : true
  >
: // the input did not extend the reference type!
  Handle< 
    TInput,
    TMatcher,
    ErrorCondition<
      "invalid-reference-type",
      Concat<[
        "The comparison operation '",
        Op<TMatcher>,
        "' requires an input type of '",
        DescribeType<RefTypeForComparison<TMatcher>>,
        "' but instead got '",
        DescribeType<TInput>,
        "'!"
      ]>,
      "Match",
      { 
        input: TInput; 
        operation: Op<TMatcher>; 
        refType: RefTypeForComparison<TMatcher>;
        params: ParamsForComparison<TMatcher>;
      }
    >
  >;

type TransformInput<
  TMatch,
  TCondition extends Matcher
> = TMatch extends MatchResponse
? TMatch extends MatchResponse<"success">
  ? TMatch[1] // matched successfully, maintain type of TInput
  : TMatch extends MatchResponse<"skip">
      ? TMatch[1] // operation not successful but handled with skip; so continue
      : TMatch extends MatchResponse<"narrow">
        ? Exclude<TMatch[1], RefTypeForComparison<TCondition>>
        : never
: ErrorCondition<
    "unexpected-outcome",
    "During a MatchAll<...> operation the result from Match<...> on one of the pipeline elements returns a value which did NOT extend MatchResponse!",
    "MatchAll",
    { matchResponse: TMatch }
  >;

/**
 * **MatchAllResponse**`<T>`
 * 
 * Use of the `MatchAll<...>` utility produces a `MatchAllResponse` which is a subset
 * of the responses you might expect from a `MatchResponse` as the only statuses which
 * are valid are "success" and "throw".
 */
export type MatchAllResponse<
  TStatus extends "success" | "throw",
  TErrOrInput
> = MatchResponse<TStatus, TErrOrInput>;

type Pipeline<
    TInput,
    TMatchers extends readonly Matcher[]
> = [] extends TMatchers
? MatchAllResponse<"success", TInput>
: TransformInput<Match<TInput, First<TMatchers>>, First<TMatchers>> extends ErrorCondition
  ? // exit early if an error is returned
    MatchAllResponse<
      "throw",
      TransformInput<Match<TInput, First<TMatchers>>, First<TMatchers>>
    >
  : // continue iterating through pipeline
    Pipeline<
      TransformInput<Match<TInput, First<TMatchers>>, First<TMatchers>>,
      AfterFirst<TMatchers>
    >;



/**
 * **MatchAll**`<TInput, TMatchers>`
 * 
 * Iterates through a list of `Matcher`'s and returns
 * a _success_ `MatchResponse` if all pass, otherwise
 * it will short circuit with an `ErrorCondition` at the 
 * first failure which is not handled.
 * 
 * Note that matchers which have "skip" or "exclude" handling
 * will do just that allowing the pipeline of comparisons to
 * continue.
 * 
 * **Related:** `Match`, `IfMatchAll`
 */
export type MatchAll<
  TInput,
  TMatchers extends readonly Matcher[]
> = Pipeline<TInput,TMatchers>;


/**
 * **IfMatchAll**`<TInput,TMatchers,IF,ELSE>`
 * 
 * Branching utility which returns `IF` or `ELSE` types based
 * on whether all the `TMatchers` conditions matched against
 * `TInput`.
 * 
 * **Related:** `MatchAll`
 */
export type IfMatchAll<
  TInput,
  TMatchers extends readonly Matcher[],
  IF = MatchAll<TInput, TMatchers>,
  ELSE = MatchAll<TInput, TMatchers>
> = MatchAll<TInput, TMatchers> extends MatchResponse<"success">
? IF
: ELSE;

