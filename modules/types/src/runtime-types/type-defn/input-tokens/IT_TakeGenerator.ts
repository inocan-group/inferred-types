import type {
  AsLiteralTemplate,
  AsStaticTemplate,
  Contains,
  Err,
  Extends,
  Find,
  FromInputToken__String,
  GenericParam,
  IsStaticTemplate,
  IT_Parameter,
  IT_ParameterResults,
  IT_TakeParameters,
  TemplateMap__Generics,
  NestedSplit,
  TrimEach,
  Trim,
  As,
} from "inferred-types/types";

// Strips surrounding quote characters from a string literal token
type StripSurroundingQuotes<T extends string> = T extends `"${infer R}"`
  ? R
  : T extends `'${infer R}'`
    ? R
    : T extends `\`${infer R}\``
      ? R
      : T;

/**
 * Resolve a return token to its type with support for generics and
 * static template interpolation.
 */
type ResolveToken<
  TToken extends string,
  TGenerics extends readonly GenericParam[]
> = Find<TGenerics, "objectKeyEquals", ["name", Trim<TToken>]> extends infer Generic extends GenericParam
  ? Generic["type"]
  : IsStaticTemplate<StripSurroundingQuotes<TToken>, TemplateMap__Generics<TGenerics>> extends true
    ? AsLiteralTemplate<
        AsStaticTemplate<StripSurroundingQuotes<TToken>, TemplateMap__Generics<TGenerics>>,
        TemplateMap__Generics<TGenerics>
      >
    : Contains<StripSurroundingQuotes<TToken>, "\${"> extends true
      ? AsLiteralTemplate<
          AsStaticTemplate<StripSurroundingQuotes<TToken>, TemplateMap__Generics<TGenerics>>,
          TemplateMap__Generics<TGenerics>
        >
      : FromInputToken__String<TToken>;

type ResolveGeneratorReturn<
  TToken extends string,
  TGenerics extends readonly GenericParam[]
> = Trim<TToken> extends `Generator<${infer Rest extends string}`
  ? NestedSplit<Rest, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
    ? TrimEach<
        As<NestedSplit<Block, ",">, readonly string[]>
    > extends infer Params extends readonly string[]
      ? Params["length"] extends 1
        ? Generator<ResolveToken<Params[0], TGenerics>, any, unknown>
        : Params["length"] extends 2
          ? Generator<ResolveToken<Params[0], TGenerics>, ResolveToken<Params[1], TGenerics>, unknown>
          : Generator<ResolveToken<Params[0], TGenerics>, ResolveToken<Params[1], TGenerics>, ResolveToken<Params[2], TGenerics>>
      : Err<
          "malformed-token",
          `Failed to parse the payload Generator<Y,R,N> interior: '${Block}'.`,
          { token: TToken; block: Block }
        >
    : Err<"malformed-token", `The Generator<...> token '${TToken}' is missing a terminating '>' character!`>
  : Trim<TToken> extends `Iterator<${infer Rest extends string}`
    ? NestedSplit<Rest, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
      ? Iterator<ResolveToken<Trim<Block>, TGenerics>>
      : Err<"malformed-token", `The Iterator<...> token '${TToken}' is missing a terminating '>' character!`>
    : Trim<TToken> extends `IterableIterator<${infer Rest extends string}`
      ? NestedSplit<Rest, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
        ? IterableIterator<ResolveToken<Trim<Block>, TGenerics>>
        : Err<"malformed-token", `The IterableIterator<...> token '${TToken}' is missing a terminating '>' character!`>
      : Trim<TToken> extends `AsyncGenerator<${infer Rest extends string}`
        ? NestedSplit<Rest, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
          ? TrimEach<
                As<NestedSplit<Block, ",">, readonly string[]>
            > extends infer Params extends readonly string[]
            ? Params["length"] extends 1
              ? AsyncGenerator<ResolveToken<Params[0], TGenerics>, any, unknown>
              : Params["length"] extends 2
                ? AsyncGenerator<ResolveToken<Params[0], TGenerics>, ResolveToken<Params[1], TGenerics>, unknown>
                : AsyncGenerator<ResolveToken<Params[0], TGenerics>, ResolveToken<Params[1], TGenerics>, ResolveToken<Params[2], TGenerics>>
            : Err<
                "malformed-token",
                `Failed to parse the payload AsyncGenerator<Y,R,N> interior: '${Block}'.`,
                { token: TToken; block: Block }
              >
          : Err<"malformed-token", `The AsyncGenerator<...> token '${TToken}' is missing a terminating '>' character!`>
        : Trim<TToken> extends `AsyncIterableIterator<${infer Rest extends string}`
          ? NestedSplit<Rest, ">"> extends [infer Block extends string, ...infer _R extends readonly string[]]
            ? AsyncIterableIterator<ResolveToken<Trim<Block>, TGenerics>>
            : Err<"malformed-token", `The AsyncIterableIterator<...> token '${TToken}' is missing a terminating '>' character!`>
          : Err<
              "malformed-token",
              `A generator function's return type must be a Generator/Iterator or AsyncGenerator/AsyncIterableIterator type!`,
              { token: TToken }
            >;

