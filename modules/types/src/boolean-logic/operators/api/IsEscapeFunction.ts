import { EscapeFunction, FnKeyValue, TypedFunction } from "inferred-types/types";


export type IsEscapeFunction<T> = T extends TypedFunction
    ? T extends EscapeFunction
        ? FnKeyValue<T> extends { escape: true }
            ? true
            : false
        : false
    : false;
