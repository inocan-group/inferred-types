import type { Narrowable } from "@inferred-types/types";
import type { SomeEqual } from "inferred-types/types";

export function equalsSome<
    const TSome extends readonly Narrowable[]
>(
    ...some: TSome
) {
    return <TVal extends Narrowable>(val: TVal) => {
        return some.includes(val) as SomeEqual<TSome, TVal>;
    };
}
