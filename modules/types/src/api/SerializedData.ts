import type {
    And,
    Extends,
    IsEqual,
    MimeTypes,
    Not,
    Or,
    StartsWith,
    Suggest
} from "inferred-types/types";

type IsBinaryFormat<T> = T extends string
    ? Or<[
        And<[StartsWith<T, "image/">, Not<IsEqual<T, "image/svg+xml">>]>,
        Extends<T, "application/grpc">
    ]> extends true
        ? true
        : false
    : false;

export type SerializedData<
    TAs extends Suggest<MimeTypes>,
    TData
> = IsBinaryFormat<TAs> extends true
    ? (string | Blob | ArrayBuffer) & {
        kind: "SerializedData";
        format: TAs;
        data: TData;
    }
    : TAs extends "unknown/unknown"

        ? (
            string & {
                kind: "SerializedData";
                data: TData;
            })

        : (string & {
            kind: "SerializedData";
            format: TAs;
            data: TData;
        });
