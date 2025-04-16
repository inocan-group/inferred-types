import type {
    Err,
    FailFast,
    FromStringInputToken,
    Narrowable,
    ObjectKey,
    Trim,
    Unset,
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";


type RecordKey<
    K extends string,
    V extends string
> = FromStringInputToken<K> extends Error
? Err<
    `invalid-token/record`,
    `Invalid Record Key!`,
    {
        token: K,
        cause: `the key for the Record<${K},${V}> type could not be parsed!`,
        subType: "record"
    }
>
: FromStringInputToken<K> extends ObjectKey
    ? FromStringInputToken<K>
    : Err<
        `invalid-token/record`,
        `The key token for Record<${K},${V}> was parsed but doesn't extends string or symbol!`
    >;

type RecordValue<
    K extends string,
    V extends string
> = FromStringInputToken<V> extends Error
? Err<`invalid-token/record`, `The Record<${K},${V}> had an invalid value!`, {
    in: `Record<${K},${V}>`,
    cause: `The value token for the Record was invalid!`
}>
: FromStringInputToken<V>;

export type IT_TakeRecord<
    T extends string,
    TInner extends readonly any[] = [],
    _TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Record<${infer Key extends string},${infer Val extends string}>${infer Rest}`
    ? FailFast<
        [
            RecordKey<Key,Val>,
            RecordValue<Key, Val>,
            RecordKey<Key,Val> extends ObjectKey
                ? undefined
                : Err<`invalid-token/record`, `The key in Record<${Key}, ${Val}> was parsed but did not meet the requirement of being a string or symbol type!`>,
            FromStringInputToken<
                Rest,
                [
                    ...TInner,
                    Record<
                        RecordKey<Key,Val> & ObjectKey,
                        RecordValue<Key,Val>
                    >
                ]
            >

        ],
        { failureConditions: { error: true }}
    >
    : Unset;

