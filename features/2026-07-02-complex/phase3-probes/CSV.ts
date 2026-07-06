import type { CsvToJsonTuple, CsvToStrUnion, CsvToTuple, CsvToTupleStr, CsvToUnion } from "types/numeric-literals/CSV";

type Probe = [
    CsvToTuple<"1,2,three">,
    CsvToTupleStr<"1,2,three">,
    CsvToUnion<"1,2,three">,
    CsvToStrUnion<"1,2,three">,
    CsvToJsonTuple<"1,2,three">,
];