type NamedSyncGenerator<T extends string> = Trim<T> extends `function* ${infer AfterFunction extends string}`
  ? Trim<AfterFunction> extends `${infer Leading extends string}(${infer AfterParen extends string}`
    ? Leading extends `${infer Name extends string}<${infer GenericsBlock extends string}`
      // named with generics
      ? Trim<Name> extends ""
        ? Err<"wrong-handler", `The generator did not appear to have a name and therefore is not a named generator.`, { token: T }>
        : IT_TakeParameters<`<${GenericsBlock}(${AfterParen}`> extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer AfterParams extends string;
          }
          ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
            ? ResolveGeneratorReturn<Trim<ReturnToken>, Generics> extends infer RT
              ? Extends<RT, Generator<any, any, any> | IterableIterator<any> | Iterator<any>> extends true
                ? {
                    __kind: "IT_Token";
                    kind: "generator";
                    name: Trim<Name>;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                    returnType: RT;
                    token: Trim<T>;
                    type: RT;
                    isAsync: false;
                    rest: "";
                  }
                : Err<
                    "malformed-token",
                    `A synchronous generator must return a Generator/Iterator type!`,
                    { token: Trim<T>; returnToken: Trim<ReturnToken>; resolved: RT }
                  >
              : never
            : Err<
                "malformed-token",
                `After successfully parsing the parameters of a named generator, the return type was unable to be parsed because we couldn't find the expected ':' character used to separate the parameters from the return type`,
                { token: T; rest: Trim<AfterParams>; parameters: Parameters; generics: Generics }
              >
          : Err<
              "malformed-token",
              `Failed to parse the parameters of what appeared to be a named generator!`,
              { token: T; rest: `<${GenericsBlock}(${AfterParen}`; attempt: IT_TakeParameters<`<${GenericsBlock}(${AfterParen}`> }
            >
      // named without generics
      : Trim<Leading> extends infer Name extends string
        ? Trim<Name> extends ""
          ? Err<"wrong-handler", `The generator did not appear to have a name and therefore is not a named generator.`, { token: T }>
          : IT_TakeParameters<`(${AfterParen}`> extends {
              parameters: infer Parameters extends readonly IT_Parameter[];
              generics: infer Generics extends readonly GenericParam[] | [];
              rest: infer AfterParams extends string;
            }
            ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
              ? ResolveGeneratorReturn<Trim<ReturnToken>, Generics> extends infer RT
                ? Extends<RT, Generator<any, any, any> | IterableIterator<any> | Iterator<any>> extends true
                  ? {
                      __kind: "IT_Token";
                      kind: "generator";
                      name: Trim<Name>;
                      generics: Generics;
                      parameters: Parameters;
                      narrowing: Generics extends [] ? false : true;
                      returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                      returnType: RT;
                      token: Trim<T>;
                      type: RT;
                      isAsync: false;
                      rest: "";
                    }
                  : Err<
                      "malformed-token",
                      `A synchronous generator must return a Generator/Iterator type!`,
                      { token: Trim<T>; returnToken: Trim<ReturnToken>; resolved: RT }
                    >
                : never
              : Err<"malformed-token", `Expected return type after ':' in a named generator`>
            : Err<
                "malformed-token",
                `Failed to parse the parameters of what appeared to be a named generator!`,
                { token: T; rest: `(${AfterParen}`; attempt: IT_TakeParameters<`(${AfterParen}`> }
              >
        : never
    : Err<"wrong-handler">
  : Err<"wrong-handler">;

