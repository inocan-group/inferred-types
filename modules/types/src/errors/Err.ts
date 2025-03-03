import { Dictionary, Expand, IsDefined, PascalCase, RetainUntil } from "inferred-types/types";



export type ErrOptions = {
    name?: string;
    context?: Record<string, any>;
}


export type Err<
    TType extends string = string,
    TMsg extends string = string,
    TOpt extends ErrOptions = {}
> =
TType extends `${infer Type}/${infer Subtype}`
? Expand<
    Error &
    {
        name: PascalCase<TOpt["name"] extends string ? TOpt["name"] : RetainUntil<TType, "/">>;
        type: Type;
        subType: Subtype;
        message: TMsg;
        context: IsDefined<TOpt["context"]> extends true ? TOpt["context"] : never
    }
>
: Expand<
    Error &
    {
        name: PascalCase<TOpt["name"] extends string ? TOpt["name"] : RetainUntil<TType, "/">>; type: TType;
        message: TMsg
        context: IsDefined<TOpt["context"]> extends true ? TOpt["context"] : never
    }
>
