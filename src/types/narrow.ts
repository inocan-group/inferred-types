export type Narrowable = string | number | bigint | boolean | [];

export type Narrow<A> = (A extends Narrowable ? A : never) | { [K in keyof A]: Narrow<A[K]> };
