import { Dictionary, Narrowable, StringKeys, Suggest, Unset } from "@inferred-types/types";
import { unset } from "inferred-types/runtime";


export function usingLookup<
    const TLookup extends Dictionary<string>,
    const TMissing extends Narrowable | never = Unset
>(
    lookup: TLookup,
    missing: TMissing = unset as TMissing
) {

    return <
        const TKey extends Suggest<StringKeys<TLookup>[number]>,
    >(
        key: TKey
    ) => {
        return (
            key in lookup
                ? lookup[key]
                : missing
        );
    }

}
