import { PascalCase } from "~/types/alphabetic";

export type CamelCase<S extends string> = Uncapitalize<PascalCase<S>>;
