import type { Container } from "inferred-types/types";

export type AsRef<T> = T extends Container
    ? T & { value: unknown }
    : never;