type NamedAsyncGenerator<T extends string> = Trim<T> extends `async function* ${infer AfterFunction extends string}`
  ? Trim<AfterFunction> extends `${infer Leading extends string}(${infer AfterParen extends string}`
    ? Leading extends `${infer Name extends string}<${infer GenericsBlock extends string}`
      // named with generics
      ? Trim<Name> extends ""
        ? Err<"wrong-handler", `The generator did not appear to have a name and therefore is not a named generator.`, { token: T }>
        : IT_TakeParameters<`<${GenericsBlock}(${AfterParen}`> extends {
            parameters: infer Parameters extends readonly IT_Parameter[];
            generics: infer Generics extends readonly GenericParam[] | [];
            rest: infer AfterParams extends string;
          }
          ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
            ? ResolveGeneratorReturn<Trim<ReturnToken>, Generics> extends infer RT
              ? Extends<RT, AsyncGenerator<any, any, any> | AsyncIterableIterator<any>> extends true
                ? {
                    __kind: "IT_Token";
                    kind: "generator";
                    name: Trim<Name>;
                    generics: Generics;
                    parameters: Parameters;
                    narrowing: Generics extends [] ? false : true;
                    returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                    returnType: RT;
                    token: Trim<T>;
                    type: RT;
                    isAsync: true;
                    rest: "";
                  }
                : Err<
                    "malformed-token",
                    `An asynchronous generator MUST return an AsyncGenerator/AsyncIterableIterator!`,
                    { token: Trim<T>; returnToken: Trim<ReturnToken>; resolved: RT }
                  >
              : never
            : Err<
                "malformed-token",
                `After successfully parsing the parameters of a named generator, the return type was unable to be parsed because we couldn't find the expected ':' character used to separate the parameters from the return type`,
                { token: T; rest: Trim<AfterParams>; parameters: Parameters; generics: Generics }
              >
          : Err<
              "malformed-token",
              `Failed to parse the parameters of what appeared to be a named generator!`,
              { token: T; rest: `<${GenericsBlock}(${AfterParen}`; attempt: IT_TakeParameters<`<${GenericsBlock}(${AfterParen}`> }
            >
      // named without generics
      : Trim<Leading> extends infer Name extends string
        ? Trim<Name> extends ""
          ? Err<"wrong-handler", `The generator did not appear to have a name and therefore is not a named generator.`, { token: T }>
          : IT_TakeParameters<`(${AfterParen}`> extends {
              parameters: infer Parameters extends readonly IT_Parameter[];
              generics: infer Generics extends readonly GenericParam[] | [];
              rest: infer AfterParams extends string;
            }
            ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
              ? ResolveGeneratorReturn<Trim<ReturnToken>, Generics> extends infer RT
                ? Extends<RT, AsyncGenerator<any, any, any> | AsyncIterableIterator<any>> extends true
                  ? {
                      __kind: "IT_Token";
                      kind: "generator";
                      name: Trim<Name>;
                      generics: Generics;
                      parameters: Parameters;
                      narrowing: Generics extends [] ? false : true;
                      returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                      returnType: RT;
                      token: Trim<T>;
                      type: RT;
                      isAsync: true;
                      rest: "";
                    }
                  : Err<
                      "malformed-token",
                      `An asynchronous generator MUST return an AsyncGenerator/AsyncIterableIterator!`,
                      { token: Trim<T>; returnToken: Trim<ReturnToken>; resolved: RT }
                    >
                : never
              : Err<"malformed-token", `Expected return type after ':' in a named generator`>
            : Err<
                "malformed-token",
                `Failed to parse the parameters of what appeared to be a named generator!`,
                { token: T; rest: `(${AfterParen}`; attempt: IT_TakeParameters<`(${AfterParen}`> }
              >
        : never
    : Err<"wrong-handler">
  : Err<"wrong-handler">;

type AnonSyncGenerator<T extends string> = Trim<T> extends `function* ${infer Rest}`
  ? IT_TakeParameters<Trim<Rest>> extends infer P extends IT_ParameterResults
    ? P extends {
        parameters: infer Parameters extends readonly IT_Parameter[];
        generics: infer Generics extends readonly GenericParam[] | [];
        rest: infer AfterParams extends string;
      }
      ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
        ? ResolveGeneratorReturn<Trim<ReturnToken>, Generics> extends infer RT
          ? Extends<RT, Generator<any, any, any> | IterableIterator<any> | Iterator<any>> extends true
            ? {
                __kind: "IT_Token";
                kind: "generator";
                name: null;
                generics: Generics;
                parameters: Parameters;
                narrowing: Generics extends [] ? false : true;
                returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                returnType: RT;
                token: Trim<T>;
                type: RT;
                isAsync: false;
                rest: "";
              }
            : Err<
                "malformed-token",
                `A synchronous generator must return a Generator/Iterator type!`,
                { token: Trim<T>; returnToken: Trim<ReturnToken>; resolved: RT }
              >
          : never
        : Err<"malformed-token", `Expected return type after ':' in an anonymous generator`>
      : never
    : Err<"wrong-handler", `Unable to parse parameters for anonymous generator: '${T}'`>
  : Err<"wrong-handler", `Not a valid anonymous generator: '${T}'`>;

