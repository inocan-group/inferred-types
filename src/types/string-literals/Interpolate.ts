import { 
  AfterFirst, 
  AnyObject, 
  Container, 
  First, 
  IfObjectLiteral, 
  IfStringLiteral, 
  Keys, 
  ReplaceAll, 
  ToString,  
  WithDefault 
} from "src/types";

type Left<T extends readonly [ string, string ]> = T[0];
type Right<T extends readonly [ string, string ]> = T[1];

type IterateKeys<
  TText extends string,
  TContainer extends Container,
  TDelimiters extends readonly [string, string],
  TKeys extends readonly PropertyKey[],
> = [] extends TKeys
? TText
: IterateKeys<
    First<TKeys> extends keyof TContainer
      ? ReplaceAll<
          TText, 
          `${Left<TDelimiters>}${ToString<First<TKeys>>}${Right<TDelimiters>}`, ToString<TContainer[First<TKeys>]>
        >
      : TText,
    TContainer,
    TDelimiters,
    AfterFirst<TKeys>
  >;

type InterpolateTuple<
  TText extends string,
  TTuple extends readonly unknown[],
  TDelimiters extends readonly [string, string]
> = TText extends `${string}${Left<TDelimiters>}${number}${Right<TDelimiters>}${string}`
? IterateKeys<TText,TTuple,TDelimiters,Keys<TTuple>>
: TText;

type InterpolateObject<
  TText extends string,
  TObj extends AnyObject,
  TDelimiters extends readonly [string, string]
> = IfObjectLiteral<
  TObj,
  IfStringLiteral<
    TText,
    TText extends `${string}${Left<TDelimiters>}${string}${Right<TDelimiters>}${string}`
      ? IterateKeys<TText,TObj,TDelimiters,Keys<TObj>>
      : TText,
      string
    >,
  string
>;

export type Interpolate<
  TText extends string,
  TContainer extends Container,
  TDelimiters extends readonly [string, string] = ["",""]
> = TContainer extends readonly unknown[]
? InterpolateTuple<
    TText, 
    TContainer,
    [
      WithDefault<TDelimiters[0], "[[", "falsy">,
      WithDefault<TDelimiters[1], "]]", "falsy">
    ]
  >
: TContainer extends AnyObject
  ? InterpolateObject<
      TText, 
      TContainer, 
      [
        WithDefault<TDelimiters[0], "{{", "falsy">,
        WithDefault<TDelimiters[1], "}}", "falsy">
      ]
    >
  : never;
