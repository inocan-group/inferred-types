import type {
    Immutable,
    Narrowable,
    NarrowObject
} from "inferred-types/types";

declare global {
    interface ObjectConstructor {
        freeze<T extends Function>(f: T): T;
        freeze<T extends NarrowObject<N> | readonly N[], N extends Narrowable>(obj: T): Immutable<T, false>;
        freeze<T>(obj: T): Readonly<T>;
    }
}

export default {};
