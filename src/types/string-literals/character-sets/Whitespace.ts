import { WHITESPACE_CHARS } from "src/constants/index";
import { Mutable, TupleToUnion } from "src/types/index";

/**
 * **Whitespace**
 *
 * Characters typically representing "white space"
 */
export type Whitespace = TupleToUnion<Mutable<typeof WHITESPACE_CHARS>>;
