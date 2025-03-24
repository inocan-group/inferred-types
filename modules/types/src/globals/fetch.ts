// declare function a(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;

import type {
    Dictionary,
    Expand,
    HttpHeaders,
    HttpHeadingKeys,
    HttpVerbsWithBody,
    HttpVerbsWithoutBody,
    OneOf,
    SerializedData,
    TypeSubtype
} from "inferred-types/types";

type FetchConfig = OneOf<[
    Expand<{
        method?: HttpVerbsWithBody;
        headers?: HttpHeaders | [key: HttpHeadingKeys, value: string][];
        body?: BodyInit | null;
    } & Omit<RequestInit, "method" | "headers" | "body">
    >,
    {
        method?: HttpVerbsWithoutBody;
        headers?: HttpHeaders | [key: HttpHeadingKeys, value: string][];
    } & Omit<RequestInit, "method" | "headers" | "body">
]>;

type GetMimeType<T extends FetchConfig | undefined> = T extends undefined
    ? "JSON" | "Plain Text"
    : T extends FetchConfig
        ? T["headers"] extends Dictionary
            ? T["headers"]["Accept"] extends TypeSubtype
                ? T["headers"]["Accept"]
                : T["headers"]["Content-Type"] extends TypeSubtype
                    ? T["headers"]["Content-Type"]
                    : "unknown/unknown"
            : "unknown/unknown"
        : "unknown/unknown";

declare global {
    interface fetch<TResp = any> {
        <
            TUrl extends URL | Request | string,
            TConfig extends FetchConfig
        >(input: TUrl, config?: TConfig): Promise<SerializedData<
            GetMimeType<TConfig>,
            TResp
        >>;
    }
}

export default "fetch";
