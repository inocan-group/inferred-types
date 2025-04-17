import type {
    DefineObject,
    FromInputToken,
    FromStringInputToken,
    InputTokenLike,
    Dictionary,
    Some,
    Values,
    UnionToTuple,
    OptionalKeys,
    MakeKeysOptional,
    ObjectKey,
    Err
} from "inferred-types/types";

type _FromDefineObject<T extends Required<DefineObject>> = {
    [K in keyof T]: T[K] extends string
            ? FromStringInputToken<T[K]>
            : T[K] extends InputTokenLike
                ? FromInputToken<T[K]>
                : never
};

type DefineObjectHasError<T extends Dictionary> = Some<
    Values<T>,
    "extends",
    Error
>;

/**
 * **FromDefineObject**`<T>`
 *
 * Converts a `DefineObject` _definition_ into the **type** which it
 * it defines.
 */
export type FromDefineObject<T extends DefineObject> = DefineObjectHasError<
    _FromDefineObject<Required<T>>
> extends true
? Err<`invalid-token/object`, `Invalid InputToken for an object based type defined using FromDefine!`>

: MakeKeysOptional<
      _FromDefineObject<Required<T>>,
      UnionToTuple<OptionalKeys<T>> extends readonly ObjectKey[]
          ? UnionToTuple<OptionalKeys<T>>
          : never
  >;
