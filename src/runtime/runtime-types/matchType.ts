import { 
  Matcher, 
  Narrowable, 
  RefTypeForComparison, 
  ErrorCondition,  
  MatchResponse, 
  ParamsForComparison, 
  Match, 
  MatchAll
} from "src/types";
import { isArray, isBoolean, isFalsy, isNothing, isNumber, isString } from "src/runtime";
import { FALSY_VALUES } from "src/constants";

type Response<
  TInput extends Narrowable | readonly Narrowable[],
  TMatcher extends Matcher
> = Match<TInput,TMatcher>;

const op = <T extends Matcher>(op: T) => op[0];
const handling = <T extends Matcher>(m: T) => m[2];
const params = <T extends Matcher>(m: T) => m[1] as ParamsForComparison<T>;

const success = <T>(input: T) => ["success", input] as MatchResponse<"success", T>;
const fail = <T, M extends Matcher>(input: T, matcher: M) => [
  handling(matcher),
  // error condition
  false,

] as MatchResponse<
  M[2], 
  M[0] extends "throw" 
    ? ErrorCondition 
    : M[0] extends "skip" ? T 
    : M[0] extends "narrow" ? RefTypeForComparison<M> 
    : never
>;

const match = <TInput, TMatcher extends Matcher>(input: TInput, matcher: TMatcher) => {
  const p = params(matcher);

  switch(op(matcher)) {
    case "Contains":
      return isArray(input) && input.includes(params(matcher)[0])
        ? success(input)
        : fail(input, matcher);

    case "EndsWith":
      return isString(input) && input.endsWith(params(matcher)[0] as string)
        ? success(input)
        : fail(input, matcher);

    case "Equals":
      return input === p[0]
        ? success(input)
        : fail(input, matcher);

    case "Extends":
      // TODO: this needs more nuance
      return typeof input ===  typeof p[0]
        ? success(input)
        : fail(input, matcher);

    case "Falsy":
      return isFalsy(input as TInput & Narrowable) 
        ? success(input)
        : fail(input, matcher);

    case "GreaterThan":
      return isNumber(input) && input > Number(p[0])
        ? success(input)
        : fail(input, matcher);

    case "Includes":
      return isString(input) && input.includes(String(p[0]))
        ? success(input)
        : fail(input, matcher);

    case "IsBoolean":
      return isBoolean(input)
      ? success(input)
      : fail(input, matcher);

    case "IsNothing":
      return isNothing(input)
        ? success(input)
        : fail(input, matcher);

    case "IsNumber":
      return isNumber(input)
        ? success(input)
        : fail(input, matcher);

    case "IsSomething":
      return !isNothing(input)
        ? success(input)
        : fail(input, matcher);

    case "IsString":
      return isString(input)
        ? success(input)
        : fail(input, matcher);

    case "LessThan":
      return isNumber(input) && input < Number(p[0])
      ? success(input)
      : fail(input, matcher);

    case "NotEqual":
      return input !== p[0]
        ? success(input)
        : fail(input, matcher);

    case "NotExtends":
      // TODO: this needs more nuance
      return typeof input !==  typeof p[0]
        ? success(input)
        : fail(input, matcher);

    case "ReturnsEquals":
      return typeof input === "function" && input() === p[0]
      ? success(input)
      : fail(input, matcher);

    case "ReturnsExtends": 
      return typeof input === "function" && typeof input() === typeof p[0]
      ? success(input)
      : fail(input, matcher);


    case "ReturnsFalse":
      return typeof input === "function" && input() === false
      ? success(input)
      : fail(input, matcher);

    case "ReturnsFalsy":
      return typeof input === "function" && FALSY_VALUES.includes(input())
      ? success(input)
      : fail(input, matcher);

    case "ReturnsNothing":
      return typeof input === "function" && [null, undefined].includes(input())
      ? success(input)
      : fail(input, matcher);

    case "ReturnsSomething":
      return typeof input === "function" && ![null, undefined].includes(input())
      ? success(input)
      : fail(input, matcher);

    case "ReturnsTrue":
      return typeof input === "function" && input() === true
      ? success(input)
      : fail(input, matcher);      

    case "ReturnsTruthy":
      return typeof input === "function" && !FALSY_VALUES.includes(input())
      ? success(input)
      : fail(input, matcher);
      
    case "StartsWith": 
      return isString(input) && input.startsWith(params(matcher)[0] as string)
      ? success(input)
      : fail(input, matcher);

    case "Truthy":
      return !isFalsy(input as TInput & Narrowable)
      ? success(input)
      : fail(input, matcher);

    default:
      throw new Error(`The comparison operator "${op(matcher)}" is not known!`);
  }
};

const matchAll = <TInput, TMatcher extends readonly Matcher[]>(
    input: TInput, 
    ...matcher: TMatcher
) => {
  return matcher.reduce(
    <TMatch extends Matcher, TResult extends MatchResponse>(m: TMatch, result: TResult) => {
      return result[0] === "success"
        ? // successful so far; look at next result
          match(result[1], m)
        : result;
    },
    ["success", input] as MatchResponse
  ) as unknown as MatchAll<TInput, TMatcher>;
};

/**
 * **MatchTypeComparison**
 * 
 * a partial application of the **matchType** utility which now expects
 * a type to be passed in so that a type comparison can be made.
 */
export type MatchTypeComparison<TMatcher extends Matcher> = <
  TInput extends readonly Narrowable[]
>(...input: TInput) => Response<TInput, TMatcher>;


/**
 * **matchType**(matcher) -> (type) -> MatchResponse
 * 
 * A runtime utility which receives a typed variable `type` and validates it
 * with the _matcher_ passed in. Results in a `MatchResponse` type.
 */
export const matchType = <
  TMatcher extends Matcher
>(matcher: TMatcher): MatchTypeComparison<TMatcher> => <
  TInput extends readonly Narrowable[]
>(...input: TInput): Response<TInput, TMatcher> =>  {
  return match(input, matcher) as unknown as Response<TInput,TMatcher>;
};
