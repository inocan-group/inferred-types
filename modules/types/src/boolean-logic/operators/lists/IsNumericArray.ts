export type IsNumericArray<T> = T extends number[]
    ? true
    : false;
