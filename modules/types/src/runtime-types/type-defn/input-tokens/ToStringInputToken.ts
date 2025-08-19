import type { DefineObject, Err, FromDefineObject, InputToken } from "inferred-types/types";

export type ToStringInputToken<T extends InputToken> = T extends string
    ? T
    : T extends DefineTuple
        ? FromTupleDefn<T>
        : T extends DefineObject
            ? FromDefineObject<T>
            : Err<
                `invalid-token`,
                `The value passed into ToStringInputToken<T> is not a valid InputToken!`,
                { token: T }
            >;
