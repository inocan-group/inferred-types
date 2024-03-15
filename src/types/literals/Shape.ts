import {SHAPE_PREFIXES} from "src/constants/index";
import { Mutable } from "../type-conversion/Mutable";
import { TupleToUnion } from "../type-conversion/TupleToUnion";

type Prefixes = TupleToUnion<Mutable<typeof SHAPE_PREFIXES>>;
export type Shape = `<<${Prefixes}${string}>>`