type AnonAsyncGenerator<T extends string> = Trim<T> extends `async function* ${infer Rest extends string}`
  ? IT_TakeParameters<Trim<Rest>> extends infer P extends IT_ParameterResults
    ? P extends {
        parameters: infer Parameters extends readonly IT_Parameter[];
        generics: infer Generics extends readonly GenericParam[] | [];
        rest: infer AfterParams extends string;
      }
      ? Trim<AfterParams> extends `:${infer ReturnToken extends string}`
        ? ResolveGeneratorReturn<Trim<ReturnToken>, Generics> extends infer RT
          ? Extends<RT, AsyncGenerator<any, any, any> | AsyncIterableIterator<any>> extends true
            ? {
                __kind: "IT_Token";
                kind: "generator";
                name: null;
                generics: Generics;
                parameters: Parameters;
                narrowing: Generics extends [] ? false : true;
                returnToken: AsStaticTemplate<Trim<ReturnToken>, TemplateMap__Generics<Generics>>;
                returnType: RT;
                token: Trim<T>;
                type: RT;
                isAsync: true;
                rest: "";
              }
            : Err<
                "malformed-token",
                `An asynchronous generator MUST return an AsyncGenerator/AsyncIterableIterator!`,
                { token: Trim<T>; returnToken: Trim<ReturnToken>; resolved: RT }
              >
          : never
        : Err<"malformed-token", `Expected return type after ':' in an anonymous generator`>
      : never
    : Err<"wrong-handler", `Unable to parse parameters for anonymous generator: '${T}'`>
  : Err<"wrong-handler", `Not a valid anonymous generator: '${T}'`>;

/**
 * iterates over the various generator signatures and returns when:
 * 1. a variant returns an Error of the type "malformed-token"
 * 2. a variant returns a successful outcome which extends `IT_Token<"generator">`
 */
type Select<
  T extends readonly unknown[],
  TToken extends string,
  TVariants extends readonly unknown[] = T
> = T extends [infer Head, ...infer Rest extends readonly unknown[]]
  ? Head extends Err<"malformed-token">
    ? Head
    : Head extends Error
      ? Select<Rest, TToken, TVariants>
      : Head
  : Err<
      "wrong-handler",
      `None of the variants for generators was able to parse the token: '${TToken}'`,
      { token: TToken; utility: "IT_TakeGenerator"; variants: TVariants }
    >;

type InvalidNamedGenerator<T extends string, A extends string = ""> = Err<
  `malformed-token/named-generator`,
  `The token started with the text '${A}function*' and thereby clearly indicated a generator function definition but the remaining text -- ${T} -- was not parsable! Remember that when using the 'function*' keyword the return type is delimited by a ':' character and MUST be a Generator/Iterator type.`,
  { token: `${A}function* ${T}` }
>;

/**
 * IT_TakeGenerator<T>
 *
 * Attempts to find a generator function at the head of a token string.
 * Will find the following variants:
 * - named synchronous and asynchronous generators
 * - anonymous synchronous and asynchronous generators
 * - Note: arrow generators are not valid and thus not supported.
 *
 * All variants also account for possible use of generics for parameters.
 */
export type IT_TakeGenerator<T extends string> = Select<[
  T extends `function* ${string}(${string}):${string}` ? NamedSyncGenerator<T> : Error,
  T extends `async function* ${string}(${string}):${string}` ? NamedAsyncGenerator<T> : Error,
  T extends `function* (${string}):${string}` | `function* <${string}>(${string}):${string}` ? AnonSyncGenerator<T> : Error,
  T extends `async function* (${string}):${string}` | `async function* <${string}>(${string}):${string}` ? AnonAsyncGenerator<T> : Error,
  T extends `function* ${infer Rest extends string}` ? InvalidNamedGenerator<Rest> : Error,
  T extends `async function* ${infer Rest extends string}` ? InvalidNamedGenerator<Rest, "async "> : Error
], T>;
