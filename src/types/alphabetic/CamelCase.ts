import { PascalCase } from "./PascalCase";

export type CamelCase<S extends string> = string extends S ? string : Uncapitalize<PascalCase<S>>;
