import { PascalCase } from "./PascalCase";

export type CamelCase<S extends string> = Uncapitalize<PascalCase<S>>;
