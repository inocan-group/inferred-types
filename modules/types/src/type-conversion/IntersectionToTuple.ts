export type IntersectionToTuple<T>
    = (T extends any ? (x: T) => void : never) extends (x: infer U) => void
        ? [...IntersectionToTuple<Exclude<T, U>>, U]
        : [];
