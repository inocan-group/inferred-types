import { 
  Matcher, 
  Narrowable, 
  ErrorCondition,  
  MatchResponse, 
  ParamsForComparison, 
  MatchAll,
  MatchAllResponse,
  errorCondition,
  Match
} from "src/types";
import { describeType, isArray, isBoolean, isFalsy, isNothing, isNumber, isString } from "src/runtime";
import { FALSY_VALUES } from "src/constants";

type Response<
  TInput extends Narrowable | readonly Narrowable[],
  TMatchers extends readonly Matcher[]
> = TInput extends readonly [Narrowable]
? // input is not a tuple 
  MatchAll<TInput[0],TMatchers> extends MatchAllResponse<"success" | "throw", unknown>
  ? MatchAll<TInput[0],TMatchers>[1]
  : ErrorCondition<"huh?">

: // treat input as a tuple
  MatchAll<TInput,TMatchers> extends MatchAllResponse<"success" | "throw", unknown>
    ? MatchAll<TInput,TMatchers>[1]
    : ErrorCondition<"huh?">;


const op = <T extends Matcher>(op: T) => op[0];
const handling = <T extends Matcher>(m: T) => m[2];
const params = <T extends Matcher>(m: T) => m[1] as ParamsForComparison<T>;

const success = <
  TInput,
  TMatcher extends Matcher
>(input: TInput, _matcher: TMatcher) => ["success", input] as Match<TInput, TMatcher>;

const fail = <
  TInput, 
  TMatcher extends Matcher
>(input: TInput, matcher: TMatcher) => [
  handling(matcher),
  // error condition
  errorCondition("did-not-match", `attempt to match the input type '${describeType(input)}' using the the comparison operation '${matcher[0]}' did not succeed.`, "MatchType", {input, matcher}),
] as Match<TInput, TMatcher>;

/**
 * attempts a single match of an input using a matcher; return is a MatchResponse
 */
const match = <TInput, TMatcher extends Matcher>(input: TInput, matcher: TMatcher) => {
  const p = params(matcher);
  let response;

  switch(op(matcher)) {
    case "Contains":
      response = isArray(input) && input.includes(params(matcher)[0])
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "EndsWith":
      response = isString(input) && input.endsWith(params(matcher)[0] as string)
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "Equals":
      response = input === p[0]
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "Extends":
      // TODO: this needs more nuance
      response = typeof input ===  typeof p[0]
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "Falsy":
      response = isFalsy(input as TInput & Narrowable) 
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "GreaterThan":
      response = isNumber(input) && input > Number(p[0])
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "Includes":
      response = isString(input) && input.includes(String(p[0]))
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "IsBoolean":
      response = isBoolean(input)
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "IsNothing":
      response = isNothing(input)
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "IsNumber":
      response = isNumber(input)
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "IsSomething":
      response = !isNothing(input)
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "IsString":
      response = isString(input)
        ? success(input, matcher)
        : fail(input, matcher);
        break;

    case "LessThan":
      response = isNumber(input) && input < Number(p[0])
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "NotEqual":
      response = input !== p[0]
        ? success(input, matcher)
        : fail(input, matcher);
      break;

    case "NotExtends":
      // TODO: this needs more nuance
      response = typeof input !==  typeof p[0]
        ? success(input, matcher)
        : fail(input, matcher);
      break;

    case "ReturnsEquals":
      response = typeof input === "function" && input() === p[0]
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "ReturnsExtends": 
      response = typeof input === "function" && typeof input() === typeof p[0]
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "ReturnsFalse":
      response =  typeof input === "function" && input() === false
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "ReturnsFalsy":
      response =  typeof input === "function" && FALSY_VALUES.includes(input())
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "ReturnsNothing":
      response =  typeof input === "function" && [null, undefined].includes(input())
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "ReturnsSomething":
      response =  typeof input === "function" && ![null, undefined].includes(input())
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "ReturnsTrue":
      response =  typeof input === "function" && input() === true
      ? success(input, matcher)
      : fail(input, matcher);      
      break;

    case "ReturnsTruthy":
      response =  typeof input === "function" && !FALSY_VALUES.includes(input())
      ? success(input, matcher)
      : fail(input, matcher);
      break;
      
    case "StartsWith": 
      response =  isString(input) && input.startsWith(params(matcher)[0] as string)
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    case "Truthy":
      response = !isFalsy(input as TInput & Narrowable)
      ? success(input, matcher)
      : fail(input, matcher);
      break;

    default:
      throw new Error(`The comparison operator "${op(matcher)}" is not known!`);
  }

  return response as Match<TInput,TMatcher>;
};

const matchAll = <TInput extends readonly Narrowable[], TMatchers extends readonly Matcher[]>(
    input: TInput, 
    matchers: TMatchers
) => {
  return matchers.reduce(
    <
      TMatch extends Matcher,
      TResult extends MatchResponse
    >(matcher: TMatch, result: TResult) => {
      return result[0] === "success"
        ? // successful so far; look at next result
          match(result[1], matcher)
        : result;
    },
    ["success", input.length === 1 ? input[0] : input] as MatchResponse
  ) as unknown as Response<TInput, TMatchers>;
};

/**
 * **MatchTypeComparison**
 * 
 * a partial application of the **matchType** utility which now expects
 * a type to be passed in so that a type comparison can be made.
 */
export type MatchTypeComparison<TMatchers extends readonly Matcher[]> = <
  TInput extends readonly Narrowable[]
>(...input: TInput) => Response<TInput, TMatchers>;


/**
 * **matchType**( matcher(s) ) -> (input type) -> ErrorCondition | Input Type
 * 
 * A runtime utility which receives a typed variable `type` and validates it
 * with the _matcher_ passed in. 
 * 
 * Results are either:
 * - an `ErrorCondition` for any unhandled errors
 * - the input type if all success cases
 * 
 * **Note:** if there were any _narrow_ handlers in the comparisons you may end
 * up with a more narrowly typed input type.
 */
export const matchType = <
  TMatchers extends readonly Matcher[]
>(...matchers: TMatchers): MatchTypeComparison<TMatchers> => <
  TInput extends readonly Narrowable[]
>(...input: TInput): Response<TInput, TMatchers> =>  {
  return matchAll(
    input, 
    matchers
  ) as unknown as Response<TInput,TMatchers>;
};
