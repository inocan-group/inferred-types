import { Slice } from "inferred-types/types";


type R<T extends readonly unknown[]> = ;


type O<T extends readonly unknown[]> = ;



/**
 * **Require**`<T,U>`
 *
 * A utility which takes a tuple value `T` and ensures the first `U` elements are required
 * types and the rest are _variadic_.
 */
export type Require<
    T extends readonly unknown[],
    U extends number
> = [
    ...R<Slice<T,0,U>>,
    ...O<Slice<T,U>>
]
;


type X1 = Slice<[1,2,3,4,5], 0, 3>
type X2 = Slice<[1,2,3,4,5], 3>;


