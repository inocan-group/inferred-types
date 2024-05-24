import { 
  AfterFirst, 
  As, 
  AsString, 
  Contains,
  Dict,
  Dictionary, 
  EmptyObject, 
  ExpandDictionary, 
  First, 
  Keys, 
  MakeKeysOptional, 
  Narrowable, 
  Values, 
  Widen,
} from "src/types/index";

type OptProps<
  T extends readonly string[]
> = {
  [K in keyof T]: T[K] extends `opt:${infer Prop}`
      ? Prop
      : never
};

type NarrowProps<
  T extends readonly string[]
> = {
  [K in keyof T]: T[K] extends `opt:${string}`
      ? never
      : T[K]
};

type CreateShape<
  TObj extends Dictionary,
  TKeys extends readonly (string & keyof TObj)[],
  TNarrow extends readonly (string & keyof TObj)[],
  TOpt extends readonly string[],
  TResult extends Dictionary = EmptyObject
> = [] extends TKeys
? OptProps<TKeys> extends readonly string[]
  ? MakeKeysOptional<
      ExpandDictionary<TResult>,
      TOpt
    >

  : never
: CreateShape<
    TObj,
    AfterFirst<TKeys>,
    TNarrow,
    TOpt,
    TResult & Record<
            First<TKeys>,
            Contains<TNarrow, First<TKeys>> extends true
              ? TObj[First<TKeys>]
              : Widen<TObj[First<TKeys>]>
          >
  >;

type CreateHash<
  TValues extends readonly unknown[],
  TNarrowProps extends readonly string[],
> = `${TValues["length"]}${TNarrowProps["length"]}`;

const process =  <
  N extends Narrowable, 
  TObj extends Record<string, N>,
  TNarrow extends readonly string[],
  TOpt extends readonly string[]
>(obj: TObj, _narrow: TNarrow, _opt: TOpt ) => {
  return Object.defineProperty(
    obj, 
    "__id", 
    { enumerable: false }
  ) as unknown as Dict<
  CreateShape<
    TObj,
    Keys<TObj> extends readonly (string & keyof TObj)[] 
      ? Keys<TObj> 
      : never,
    TNarrow,
    TOpt
  >,
  CreateHash<
    Values<TObj>, 
    TNarrow
  >
>
}

export const dict = <
  N extends Narrowable, 
  TObj extends Record<string, N>,
  TProps extends readonly (string & (keyof TObj | `opt:${AsString<keyof TObj>}`))[]
>(obj: TObj, ...narrow: TProps ) => process(
  obj, 
  narrow.filter(i => !i.startsWith("opt:")) as NarrowProps<TProps>,
  narrow.filter(i => i.startsWith("opt:")) as OptProps<TProps>
);

