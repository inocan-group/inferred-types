import type {
    Immutable,
    Narrowable,
    NarrowObject
} from "inferred-types/types";

declare global {
    interface ObjectConstructor {
        freeze<T extends NarrowObject<N> | readonly N[], N extends Narrowable>(obj: T): Immutable<T, false>;
    }
}

export default {};
