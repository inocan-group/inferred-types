import type { DefineObject, StringKeys, DefineObjectWith, FromInputToken__Object } from "inferred-types/types";

export function defineObjectWith<
    TMapper extends DefineObject
>(_mapper: TMapper) {
    type Mapper = FromInputToken__Object<TMapper>;

    return <TDefn extends Record<string, StringKeys<Mapper>[number]>>(defn: TDefn) => {
        return {
            kind: "define-object-with",
            defn,
            type: null as unknown as DefineObjectWith<
                TDefn,
                Mapper
            >["type"]
        } as DefineObjectWith<TDefn, Mapper>;
    };
}
