import { As, DefineObject, StringKeys } from "inferred-types/types";
import { DefineObjectWith, FromDefn, FromInputToken__Object } from "types/runtime-types";


export function defineObjectWith<
    TMapper extends DefineObject
>(mapper: TMapper) {
    type Mapper = FromInputToken__Object<TMapper>;

    return <TDefn extends Record<string, StringKeys<Mapper>[number]>>(defn: TDefn) => {
        return {
            kind: "define-object-with",
            defn,
            type: null as unknown as DefineObjectWith<
                    TDefn,
                    Mapper
                >["type"]
        } as DefineObjectWith<TDefn,Mapper>
    }

}
