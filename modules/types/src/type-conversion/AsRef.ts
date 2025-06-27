import type { Container } from "../base-types";

export type AsRef<T> = T extends Container
    ? T & { value: unknown }
    : never;
