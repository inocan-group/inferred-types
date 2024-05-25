import { 
  AsString, 
  CreateDictHash,
  CreateDictShape,
  Dict, 
  Keys, 
  NarrowDictProps, 
  Narrowable, 
  OptDictProps, 
  Passthrough, 
  Values, 
} from "src/types/index";

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
  CreateDictShape<
    TObj,
    Keys<TObj> extends readonly (string & keyof TObj)[] 
      ? Keys<TObj> 
      : never,
    TNarrow,
    TOpt
  >,
  CreateDictHash<
    Values<TObj>, 
    TNarrow,
    TOpt
  >
>
}

/**
 * **dict**`(obj, ...props)`
 * 
 * Defines a `Dict` type which mimics the behavior of a normal JS
 * object but plays nicer with `let` declarations by not allowing 
 * re-declarations.
 */
export const dict = <
  N extends Narrowable, 
  TObj extends Record<string, N>,
  TProps extends readonly (string & (keyof TObj | `opt:${AsString<keyof TObj>}`))[] = []
>(obj: TObj, ...props: TProps ) => process(
  obj, 
  (props || []).filter(i => !i.startsWith("opt:"))  as Passthrough<
    NarrowDictProps<TProps>, 
    readonly string[],
    []
  >,
  (props || []).filter(i => i.startsWith("opt:")) as Passthrough<
    OptDictProps<TProps>,
    readonly string[],
    []
  >
);

